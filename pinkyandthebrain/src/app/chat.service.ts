import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, finalize, of, tap } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

// Define interfaces for your data models
export interface ChatMessage {
  content: string;
  role: 'user' | 'assistant';
}

// Define interface for API request
export interface ChatRequest {
  messages: ChatMessage[];
}

// Define interface for API response
export interface ChatResponse {
  messages: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // API endpoint - replace with your actual API URL
  private apiUrl = 'http://localhost:5000/chat';

  // Create a private subject to store and manage messages
  private messagesSubject = new BehaviorSubject<ChatMessage[]>([]);

  // Loading state
  private loadingSubject = new BehaviorSubject<boolean>(false);

  // Error state
  private errorSubject = new BehaviorSubject<string | null>(null);

  // Expose the observable parts
  public messages$: Observable<ChatMessage[]> = this.messagesSubject.asObservable();
  public loading$: Observable<boolean> = this.loadingSubject.asObservable();
  public error$: Observable<string | null> = this.errorSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Method to add a new user message and get AI response
  sendMessage(content: string): void {
    // Clear any previous errors
    this.errorSubject.next(null);

    // Add user message to the chat
    const currentMessages = this.messagesSubject.getValue();
    const newMessage: ChatMessage = {
      content,
      role: 'user',
    };

    const updatedMessages = [...currentMessages, newMessage];
    this.messagesSubject.next(updatedMessages);

    // Set loading state
    this.loadingSubject.next(true);

    // Prepare request payload
    const request: ChatRequest = {
      messages: updatedMessages
    };

    // Make API call
    this.http.post<ChatResponse>(this.apiUrl, request)
      .pipe(
        tap(response => {
          // Update messages with the response
            const assistantMessage: ChatMessage = {
              content: response.messages,
              role: 'assistant'
            };
            this.messagesSubject.next([...updatedMessages, assistantMessage]);
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Error calling chat API:', error);
          let errorMsg = 'An error occurred while communicating with the AI service.';

          if (error.error instanceof ErrorEvent) {
            // Client-side error
            errorMsg = `Error: ${error.error.message}`;
          } else {
            // Server-side error
            errorMsg = `Error Code: ${error.status}, Message: ${error.message}`;
          }

          this.errorSubject.next(errorMsg);
          return of(null); // Return a safe value to keep the stream alive
        }),
        finalize(() => {
          // Set loading state to false when done (whether success or error)
          this.loadingSubject.next(false);
        })
      )
      .subscribe();
  }

  // Method to clear all messages
  clearChat(): void {
    this.messagesSubject.next([]);
    this.errorSubject.next(null);
  }
}
