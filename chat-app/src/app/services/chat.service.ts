import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private socket: Socket) {}

  /**
   * The sendChat function will allow us to send a message to the server.
   * We call the emit method with a value of chat which means that it is going to trigger
   * the function on the server decorated with @SubscribeMessage('chat').
   * @param message
   */
  sendChat(message: any) {
    this.socket.emit('chat', message);
  }
  receiveChat() {
    return this.socket.fromEvent('chat'); //listens for a chat event from server recieves string[]
  }
  getUsers() {
    return this.socket.fromEvent('users'); //listens for a user event indicating number of users
  }
}
