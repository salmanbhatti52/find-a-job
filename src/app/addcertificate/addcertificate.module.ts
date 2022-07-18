import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddcertificatePageRoutingModule } from './addcertificate-routing.module';

import { AddcertificatePage } from './addcertificate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddcertificatePageRoutingModule
  ],
  declarations: [AddcertificatePage]
})
export class AddcertificatePageModule {}
