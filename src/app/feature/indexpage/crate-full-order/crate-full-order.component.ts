import { IndexService } from './../service/index-service';
import { IonicModule } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { DefultUsageService } from 'src/app/Service/defult-usage.service';
import { Route, Router } from '@angular/router';
import { Api } from 'src/app/Service/api';

@Component({
  selector: 'app-createorder',
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  templateUrl: './crate-full-order.component.html',
  styleUrls: ['./crate-full-order.component.scss'],
})
export class CreateFullorderComponent {
  cargoForm!: FormGroup;
  vehicles: any[] = [];
  bookingType: any;
  ordId: any;
  constructor(
    private fb: FormBuilder,
    private defultService: DefultUsageService,
    private route: Router,
    private indexService: IndexService,
  ) {
    this.vehicles = this.defultService.vehicles;
    this.bookingType = this.defultService.bookingMode();
  }

  ngOnInit() {
    this.ordId = localStorage.getItem('ordId');
    this.handleBookingTypeValidator();
    this.subscribeToDimensionChanges();
    this.initCargoForm();
  }
  initCargoForm() {
    this.cargoForm = this.fb.group({
      referenceNumber: ['', Validators.required],
      senderName: ['', Validators.required],
      senderMobile: ['', Validators.required],
      receiverName: ['', Validators.required],
      receiverMobile: ['', Validators.required],
      selectedVehicle: this.fb.array([], Validators.required),
      cargoItems: this.fb.array([this.createCargoItem()]),
    });
  }
  createCargoItem(): FormGroup {
    return this.fb.group({
      goodsDescription: ['', Validators.required],
      length: [null, Validators.required],
      width: [null, Validators.required],
      height: [null, Validators.required],
      dimensionCM: [{ value: 0, disabled: true }],
      quantity: [null, Validators.required],
      weight: [null, Validators.required],
    });
  }

  get cargoItems(): FormArray {
    return this.cargoForm.get('cargoItems') as FormArray;
  }

  addCargo() {
    const newCargo = this.createCargoItem();
    this.cargoItems.push(newCargo);
    this.subscribeToDimensionChanges(newCargo);
  }

  removeCargo(index: number) {
    if (this.cargoItems.length > 1) {
      this.cargoItems.removeAt(index);
    }
  }

 submitForm() {
  if (this.cargoForm.valid) {

    const vehicleObjects = this.selectedVehicle.value.map((name: any) =>
      this.defultService.vehicles.find((v) => v.name === name)
    );

    const finalPayload = {
      ...this.cargoForm.value,
      selectedVehicle: vehicleObjects,
      amount: this.calculateTotalAmount()
    };

    this.indexService.createOrderStep2(finalPayload, this.ordId).subscribe({
      next: (res) => {
        this.defultService.successToast(res.message);
        this.route.navigate(['/indexpage/order-details/2']);
      },
      error: (err) => {
        this.defultService.errorToast(err.error.message);
      }
    });

  } else {
    this.defultService.errorToast('Please fill in all required fields.');
  }
}

  subscribeToDimensionChanges(cargoGroup?: FormGroup) {
    const groups: FormGroup[] = cargoGroup
      ? [cargoGroup]
      : (this.cargoItems.controls as FormGroup[]);
    groups.forEach((group) => {
      ['length', 'width', 'height'].forEach((key) => {
        group.get(key)?.valueChanges.subscribe(() => this.calculateCM(group));
      });
    });
  }

  calculateCM(group: FormGroup) {
    const l = +group.get('length')?.value || 0;
    const w = +group.get('width')?.value || 0;
    const h = +group.get('height')?.value || 0;
    const cm = l * w * h;
    group.get('dimensionCM')?.setValue(cm, { emitEvent: false });
  }
  onVehicleChange(event: any, vehicle: any) {
    if (event.detail.checked) {
      this.selectedVehicle.push(this.fb.control(vehicle));
    } else {
      const index = this.selectedVehicle.controls.findIndex(
        (x) => x.value.name === vehicle.name,
      );
      if (index >= 0) {
        this.selectedVehicle.removeAt(index);
      }
    }
  }

  get selectedVehicle(): FormArray {
    return this.cargoForm.get('selectedVehicle') as FormArray;
  }
  handleBookingTypeValidator() {
    const selectedVehicleControl = this.cargoForm.get('selectedVehicle');
    if (this.bookingType === 'PTL') {
      selectedVehicleControl?.setValidators(Validators.required);
    } else {
      selectedVehicleControl?.clearValidators();
    }
    selectedVehicleControl?.updateValueAndValidity();
  }

  calculateTotalAmount(): number {
    let total = 0;
    this.cargoItems.value.forEach((item: any) => {
      const weight = item.weight || 0;
      const quantity = item.quantity || 0;
      total += weight * quantity * 10;
    });

    return total;
  }
}
