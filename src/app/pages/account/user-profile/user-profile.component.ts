import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/auth.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private readonly srvUser: AuthService) { }

  ngOnInit(): void {
  }
  loadProfile(){
    this.srvUser.getProfile().subscribe( (resp:User)=>{
      
   },error =>{
     console.log(error)
   });
  }
}
