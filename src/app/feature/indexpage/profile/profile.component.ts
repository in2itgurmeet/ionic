import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IndexService } from '../service/index-service';
import { DefultUsageService } from 'src/app/Service/defult-usage.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  isEditing: boolean = false;
  userData: any = null;
  profileImage: string = 'assets/icon/logo.jpg';
  stats: any = {
    totalBookings: 0,
    inTransit: 0,
    delivered: 0
  };

  constructor(
    private fb: FormBuilder,
    private indexService: IndexService,
    private defaultService: DefultUsageService,
    private router: Router
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.loadProfile();
    this.loadStats();
  }

  initForm() {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      companyName: [''],
      gstNumber: [''],
      address: [''],
      city: [''],
      state: [''],
      pincode: ['']
    });
  }

  loadProfile() {
    this.indexService.getConsignorProfile().subscribe({
      next: (res: any) => {
        if (res.success && res.data) {
          this.userData = res.data;
          this.profileImage = res.data.profileImage || 'assets/icon/logo.jpg';
          this.profileForm.patchValue({
            name: res.data.name || '',
            email: res.data.email || '',
            phone: res.data.phone || '',
            companyName: res.data.consigner?.companyName || '',
            gstNumber: res.data.consigner?.gstNumber || '',
            address: res.data.consigner?.address || '',
            city: res.data.consigner?.city || '',
            state: res.data.consigner?.state || '',
            pincode: res.data.consigner?.pincode || ''
          });
        }
      },
      error: (err) => {
        console.error('Failed to load profile:', err);
        this.defaultService.errorToast('Failed to load profile details.');
      }
    });
  }

  loadStats() {
    this.indexService.getAllOrders().subscribe({
      next: (res: any) => {
        const orders = res.body?.data || [];
        this.stats.totalBookings = orders.length;
        this.stats.inTransit = orders.filter((o: any) => o.status === 'In-Transit' || o.status === 'Pickup Started').length;
        this.stats.delivered = orders.filter((o: any) => o.status === 'Delivered').length;
      },
      error: (err) => {
        console.error('Failed to load order stats:', err);
      }
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      this.loadProfile(); // Revert changes
    }
  }

  saveProfile() {
    if (this.profileForm.invalid) {
      this.defaultService.errorToast('Please fill all required fields correctly.');
      return;
    }

    const val = this.profileForm.value;
    const payload = {
      name: val.name,
      email: val.email,
      phone: val.phone,
      consigner: {
        companyName: val.companyName,
        gstNumber: val.gstNumber,
        address: val.address,
        city: val.city,
        state: val.state,
        pincode: val.pincode
      }
    };

    this.indexService.updateConsignorProfile(payload).subscribe({
      next: (res: any) => {
        this.defaultService.successToast('Profile updated successfully! 🎉');
        this.userData = res.data;
        this.isEditing = false;
      },
      error: (err) => {
        console.error('Failed to update profile:', err);
        this.defaultService.errorToast(err.error?.message || 'Failed to update profile.');
      }
    });
  }

  triggerFileInput() {
    const fileInput = document.getElementById('profile-image-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        this.defaultService.errorToast('Image size cannot exceed 5MB');
        return;
      }
      const formData = new FormData();
      formData.append('profileImage', file);

      this.indexService.uploadConsignorProfileImage(formData).subscribe({
        next: (res: any) => {
          this.defaultService.successToast('Profile image updated successfully! 📸');
          this.profileImage = res.data;
        },
        error: (err) => {
          console.error('Failed to upload image:', err);
          this.defaultService.errorToast('Failed to upload profile image.');
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/indexpage']);
  }

  logout() {
    this.defaultService.logout();
    this.router.navigate(['/auth']);
  }
}
