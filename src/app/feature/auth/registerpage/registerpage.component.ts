import { IonicModule, GestureController, Gesture } from '@ionic/angular';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../service/authservice';
import { DefultUsageService } from 'src/app/Service/defult-usage.service';

@Component({
  selector: 'app-registerpage',
  imports: [IonicModule, CommonModule, RouterLink,ReactiveFormsModule],
  templateUrl: './registerpage.component.html',
  styleUrls: ['./registerpage.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class RegisterpageComponent implements OnInit, AfterViewInit {
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  password: string = '';
  registerForm!: FormGroup;
  submitted = false;

  @ViewChild('formContainer', { read: ElementRef }) formContainer!: ElementRef;
  private gesture!: Gesture;
  private currentY: number = 0;
  private expandedY: number = -250;
  public isExpanded: boolean = false;

  constructor(
    private apiService: AuthService,
    private defultService: DefultUsageService,
    private gestureCtrl: GestureController,
    private renderer: Renderer2
  ) { }

  ngOnInit() { 
    this.initForm()
  }

  ngAfterViewInit() {
    this.initDragGesture();
  }

  initDragGesture() {
    const el = this.formContainer.nativeElement;
    
    // Calculate actual content height
    let contentHeight = 0;
    const children = el.children;
    for (let i = 0; i < children.length; i++) {
      const child = children[i] as HTMLElement;
      const style = window.getComputedStyle(child);
      contentHeight += child.offsetHeight + (parseFloat(style.marginTop) || 0) + (parseFloat(style.marginBottom) || 0);
    }
    contentHeight += 32; // Accommodate ion-padding (16px top + bottom)

    const initialTop = 300; // Matches top: 300px in SCSS
    const visibleHeight = window.innerHeight - initialTop;

    if (contentHeight > visibleHeight) {
      const requiredShift = contentHeight - visibleHeight;
      this.expandedY = -Math.min(requiredShift, initialTop - 50);
    } else {
      this.expandedY = 0; 
    }
    
    this.gesture = this.gestureCtrl.create({
      el: el,
      gestureName: 'drag-form-register',
      direction: 'y',
      canStart: () => {
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
  togglePasswordVisibility(): void {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.passwordIcon = 'eye';
    } else {
      this.passwordType = 'password';
      this.passwordIcon = 'eye-off';
    }
  }

  showError(controlName: string, errorName: string): boolean {
    const control = this.registerForm.get(controlName);
    return !!(control && control.hasError(errorName) && (control.touched || control.dirty || this.submitted));
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
    if (this.registerForm.invalid) {
      this.submitted = true;
      this.registerForm.markAllAsTouched();
      return;
    }

    this.submitted = false;
    this.apiService.registerUser(this.registerForm.value).subscribe({

      next: (res) => {
        this.defultService.successToast(res.message);
        this.registerForm.reset();
      },error: (err) => {
        this.defultService.errorToast(err.error.message);
      }
    })
  }
}
