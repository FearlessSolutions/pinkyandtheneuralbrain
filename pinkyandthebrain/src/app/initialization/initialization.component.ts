import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ChatService } from '../chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'chat-initialization',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './initialization.component.html',
  styleUrl: './initialization.component.scss'
})
export class InitializationComponent {

  userPrompt: string = '';
  constructor(
    private chatService: ChatService,
    private router: Router
  ) { }

onBeginClick() {
    if (this.userPrompt.trim()) {
      // Save the prompt to the chat service
      this.chatService.sendMessage(this.userPrompt);

      // Navigate to the chat component
      this.router.navigate(['/chat']);
    }
  }

  // Method to handle selecting a prompt from the library
  selectPrompt(prompt: string): void {
    this.userPrompt = prompt;
  }
}
