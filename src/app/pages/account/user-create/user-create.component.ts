import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sc-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  title:string='Register'
  subTitle:string='Registrese para disfrutar del sitio 😊';
  redirect:string='account'
  constructor() { }

  ngOnInit(): void {
  }

}
