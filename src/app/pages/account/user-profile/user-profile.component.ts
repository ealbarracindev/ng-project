import { Component, OnInit } from '@angular/core';
import { User } from '@core/models/auth.model';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'sc-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user!:User;
  constructor(private readonly srvUser: AuthService) { }

  ngOnInit(): void { this.loadProfile(); }
  loadProfile(){
    this.srvUser.getProfile().subscribe( (resp:User)=>{
        this.user = resp;
   },(error:any) =>{
     console.log(error)
   });
  }
}
