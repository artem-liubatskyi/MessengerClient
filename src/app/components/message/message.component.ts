import { Component, OnInit} from '@angular/core';
import { Message } from 'src/app/models/message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  message: Message;
  constructor() { }

  ngOnInit() {
  }

}
