import { NavController, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Countries, Country } from "./interface";
import { PopupPage } from '../popup/popup.page';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  allItems: Array<Country> = [];
  private items: Array<Country> = [];

  choosereligion = 'Choose your Religion';
  choosetribe = 'Choose your tribe'
  Complexion = 'Complexion'

  religionarray = [{ religion: 'Christian' }, { religion: ' Muslim' }, { religion: ' Hindu' }, { religion: ' Atheist' }, { religion: ' Traditional' }]
  tribearray = [
    { tribe: 'Igbo' }, { tribe: ' Yoruba' }, { tribe: ' Hausa' }, { tribe: ' Fulani' }, { tribe: ' Tiv' }, { tribe: ' Ibibio' }, { tribe: ' Ijaw' }, { tribe: ' Urhobo' }, { tribe: ' Esan' }, { tribe: ' Ogoni' }, { tribe: ' Igala' }, { tribe: ' Edo' }, { tribe: ' Itsekiri' }, { tribe: ' Others' }
  ]
  complexionarray = [
    { complexion: 'Light Dark' }, { complexion: ' Very Dark' },
  ]
  list = false
  list1 = false
  list2 = false
  sdate = false;
  yeardiv = false;
  monthdiv = false;
  syear: any = '';
  daydate: any = '';
  showdate = false;
  showyear = false;
  showmonth = false;

  showflags = false;

  flaglist = false
  flagimage: any;
  showimage = false;
  upicon = false;
  constructor(private http: HttpClient,
    public navCtrl: NavController,
    public modal: ModalController) { }

  ngOnInit() {

  }
  openfflaglist() {

    if (this.upicon == false) {
      this.upicon = true;
      this.flaglist = true;
    } else {
      this.upicon = false;
      this.flaglist = false;
    }

    this.showflags = true
    this.setItems();
  }
  setItems() {
    this.http.get('assets/countries.json').toPromise().then(
      (res: any) => {
        this.allItems = res.countries;
        this.items = this.allItems;
        // console.log('items', this.items);

      }
    );
  }

  filterItems(ev: any) {
    let val = ev.target.value;

    if (val && val.trim() !== '') {
      val = val.toLowerCase();
      this.items = this.items.filter((item) => {
        return item.name.toLowerCase().includes(val)
          || item.nativeName.includes(val)
          || item.capital.toLowerCase().includes(val);
      });
    } else {
      this.items = this.allItems;
    }

  }
  viewDetails(item) {
    // console.log('code===', item)
    this.flaglist = false
    this.flagimage = item.flag
    this.showimage = true;
    this.upicon = false;
  }

  religionlist() {
    if (this.list == false) {
      this.list = true
    } else {
      this.list = false
    }
  }
  tribelist() {
    if (this.list1 == false) {
      this.list1 = true
    } else {
      this.list1 = false
    }
  }
  complexionlist() {
    if (this.list2 == false) {
      this.list2 = true
    } else {
      this.list2 = false
    }
  }

  selectreligion(list) {
    this.choosereligion = list.religion;
    console.log('slected type', this.choosereligion);
  }
  selecttribe(list) {
    this.choosetribe = list.tribe
    console.log('slected type', this.choosetribe);
  }
  selectcomplexion(list) {
    this.Complexion = list.complexion
    console.log('slected type', this.Complexion);
  }
  previewprofile() {
    this.navCtrl.navigateForward('profile-preview')
  }


  tablink(type) {
    if (type == 1) {
      this.navCtrl.navigateRoot('dashboard');
    }
    if (type == 2) {
      this.navCtrl.navigateRoot('findajob');
    }
    if (type == 3) {
      this.navCtrl.navigateRoot('savedjobs');
    }
    if (type == 4) {
      this.navCtrl.navigateRoot('profile-preview');
    }
    if (type == 5) {
      this.navCtrl.navigateRoot('settings');
    }
  }

  async openpopup() {
    const modal = await this.modal.create({
      component: PopupPage,
      cssClass: 'popupclass',
    });
    modal.onDidDismiss().then((data) => {
      console.log('data', data)
    });
    return await modal.present();
  }
}
