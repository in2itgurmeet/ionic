import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-ftlbookin',
  imports: [CommonModule, IonicModule],
  templateUrl: './ftlbookin.component.html',
  styleUrls: ['./ftlbookin.component.scss'],
})
export class FtlbookinComponent {


  constructor(private fb: FormBuilder) {
  }




}
