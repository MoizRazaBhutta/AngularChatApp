import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server;
  users = 0;
  messages = [];
  async handleConnection() {
    // A client has connected
    this.users++;
    // Notify connected clients of current users
    this.server.emit('users', this.users);
    this.server.emit('chat', this.messages);
  }
  async handleDisconnect() {
    // A client has disconnected
    this.users--;
    // Notify connected clients of current users
    this.server.emit('users', this.users);
  }
  @SubscribeMessage('chat')
  async onChat(client, message) {
    this.messages.push(message);
    // console.log(client);
    // console.log(this.messages);
    this.server.emit('chat', this.messages);
  }
}
