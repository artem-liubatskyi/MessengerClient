import { Component, OnInit } from '@angular/core';
import { ChatPreview } from 'src/app/models/chat-preview.model';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {

  chats: ChatPreview[];
  constructor() { }

  ngOnInit() {
  }

}
