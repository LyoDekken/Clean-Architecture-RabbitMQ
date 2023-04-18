import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  serverIsRunning(): string {
    const baseUrl = 'http://localhost:3333';
    return `🚀 Server is running on!  ${baseUrl}/docs`;
  }
}
