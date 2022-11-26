import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData={
    username: '',
    password: '',
  };

  constructor(private snack:MatSnackBar, private login: LoginService) { }

  ngOnInit(): void {
  }

  formSubmit() {
    if (this.loginData.username.trim() == '' || this.loginData.username == null){
      this.snack.open("Username is require!d", 'OK', {
        duration: 2500
      });
      return;
    }
    if (this.loginData.password.trim() == '' || this.loginData.password == null){
      this.snack.open("Password is require!d", 'OK', {
        duration: 2500
      });
      return;
    }


    //Request from server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log("success");
        console.log(data);

        //login...
        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe(
          (user:any)=> {
            this.login.setUser(user);
            console.log(user);
            // redirect... admin: admin-dashboard
            // redirect... normal: normal-dashboard
          }
        );


      },
      (error)=> {
        console.log("Error");
        console.log(error);
      }
    );

  }

}
