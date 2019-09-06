import { Component, OnInit, NgZone } from '@angular/core';
import { SignalRService } from 'src/app/services/signalr.service';
import { Message } from 'src/app/models/message.model';
import { Chat } from 'src/app/models/chat.model';
import { SignalrMessage } from 'src/app/models/signalr-message.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  chat: Chat;
  canSendMessage: boolean;

  constructor(
    private signalrService: SignalRService,
  ) {
    this.subscribeToEvents();

  }

  sendMessage(message: string) {
    if (this.canSendMessage) {
      this.signalrService.sendChatMessage(new SignalrMessage(message));
    }
  }

  private subscribeToEvents(): void {

    this.signalrService.connectionEstablished.subscribe(() => {
      this.canSendMessage = true;
    });

    this.signalrService.messageReceived.subscribe((message: Message) => {
      this.chat.messages.push(message);
    });

    this.signalrService.connectToChat.subscribe((chat: Chat) => {
      this.chat = chat;
    });
  }

}
