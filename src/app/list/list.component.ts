import {Component, OnInit, Output, EventEmitter, ViewChild, Input} from '@angular/core';
import {Contact} from "../models/Contact";
import {ContactService} from "../Service/contact.service";
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Output() newItemEvent = new EventEmitter<string>();

  public displayedColumns: string[] = ['fullName'];
  public dataSource = new MatTableDataSource<Contact>(this.contactService.contacts);
  public contacts: Contact[] = this.contactService.contacts;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
  }

  ngAfterContentChecked() {
    this.dataSource = new MatTableDataSource<Contact>(this.contactService.contacts);
  }

  selectContact(contact: Contact) {
    this.newItemEvent.emit(JSON.stringify(contact));
  }

}
