import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';

// Password match validator
export function passwordMatchValidator(g: FormGroup) {
  const passControl = g.get('pass');
  const confirmPassControl = g.get('confirmPass');

  if (passControl && confirmPassControl) {
    return passControl.value === confirmPassControl.value ? null : { 'mismatch': true };
  }

  return { 'mismatch': true };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
[x: string]: any;

  hide = true;
  hidePass = true;
  hideConfirmPass = true;
  imageSrc = 'https://avatars.githubusercontent.com/u/69605874?s=400&u=bca1d8dedb5375d2ad9f8529acad13d656293cf4&v=4'; 
  defaultImageSrc = 'https://avatars.githubusercontent.com/u/69605874?s=400&u=bca1d8dedb5375d2ad9f8529acad13d656293cf4&v=4'; 
  passwordImageSrc = 'https://i.imgur.com/vTyz0Q7.png';
  confirmPassImageSrc = 'https://i.imgur.com/vTyz0Q7.png';

  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      user: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(6)]],
      confirmPass: [''] // Add confirm password control
    }, { validator: passwordMatchValidator }); // Add password match validator
  }

  RegisTer() {
    if (this.registerForm.invalid) {
      Swal.fire({
        icon: "error",
        title: "Ohh no Please check your email again and confirm Password",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      });
      return;
    }
  
    const user = this.registerForm.value;
    user.isLoggedIn = true; // Set isLoggedIn to true when user registers
  
    // Add role based on email address
    if (user.email.endsWith('@angular.com')) {
      user.role = 'admin';
    } else {
      user.role = 'user';
    }
  
    this._http.post<any>('http://localhost:3000/user', user)
      .subscribe(
        (res) => {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "register in successfully"
          });
          const encryptedAuthToken = CryptoJS.AES.encrypt(JSON.stringify(user), 'ubuntuhaha').toString(); // Encrypt user info before saving to localStorage
          localStorage.setItem('authToken', encryptedAuthToken); // Save encrypted user info to localStorage
          this.registerForm.reset();
          this.router.navigate(['login']);
        },
        (err) => {
          Swal.fire({ // Thay alert bằng Swal.fire
            title: "Server Error",
            text: "server error! Please Run server",
            icon: "error"
          });
        }
      );
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
  changeImagePass() {
    this.imageSrc = this.passwordImageSrc;
  }

  resetImagePass() {
    this.imageSrc = this.defaultImageSrc;
  }

  changeImageConfirmPass() {
    this.imageSrc = this.confirmPassImageSrc;
  }

  resetImageConfirmPass() {
    this.imageSrc = this.defaultImageSrc;
  }
  }
  
