import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login() {
    return { msg: 'login' };
  }

  register() {
    return { msg: 'register' };
  }
}
