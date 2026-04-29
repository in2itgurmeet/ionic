import { IonicModule } from '@ionic/angular';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Authservice } from '../service/authservice';

@Component({
  selector: 'app-registerpage',
  imports: [IonicModule, CommonModule, RouterLink,ReactiveFormsModule],
  templateUrl: './registerpage.component.html',
  styleUrls: ['./registerpage.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class RegisterpageComponent implements OnInit {
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  password: string = '';
  registerForm!: FormGroup
  constructor(private apiService:Authservice) { }

  ngOnInit() { 
    this.initForm()
  }
  togglePasswordVisibility(): void {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.passwordIcon = 'eye';
    } else {
      this.passwordType = 'password';
      this.passwordIcon = 'eye-off';
    }
  }

  initForm() {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      company: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }




  onSubmit() {
    this.apiService.registerUser(this.registerForm.value).subscribe({
      next: (res) => {
        this.registerForm.reset();
      },error: (err) => {
        console.log(err);
      }
    })
  }
}
