import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
      alert('Please correct the errors in the form');
      return;
    }

    this._http.post<any>('http://localhost:3000/user', this.registerForm.value)
      .subscribe(
        (res) => {
          alert('register success ');
          this.registerForm.reset();
          this.router.navigate(['login']);
        },
        (err) => {
          alert('login fail');
        }
      );
  }
}
