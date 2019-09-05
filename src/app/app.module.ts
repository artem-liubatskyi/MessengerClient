import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthenticationService } from './services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { ConfigService } from './shared/config.service';
import { AccountService } from './services/account.service';
import { CreateChatComponent } from './components/create-chat/create-chat.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatPreviewComponent } from './components/chat-preview/chat-preview.component';
import { ChatNavbarComponent } from './components/chat-navbar/chat-navbar.component';
import { ChatListNavbarComponent } from './components/chat-list-navbar/chat-list-navbar.component';
import { ChatComponent } from './components/chat/chat.component';
import { MessageComponent } from './components/message/message.component';
import { CreateMessageComponent } from './components/create-message/create-message.component';

export function tokenGetter() {
  let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if(currentUser==null)
            return false;
       return currentUser.token;     
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    CreateChatComponent,
    ChatListComponent,
    ChatPreviewComponent,
    ChatNavbarComponent,
    ChatListNavbarComponent,
    ChatComponent,
    MessageComponent,
    CreateMessageComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),
  ],
  providers: [AuthenticationService, ConfigService, AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
