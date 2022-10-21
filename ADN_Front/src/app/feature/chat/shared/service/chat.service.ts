import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chat: AngularFireList<any>;
  items: Observable<any[]>;
  chat2: AngularFireList<any>;
  items2: Observable<any[]>;
  array_chat1: Array<any[]>;
  array_chat2: Array<any[]>;
  array_chat: Array<any[]>;
  constructor(private afs: AngularFireDatabase) { }

  async getChat(): Promise<Array<any[]>>{
    this.chat = this.afs.list('chat2',
      ref => ref.orderByChild('id_user').equalTo(Number(localStorage.getItem('id')))
    );
    this.items = this.chat.snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      })
    );

    this.chat2 = this.afs.list('chat2',
      ref => ref.orderByChild('id_user2').equalTo(Number(localStorage.getItem('id')))
    );
    this.items2 = this.chat2.snapshotChanges().pipe(
      map(changes2 => {
        return changes2.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      })
    );
    return new Promise((resolve) => {
      this.items.subscribe(resultado => {
        this.array_chat1 = resultado;
        console.log(this.array_chat1)
        this.items2.subscribe(resultado2 => {
          this.array_chat2 = resultado2;
          console.log(this.array_chat2)
          this.array_chat = this.array_chat1.concat(this.array_chat2)
          console.log(this.array_chat);
          resolve(this.array_chat)
        })
      });
    });
   
      
  }

  setChat(message, id_user2, nombre_user_service, key) {

    this.chat = this.afs.list('chat2/' + key);

    console.log(this.chat.valueChanges(), key);
    this.chat.valueChanges().subscribe(item => {
      console.log(item);

    })

    if (this.chat.valueChanges.length > 0) {

      this.chat = this.afs.list('chat2/' + key + "/message");

      this.chat.push(message);

    }
    else {
      let dictionaryViaLiteral = {
        'date': new Date().toLocaleDateString(),
        'id_user': Number(localStorage.getItem('id')),
        'id_user2': Number(id_user2),
        'nombre': nombre_user_service,
        'message': {
          'value': message
        },
      };

      this.chat.push(dictionaryViaLiteral);
    }


  }

}
