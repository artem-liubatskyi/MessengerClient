import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';
import { ConfigService } from './config.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthenticationService, private config : ConfigService) {}

  canActivate() {

    if (this.authService.isAuthenticated()) {
      return true;
    }

    this.router.navigate(this.config.unauthorizedUrl as any);
    return false;
  }
}