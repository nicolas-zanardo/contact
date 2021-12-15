import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {MessagesService} from "../shared/messages.service";
import {ContactService} from "../Service/contact.service";
import {Contact} from "../models/Contact";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {


  public form!: FormGroup;
  public contacts: Contact[] = this.contactService.contacts;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    public messages: MessagesService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      fullName: new FormControl('', Validators.compose([
        Validators.maxLength(this.messages.maxCharacters),
        Validators.required
      ])),
      pseudo: new FormControl('', Validators.compose([
        Validators.maxLength(this.messages.maxCharacters),
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.email,
        Validators.required
      ]))
    });
  }

  ngAfterContentChecked() {
    this.contacts = this.contactService.contacts;
  }

  submit(formDirective: FormGroupDirective) {
    if(this.form.valid) {
      let contact = new Contact();
      contact.id = Math.floor(Math.random() * 1000);
      contact.fullName = this.form.value.fullName;
      contact.email = this.form.value.email;
      contact.pseudo = this.form.value.pseudo;
      this.contacts.push(contact);
      this.contactService.contacts = this.contacts;
      formDirective.resetForm();
    }
  }

}
