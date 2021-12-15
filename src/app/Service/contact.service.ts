import { Injectable } from '@angular/core';
import {Contact} from "../models/Contact";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor() { }

  set contacts(contacts: Contact[]) {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }

  get contacts(): Contact[] {
    return JSON.parse(localStorage.getItem('contacts' ) || '[]');
  }

}
