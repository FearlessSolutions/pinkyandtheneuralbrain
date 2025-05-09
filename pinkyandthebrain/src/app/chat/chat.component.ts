import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgFor } from '@angular/common';
import {MarkdownModule } from 'ngx-markdown';
import { CommonModule } from '@angular/common';
import { ChatService, ChatMessage } from '../chat.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    MarkdownModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgFor
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {
  userInput: string = '';
  messages$: Observable<ChatMessage[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  messages: ChatMessage[] = [];

  constructor(private chatService: ChatService) {
    this.messages$ = this.chatService.messages$;
    this.loading$ = this.chatService.loading$;
    this.error$ = this.chatService.error$;
  }

  ngOnInit(): void {
    // Subscribe to messages and update the component's messages array
    this.messages$.subscribe((messages) => {
      this.messages = messages;
    });
  }

  sendMessage(): void {
    if (this.userInput.trim()) {
      this.chatService.sendMessage(this.userInput);
      this.userInput = ''; // Clear input after sending
    }
  }
}
