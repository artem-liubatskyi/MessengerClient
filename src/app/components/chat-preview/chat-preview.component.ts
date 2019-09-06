import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ChatPreview } from 'src/app/models/chat-preview.model';

@Component({
  selector: 'app-chat-preview',
  templateUrl: './chat-preview.component.html',
  styleUrls: ['./chat-preview.component.css']
})
export class ChatPreviewComponent implements OnInit {

  @Output() connectToChat = new EventEmitter<string>();
  @Input() chatPreview: ChatPreview;

  constructor() { }

  ngOnInit() {
  }
  onClick(){
    this.connectToChat.emit(this.chatPreview.id);
  }

}
