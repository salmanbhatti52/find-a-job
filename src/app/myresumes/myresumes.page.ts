import { NavController } from '@ionic/angular';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';
import { RestService } from '../services/rest.service';
import { ExtrasService } from '../services/extras.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-myresumes',
  templateUrl: './myresumes.page.html',
  styleUrls: ['./myresumes.page.scss'],
})
export class MyresumesPage implements OnInit {
  @ViewChild('mySegment', { read: ElementRef }) private mySegment: ElementRef;
  requestsType: any;
  filetype: any;
  title = '';
  file = false;

  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  media: any;
  resumes = [];
  userId: any;
  constructor(public navCtrl: NavController,
    private chooser: Chooser,
    public rest: RestService,
    public extra: ExtrasService) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userid');
    this.getuserdetails()
  }
  ionViewWillEnter() {
    if (this.requestsType) {
      if (this.requestsType === 'UploadResumes') {
        this.mySegment.nativeElement.children[0].click();

      }
      if (this.requestsType === 'CoverLetter') {
        this.mySegment.nativeElement.children[1].click();

      }
    } else {
      this.requestsType = 'UploadResumes';
      this.mySegment.nativeElement.children[0].click();

    }
  }
  segmentChanged(ev) {
    console.log('requestType value', ev.detail.value);
    let data = ev.detail.value;
    this.requestsType = data
    if (ev.detail.value === 'UploadResumes') {
      this.requestsType = 'UploadResumes';

    }
    if (ev.detail.value === 'CoverLetter') {
      this.requestsType = 'CoverLetter';

    }
    localStorage.setItem('requestType', this.requestsType);
  }



  fileChangeEvent(fileInput: any) {
    if (this.title == '') {
      this.extra.presentToast('Title is required');
    } else {
      if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        this.file = true;
        console.log('file type', fileInput.target.files[0].type);
        this.filetype = fileInput.target.files[0].type
        const max_size = 10485760;
        const allowed_types = ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf', 'application/msword'];
        const max_height = 15200;
        const max_width = 25600;
        if (fileInput.target.files[0].size > max_size) {
          this.extra.presentToast('Upload a CV no larger than 10MB')

        }

        else if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
          this.extra.presentToast('Only upload Pdf/docs')
        } else {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            console.log('file on load===', e);
            const image = new Image();
            image.src = e.target.result;

            const imgBase64Path = e.target.result.split(',');
            this.cardImageBase64 = imgBase64Path[1];
            this.uploadfile(this.cardImageBase64)
          };

          reader.readAsDataURL(fileInput.target.files[0]);
        }

      } else {
        alert('not valid')
      }
    }

  }
  uploadfile(filetype) {
    let datatosend = {
      title: this.title,
      resume: filetype
    }
    this.rest.sendRequest('add-cvpdf', datatosend, localStorage.getItem('auth_token')).subscribe((data: any) => {
      console.log('data cv resosne====', data);
      if (data.status == 'true') {
        this.extra.presentToast(data.message)
      } else {
        this.extra.presentToast(data.message)
      }

    })
  }

  getuserdetails() {
    this.rest.userdetail('getuser', this.userId, localStorage.getItem('auth_token')).subscribe((data: any) => {

      console.log('getuser data==', data);

      this.media = data.user.media
      for (var i = 0; i < this.media.length; i++) {
        if (this.media[i].collection_name == 'resumes') {
          let datato = {
            id: this.media[i].id,
            collectionname: this.media[i].collection_name,
            name: this.media[i].name,
            filesize: this.media[i].size
          }
          this.resumes.push(datato)
        }
        console.log('media array=====', this.resumes);
      }





    })
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
}
