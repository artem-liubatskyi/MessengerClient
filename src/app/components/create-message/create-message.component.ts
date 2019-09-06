import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.css']
})
export class CreateMessageComponent implements OnInit {

  @Output() sendMessage = new EventEmitter<string>(); 
  messageForm: FormGroup;
  formBuilder: FormBuilder;

  constructor() { }

  ngOnInit() {
    this.messageForm = this.formBuilder.group({
      messsage: ['', Validators.required]
    });
  }
  get f() { return this.messageForm.controls; }

  onSubmit() {
    if (this.messageForm.invalid) {
      return;
    }

    this.sendMessage.emit(this.f.message.value)
  }
}
