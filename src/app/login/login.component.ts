import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
[x: string]: any;

  loginFrom!: FormGroup;
  constructor(
    private formBuilder: FormBuilder, private _http:HttpClient, private router:Router) {}

  ngOnInit(): void {
    this.loginFrom = this.formBuilder.group({
      email:[''],
      pass:['']
    });
  }
  logincup(){
    this._http.get<any>('http://localhost:3000/user').subscribe(res=>{
    const user = res.find((a:any)=>{
      return a.email === this.loginFrom.value.email && a.password === this.loginFrom.value.password
    })
    if(user){
      alert("login is success")
      this.loginFrom.reset();
      this.router.navigate(['dashboard'])
    }
    else{
      alert("user not found")
    }
    },err => {
      alert("The server is not restored !! ")
    }
    )
  }
}
