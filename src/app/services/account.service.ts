import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../shared/config.service';
import { RegistrationModel } from '../models/registration.model';

@Injectable()
export class AccountService {

  constructor(private http: HttpClient, private config: ConfigService) { }
  
  register(model: RegistrationModel) {
    return this.http.post(this.config.registrationUrl, model);
  }
}