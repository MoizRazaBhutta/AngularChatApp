import { Component, OnInit } from '@angular/core';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public users: number = 0;
  public message: string = '';
  public messages: string[] = [];

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.receiveChat().subscribe((rec: any) => {
      // console.log(rec);
      this.messages = rec;
      // console.log(this.messages);
      console.log('recieve chat called');
    });
    this.chatService.getUsers().subscribe((users: any) => {
      this.users = users;
      console.log('get user called');
    });
  }
  addChat() {
    // this.messages.push(this.message);
    this.chatService.sendChat(this.message);
    this.message = '';
  }
}
