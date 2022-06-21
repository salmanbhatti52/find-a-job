import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.page.html',
  styleUrls: ['./popup.page.scss'],
})
export class PopupPage implements OnInit {

  constructor(public modal: ModalController) { }

  ngOnInit() {
  }
  close() {
    this.modal.dismiss();
  }

}
