import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
    get registrationUrl(){
        return this.apiURI + '';
    }
    get authenticateUrl() {
        return this.apiURI + '';
    }
    get currentUser() {
        return 'currentUser';
    }
    get refreshTokenUrl() {
        return this.apiURI + '';
    }
    get apiURI() {
        return 'http://localhost:5000/api';
    }
    constructor() { }
}