import { NavController, ModalController, AlertController, Platform, IonContent } from '@ionic/angular';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Countries, Country } from "./interface";
import { PopupPage } from '../popup/popup.page';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { ExtrasService } from '../services/extras.service';
import { RestService } from '../services/rest.service';
import { IonDatetime } from '@ionic/angular';
import { format, parseISO, getDate, getMonth, getYear } from 'date-fns';
import { CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

import axios from 'axios';
import { Router } from '@angular/router';
const IMAGE_DIR = 'stored-images';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @ViewChild(IonContent, undefined) content: IonContent;
  allItems: Array<Country> = [];
  private items: Array<Country> = [];
  safeUrl: SafeResourceUrl;
  choosereligion = 'Choose your Religion';
  choosetribe = 'Choose your tribe'
  Complexion = 'Complexion';
  choosejobseeker = 'Choose Job seeker status';

  religionarray = [{ religion: 'Christian' }, { religion: ' Muslim' }, { religion: ' Hindu' }, { religion: ' Atheist' }, { religion: ' Traditional' }]
  tribearray = [
    { tribe: 'Igbo' }, { tribe: ' Yoruba' }, { tribe: ' Hausa' }, { tribe: ' Fulani' }, { tribe: ' Tiv' }, { tribe: ' Ibibio' }, { tribe: ' Ijaw' }, { tribe: ' Urhobo' }, { tribe: ' Esan' }, { tribe: ' Ogoni' }, { tribe: ' Igala' }, { tribe: ' Edo' }, { tribe: ' Itsekiri' }, { tribe: ' Others' }
  ]
  complexionarray = [
    { complexion: 'Light Dark' }, { complexion: ' Very Dark' },
  ]
  jobseekerarray = [
    { seeker: 'looking for work' }, { seeker: ' not looking work' }, { seeker: ' employed but looking for work' }
  ]
  yearDate = [
    { year: 1960 }, { year: 1961 }, { year: 1962 }, { year: 1963 }, { year: 1964 }, { year: 1965 }, { year: 1966 }, { year: 1967 }, { year: 1968 }, { year: 1969 }, { year: 1970 }, { year: 1971 }, { year: 1972 }, { year: 1973 }, { year: 1974 }, { year: 1975 }, { year: 1976 }, { year: 1977 }, { year: 1978 }, { year: 1979 }, { year: 1980 }, { year: 1981 }, { year: 1982 }, { year: 1983 }, { year: 1984 }, { year: 1985 }, { year: 1986 }, { year: 1987 }, { year: 1988 }, { year: 1989 }, { year: 1990 }, { year: 1991 }, { year: 1992 }, { year: 1993 }, { year: 1994 }, { year: 1995 }, { year: 1996 }, { year: 1997 }, { year: 1998 }, { year: 1999 }, { year: 2000 }, { year: 2001 }, { year: 2002 }, { year: 2003 }, { year: 2004 }, { year: 2005 }, { year: 2006 }, { year: 2007 }, { year: 2008 }, { year: 2009 }, { year: 2010 }, { year: 2011 }, { year: 2012 }, { year: 2013 }, { year: 2014 }, { year: 2015 }, { year: 2016 }, { year: 2017 }, { year: 2018 }, { year: 2019 }, { year: 2020 }, { year: 2021 }, { year: 2022 }, { year: 2023 }, { year: 2024 }, { year: 2025 }, { year: 2026 }, { year: 2027 }, { year: 2028 }, { year: 2029 }, { year: 2030 }, { year: 2031 }, { year: 2032 }, { year: 2033 }, { year: 2034 }, { year: 2035 }
  ];
  datearr = [{ day: 1 }, { day: 2 }, { day: 3 }, { day: 4 }, { day: 5 }, { day: 6 }, { day: 7 }, { day: 8 }, { day: 9 }, { day: 10 },
  { day: 11 }, { day: 12 }, { day: 13 }, { day: 14 }, { day: 15 }, { day: 16 }, { day: 17 }, { day: 18 }, { day: 19 }, { day: 20 },
  { day: 21 }, { day: 22 }, { day: 23 }, { day: 24 }, { day: 25 }, { day: 26 }, { day: 27 }, { day: 28 }, { day: 29 }, { day: 30 },
  { day: 31 }
  ]
  monthDate = [{ month: '01' }, { month: '02' }, { month: '03' }, { month: '04' }, { month: '05' }, { month: '06' }, { month: '07' },
  { month: '08' }, { month: '09' }, { month: '10' }, { month: '11' }, { month: '12' },
  ]

  list = false
  list1 = false
  list2 = false;
  slist = false;
  statelist = false;

  sdate = false;
  yeardiv = false;
  monthdiv = false;

  syear: any = '';
  daydate: any = '';

  showdate = false;
  showyear = false;
  showmonth = false;

  showflags = false;
  nation = false;
  flaglist = false
  flagimage: any;
  showimage = false;
  upicon = false;
  profileimage: any = 'assets/imgs/andrew.png';

  picurl: any;
  identitynumber = '';
  firstname = '';
  lastname = '';
  dob = '';
  gender = '';
  nationality = '';
  phonenumber = ''
  smonth = '';

  callingcode: any;

  institutename = '';
  startPicker = false;
  endPicker = false;
  dateValue = format(new Date(), 'yyyy-MM-dd');
  starteddate = '';
  endeddate = '';
  choosestate = '';
  statearray: any;
  min_qualification: '';
  description: any;

  footerhide = false;
  constructor(private http: HttpClient,
    public platform: Platform,
    public navCtrl: NavController,
    public modal: ModalController,
    private sanitizer: DomSanitizer,
    public alertCtrl: AlertController,
    public extra: ExtrasService,
    public rest: RestService,
    public cd: ChangeDetectorRef,
    public router: Router
  ) {

  }

  ngOnInit() {
    this.platform.keyboardDidShow.subscribe(ev => {
      console.log('keyboard show', ev);
      this.footerhide = true;
      this.cd.detectChanges();

    });


    this.platform.keyboardDidHide.subscribe(ev => {
      this.footerhide = false;

      this.cd.detectChanges();
      console.log('keyboard hide');

    });

    let userId = localStorage.getItem('userid');
    this.getuserdetails(userId)
    this.setToday();

  }

  getuserdetails(userid) {
    this.rest.userdetail('getuser', userid, localStorage.getItem('auth_token')).subscribe((data: any) => {

      console.log('getuser data==', data);
      if (data.user.dofb != null || data.user.dofb != undefined) {

        this.showyear = true;
        this.showmonth = true;
        this.showdate = true;
        let splitdob = data.user.dofb
        let split = splitdob.split("-");
        console.log(split);
        this.syear = split[0]
        this.smonth = split[1]
        this.daydate = split[2]
      }


      this.identitynumber = data.user.identification_no;
      this.gender = data.user.gender
      this.firstname = data.user.firstname;
      this.lastname = data.user.lastname;
      this.phonenumber = data.user.phone;
      this.nationality = data.user.nationality;
      this.profileimage = data.user.profile_image;
      this.choosestate = data.user.state
      this.choosejobseeker = data.user.seeker_status

    })
  }

  setToday() {
    this.starteddate = 'Choose start date'
    this.endeddate = 'Choose end date';
    this.choosestate = 'State of origin'
  }


  startdate(value) {
    this.dateValue = value;
    this.starteddate = format(parseISO(value), ' yyyy-MM-d');
    this.startPicker = false;
  }

  enddate(value) {
    this.dateValue = value;
    this.endeddate = format(parseISO(value), ' yyyy-MM-d')
    this.endPicker = false;
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
    // console.log('code===', item.callingCodes[0])
    this.flaglist = false
    this.flagimage = item.flag
    this.showimage = true;
    this.upicon = false;
    this.nationality = item.name
    this.callingcode = '+' + item.callingCodes[0];
    console.log('code===', this.callingcode)
  }

  religionlist() {
    if (this.list == false) {
      this.list = true
    } else {
      this.list = false
    }
  }

  Jobseekerlist() {
    if (this.slist == false) {
      this.slist = true
    } else {
      this.slist = false
    }
  }
  stateoriginlist() {
    if (this.statelist == false) {
      this.statelist = true
      this.rest.getRequest('states', localStorage.getItem('auth_token')).subscribe((data: any) => {
        console.log('state array==', data)
        this.statearray = data.states;
      })
    } else {
      this.statelist = false
    }
  }

  getdate() {

    this.sdate = true;
  }
  selectdate(daydate) {
    this.daydate = daydate

    this.sdate = false
    this.showdate = true
  }
  getmonth() {
    this.monthdiv = true
  }
  selectmonth(month) {
    console.log('year', month)
    this.smonth = month

    this.monthdiv = false
    this.showmonth = true
  }
  selectyear(year) {
    console.log('year', year)
    this.syear = year

    this.yeardiv = false
    this.showyear = true
  }

  getyear() {
    this.yeardiv = true
  }

  selectgender(ev) {
    console.log('value=', ev.detail.value);
    this.gender = ev.detail.value
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
  selectjobseeker(list) {
    this.choosejobseeker = list.seeker;
    console.log('slected type', this.choosejobseeker);
  }
  selecttribe(list) {
    this.choosetribe = list.tribe
    console.log('slected type', this.choosetribe);
  }
  selectcomplexion(list) {
    this.Complexion = list.complexion
    console.log('slected type', this.Complexion);
  }

  selectstate(list) {
    this.choosestate = list.name
    console.log('slected type state', this.choosestate);
  }


  previewprofile() {

    if (this.identitynumber == '') {
      this.extra.presentToast('Identity number required');
    }
    else if (this.firstname == '') {
      this.extra.presentToast('Firstname is required');
    }
    else if (this.lastname == '') {
      this.extra.presentToast('Lastname is required');
    }
    else if (this.daydate == '') {
      this.extra.presentToast('Date is required');
    }
    else if (this.smonth == '') {
      this.extra.presentToast('Month is required');
    }
    else if (this.syear == '') {
      this.extra.presentToast('Year is required');
    }
    else if (this.gender == '') {
      this.extra.presentToast('Please specified gender');
    }
    else if (this.nationality == '') {
      this.nation = true;
      this.content.scrollToTop(1500);
      this.extra.presentToast('Select your nationality');
    }
    else if (this.phonenumber == '') {
      this.extra.presentToast('Phone number required');
    } else if (this.choosejobseeker == 'Choose Job seeker status') {
      this.extra.presentToast('Select job seeker status')
    } else {
      let datasend = {
        identification_type: this.choosejobseeker,
        identification_no: this.identitynumber,
        firstname: this.firstname,
        lastname: this.lastname,
        dofb: this.syear + '-' + this.smonth + '-' + this.daydate,
        gender: this.gender,
        phone: this.phonenumber,
        nationality: this.nationality,
        profile_image: this.picurl,
        state: this.choosestate,
        seeker_status: this.choosejobseeker
      }



      this.addeducation(datasend)

    }
    setInterval(() => {
      this.nation = false
    }, 5000);

  }

  addeducation(datasend) {
    if (this.institutename == '') {
      this.extra.presentToast('Enter your institute');
    } else if (this.min_qualification == '') {
      this.extra.presentToast('Enter your minimum qualification ');
    }
    else if (this.starteddate == 'Choose start date') {
      this.extra.presentToast('Choose start date');
    } else if (this.endeddate == 'Choose end date') {
      this.extra.presentToast('Choose end date');
    } else {
      let datatosend = {
        institution: this.institutename,
        min_qualification: this.min_qualification,
        start_date: this.starteddate,
        end_date: this.endeddate,
        description: 'heloow'
      }
      this.rest.sendRequest('update-profile', datasend, localStorage.getItem('auth_token')).subscribe((res: any) => {
        console.log('profile update response--', res)
        if (res.status == 'true') {
          this.extra.presentToast(res.message);
          //add education api///
          this.rest.sendRequest('add-education', datatosend, localStorage.getItem('auth_token')).subscribe((res: any) => {
            console.log('education update response--', res);
            if (res.status == 'true') {
              this.navCtrl.navigateForward('profile-preview');
            } else {
              this.extra.presentToast(res.message);
            }

          })
          ////////////////////////
        } else {
          this.extra.presentToast(res.message);
        }

      })

    }

  }
  async chooseImage() {

    let confirm = await this.alertCtrl.create({
      header: 'Upload Image',
      cssClass: 'camera-alert',
      buttons: [
        {
          text: 'Camera',
          handler: async () => {
            console.log('came inside Camera');
            const image = await Camera.getPhoto({
              quality: 75,
              allowEditing: false,
              resultType: CameraResultType.DataUrl,
              source: CameraSource.Camera
            }).then(res => {
              this.profileimage = res.dataUrl
              this.picurl = res.dataUrl
              // console.log('image uri==', res.dataUrl);
              // this.saveimage(res.dataUrl)
            })
          }
        },
        {
          text: 'Gallery',
          handler: async () => {
            console.log('came inside yes');

            const image = await Camera.getPhoto({
              quality: 75,
              allowEditing: false,
              resultType: CameraResultType.DataUrl,
              source: CameraSource.Photos,
            }).then(res => {
              this.profileimage = res.dataUrl
              let picurl1 = res.dataUrl
              console.log('image uri==', res.dataUrl);
              let picurl2 = picurl1.split(',');
              this.picurl = picurl2[1]
              console.log('picurlw12', this.picurl);

              // this.saveimage(res.dataUrl)
            })


            // if (image) {
            //   // this.saveimage(image)


            // }
          }
        },
      ]
    })
    await confirm.present();

  }


  async saveimage(photo) {
    // const base64Data = await this.readAsBase64(photo);
    // console.log('base64 data==', base64Data);
    // this.profileimage = `data:image/png;base64,${base64Data}`
    // this.profileimage = this.sanitizer.bypassSecurityTrustResourceUrl(value);
    const fileName = new Date().getTime() + '.png';
    const savedFile = await Filesystem.writeFile({
      path: `${IMAGE_DIR}/${fileName}`,
      data: photo.toString(),
      directory: Directory.Documents,
      recursive: true
    });

    console.log('savedFile data==', savedFile)
    let imageget = savedFile.uri.split('/')
    console.log('imageget', imageget);
    this.picurl = imageget[8]
    console.log('picurl==', this.picurl)

  }

  async readAsBase64(photo) {
    if (this.platform.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: photo.path
      })
      return file.data;
    } else {
      const response = await fetch(photo.webPath);
      const blob = await response.blob();

      return await this.convertBlobToBase64(blob) as string;
    }


  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });


  // previewprofile() {
  //   this.navCtrl.navigateForward('profile-preview')
  // }

  employmenthistory() {
    []
    this.router.navigate(['employmenthistory'])
  }
  certificate() {
    this.router.navigate(['addcertificate'])
  }
  skills() {
    this.router.navigate(['userskills'])
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
