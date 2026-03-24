import { IonicModule } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { DefultUsageService } from 'src/app/Service/defult-usage.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-createorder',
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  templateUrl: './createorder.component.html',
  styleUrls: ['./createorder.component.scss'],
})
export class CreateorderComponentPtl {
  cargoForm!: FormGroup;
  vehicles: any[] = [];

  constructor(private fb: FormBuilder, private defultService: DefultUsageService, private route: Router) {
    this.vehicles = this.defultService.vehicles;
  }

  ngOnInit() {
    this.cargoForm = this.fb.group({
      referenceNumber: ['', Validators.required],
      senderName: ['', Validators.required],
      senderMobile: ['', Validators.required],
      receiverName: ['', Validators.required],
      receiverMobile: ['', Validators.required],
      selectedVehicle: this.fb.array([], Validators.required),
      cargoItems: this.fb.array([this.createCargoItem()]),
    });
    this.subscribeToDimensionChanges();
  }

  createCargoItem(): FormGroup {
    return this.fb.group({
      goodsDescription: ['', Validators.required],
      length: [],
      width: [],
      height: [],
      dimensionCM: [{ value: 0, disabled: true }],
      quantity: [],
      weight: [],
    });
  }


  get cargoItems(): FormArray {
    return this.cargoForm.get('cargoItems') as FormArray;
  }

  addCargo() {
    const newCargo = this.createCargoItem();
    this.cargoItems.push(newCargo);
    this.subscribeToDimensionChanges(newCargo);;
  }

  removeCargo(index: number) {
    if (this.cargoItems.length > 1) {
      this.cargoItems.removeAt(index);
    }
  }

  submitForm() {
    if (this.cargoForm.valid) {
      console.log(this.cargoForm.value);
      this.route.navigate(['/indexpage/order-details/2']);
    } else {
      console.log('Form invalid');
    }
  }
  subscribeToDimensionChanges(cargoGroup?: FormGroup) {
    const groups: FormGroup[] = cargoGroup ? [cargoGroup] : this.cargoItems.controls as FormGroup[];

    groups.forEach(group => {
      ['length', 'width', 'height'].forEach(key => {
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
  onVehicleChange(event: any, vehicleName: string) {
    if (event.detail.checked) {
      this.selectedVehicle.push(this.fb.control(vehicleName));
    } else {
      const index = this.selectedVehicle.controls.findIndex(x => x.value === vehicleName);
      if (index >= 0) {
        this.selectedVehicle.removeAt(index);
      }
    }
  }
  get selectedVehicle(): FormArray {
    return this.cargoForm.get('selectedVehicle') as FormArray;
  }

}



