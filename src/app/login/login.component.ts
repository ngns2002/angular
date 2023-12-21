import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
[x: string]: any;
hide = true;
imageSrc = 'https://avatars.githubusercontent.com/u/69605874?s=400&u=bca1d8dedb5375d2ad9f8529acad13d656293cf4&v=4'; 

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
      return a.email === this.loginFrom.value.email && a.pass === this.loginFrom.value.pass
    })
    if(user){
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Login success"
      });
      user.isLoggedIn = true; // Set isLoggedIn to true when user logs in
      const encryptedAuthToken = CryptoJS.AES.encrypt(JSON.stringify(user), 'UbuntuHaha').toString(); // Encrypt user info before saving to localStorage
      localStorage.setItem('authToken', encryptedAuthToken); // Save encrypted user info to localStorage
      this.loginFrom.reset();
      this.router.navigate(['dashboard'])
    }
    else{
      Swal.fire({ // Thay alert bằng Swal.fire
        title: "Your fail",
        text: "The account does not exist in the database",
        icon: "error"
      });
    }
    },err => {
      Swal.fire({ // Thay alert bằng Swal.fire
        title: "Error!",
        text: "The server is not restored !!",
        icon: "error"
      });
    }
    )
  }

  logout() {
    // Xóa dữ liệu khỏi Local Storage
    localStorage.clear();
  
    // Chuyển hướng người dùng về trang đăng nhập
    this.router.navigate(['/login']);
  }
  changeImage() {
    this.imageSrc = 'https://i.imgur.com/vTyz0Q7.png'; // Thay đổi URL của hình ảnh khi nhấp vào ô mật khẩu
  }

  resetImage() {
    this.imageSrc = 'https://avatars.githubusercontent.com/u/69605874?s=400&u=bca1d8dedb5375d2ad9f8529acad13d656293cf4&v=4'; // Đặt lại URL của hình ảnh khi nhấp ra ngoài
  }
}
