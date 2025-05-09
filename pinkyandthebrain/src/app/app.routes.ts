import { Routes } from '@angular/router';
import { InitializationComponent } from './initialization/initialization.component';
import { ChatComponent } from './chat/chat.component';

export const routes: Routes = [
  { path: '', component: InitializationComponent },
  { path: 'chat', component: ChatComponent },
  { path: '**', redirectTo: '' }
];
