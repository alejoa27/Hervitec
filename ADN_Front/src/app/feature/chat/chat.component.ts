import { Component, OnInit } from '@angular/core';
import { ChatService } from './shared/service/chat.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(private chatService: ChatService) { }

  chats: any;
  messages: any;
  chatForm: FormGroup;
  username: any;
  id_user2: any;
  nombre_user_service: any;
  key: any;

  loaded_cahe: boolean = true;
  chat_cache: number = 0;

  private constructForm() {
    this.chatForm = new FormGroup({
      value: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('Proveedor')
    this.constructForm();

    this.chatService.getChat().then(chat => {
      this.chats = chat;
      if (this.loaded_cahe) {
        this.messages = Object.values(this.chats[0]['message'])
        this.id_user2 = this.chats[0]['id_user2'];
        this.key = this.chats[0]['key'];
      }
      else {
        this.messages = Object.values(this.chats[this.chat_cache]['message'])
        this.id_user2 = this.chats[this.chat_cache]['id_user2'];
        this.key = this.chats[this.chat_cache]['key'];
        
      }});

      
    
  }


getIcono(chat) {
  return ("https://ui-avatars.com/api/" + "?name=" + chat.nombre + "&background=random");
}

getIconoProfile() {
  return ("https://ui-avatars.com/api/" + "?name=" + this.username + "&background=random");
}

sendMessage() {
  this.loaded_cahe = false;
  if (this.chatForm.valid) {
    this.chatService.setChat(this.chatForm.value, this.id_user2, this.nombre_user_service, this.key);
    this.chatForm.controls['value'].setValue('')
  }
}

chatClick(obj) {
  this.messages = Object.values(obj['message'])
  this.id_user2 = obj['id_user2'];
  this.username = obj['nombre'];
  this.key = obj['key'];

  this.chat_cache = this.chats.findIndex(x => x.key === this.key)
  this.loaded_cahe = false;

  console.log(this.messages);


}

}
