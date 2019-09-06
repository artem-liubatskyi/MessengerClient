import { Injectable, EventEmitter } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Chat } from '../models/chat.model';
import { Message } from '../models/message.model';
import { SignalrMessage } from '../models/signalr-message.model';
@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private hubConnection: HubConnection

  messageReceived = new EventEmitter<Message>();
  connectionEstablished = new EventEmitter<Boolean>();
  connectToChat = new EventEmitter<Chat>();   

  constructor() {
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }

  sendChatMessage(message: SignalrMessage) {
    this.hubConnection.invoke('SendMessage', message);
  }
  tryConnectToChat(chatId: string) {
    this.hubConnection.invoke('TryConnectToChat', chatId);
  }
  
  private createConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:5000/chat')
      .build();
  }

  private startConnection(){
    this.hubConnection
      .start()
      .then(() => {
        console.log('Hub connection started');
        this.connectionEstablished.emit(true);
      })
      .catch(err => {
        console.log('Error while establishing connection, retrying...');
        setTimeout(this.startConnection, 5000);
      });
  }

  private registerOnServerEvents(): void {
    this.hubConnection.on('ConnectToChat', (chat: Chat) =>{
      this.connectToChat.emit(chat);
    });
    this.hubConnection.on('ReceiveMessage', (data: any) => {
      this.messageReceived.emit(data);
    });
  }
}
