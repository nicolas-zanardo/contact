import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {


  public maxCharacters: number = 25;

  constructor() { }


  public validation = {
    'fullName': [
      { type: 'required', message: 'Veuillez renseigner le nom complet' },
      { type: 'maxlength', message: `Nombre de caractère maximum ${this.maxCharacters}`}
    ],
    'pseudo': [
      { type: 'required', message: 'Veuillez fournir un pseudo' },
      { type: 'maxlength', message: `Nombre de caractère maximum ${this.maxCharacters}`}
    ],
    'email': [
      { type: 'required', message: 'Veuillez renseigner un email' },
    ],

  }


}
