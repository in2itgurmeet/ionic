import { IonicModule, GestureController, Gesture } from '@ionic/angular';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../service/authservice';
import { DefultUsageService } from 'src/app/Service/defult-usage.service';

@Component({
  selector: 'app-my-login',
  imports: [IonicModule, CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginComponent implements OnInit, AfterViewInit {
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  password: string = '';
  loginForm!: FormGroup;
  showPassword: boolean = false;

  @ViewChild('formContainer', { read: ElementRef }) formContainer!: ElementRef;
  private gesture!: Gesture;
  private currentY: number = 0;
  private expandedY: number = -250;
  public isExpanded: boolean = false;

  constructor(
    private apiService: AuthService,
    private defultService:DefultUsageService,
    private route: Router,
    private gestureCtrl: GestureController,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.initLoginForm();
  }

  ngAfterViewInit() {
    this.initDragGesture();
  }

  initDragGesture() {
    const el = this.formContainer.nativeElement;
    
    // Dynamically calculate expanded position based on screen height
    this.expandedY = -(window.innerHeight * 0.35); 
    
    this.gesture = this.gestureCtrl.create({
      el: el,
      gestureName: 'drag-form',
      direction: 'y',
      canStart: () => {
        // Prevent drag gesture if form is expanded and user is scrolling its content down
        if (this.isExpanded && el.scrollTop > 0) {
          return false;
        }
        return true;
      },
      onStart: () => {
        this.renderer.removeClass(el, 'form-transition');
      },
      onMove: (ev) => {
        let newY = this.currentY + ev.deltaY;

        if (newY < this.expandedY) newY = this.expandedY;
        if (newY > 0) newY = 0;

        this.renderer.setStyle(el, 'transform', `translateY(${newY}px)`);
      },
      onEnd: (ev) => {
        this.renderer.addClass(el, 'form-transition');
        
        if (ev.deltaY < -50 || ev.velocityY < -0.5) {
          this.currentY = this.expandedY;
          this.isExpanded = true;
          this.renderer.addClass(el, 'form-expanded');
        } else if (ev.deltaY > 50 || ev.velocityY > 0.5) {
          this.currentY = 0;
          this.isExpanded = false;
          this.renderer.removeClass(el, 'form-expanded');
        }

        this.renderer.setStyle(el, 'transform', `translateY(${this.currentY}px)`);
      }
    });

    this.gesture.enable();
  }

  initLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
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

  submit() {
    this.apiService.loginUser(this.loginForm.value).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.loginForm.reset();
        this.defultService.successToast(res.message);
        this.route.navigate(['/indexpage']);
      },
      error: (err) => {
        this.defultService.errorToast(err.error.message);
      },
    });
  }
}
