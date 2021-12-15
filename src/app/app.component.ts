import {Component, Input} from '@angular/core';
import {Contact} from "./models/Contact";
import {ContactService} from "./Service/contact.service";
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {MessagesService} from "./shared/messages.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public fullName: string;
  public pseudo: string;
  public email:string;
  public form!: FormGroup;
  public contacts: Contact[] = [];
  public contact: Contact = {};

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    public messages: MessagesService
  ) {}

  ngOnInit() {
    this.contacts = this.contactService.contacts;
  }

  ngAfterContentChecked() {
    this.contacts = this.contactService.contacts;
  }

  showContact(contact: string) {
    this.contact = JSON.parse(contact);
    this.form = this.fb.group({
      id: new FormControl(this.contact.id, Validators.required),
      fullName: new FormControl(this.contact.fullName, Validators.compose([
        Validators.maxLength(this.messages.maxCharacters),
        Validators.required
      ])),
      pseudo: new FormControl(this.contact.pseudo, Validators.compose([
        Validators.maxLength(this.messages.maxCharacters),
        Validators.required
      ])),
      email: new FormControl(this.contact.email, Validators.compose([
        Validators.email,
        Validators.required
      ]))
    });
  }


  private findIndex(contact: Contact): number {
    return this.contacts.findIndex((contactArray:Contact) => contactArray.id === contact.id);
  }

  handleSubmit(){
    if(this.form.valid) {
      // let contactForm = this.contacts.findIndex((contact:Contact) => contact.id === this.form.value.id);
      let contactForm = this.findIndex(this.form.value.id);
      this.contacts.splice(contactForm, 1);
      this.contacts.push(this.form.value);
      this.contactService.contacts = this.contacts;
    }
  }

  deleteContact(contact: Contact) {
    let delElt = this.findIndex(contact);
    this.contacts.splice(delElt, 1);
    this.contactService.contacts = this.contacts;
    this.contact = {};
  }

}
