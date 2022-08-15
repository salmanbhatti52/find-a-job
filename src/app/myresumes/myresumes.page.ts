import { NavController, Platform } from '@ionic/angular';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';
import { RestService } from '../services/rest.service';
import { ExtrasService } from '../services/extras.service';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { VideoEditor } from '@awesome-cordova-plugins/video-editor/ngx';
import { Filesystem, Directory } from '@capacitor/filesystem';
import * as _ from 'lodash';
import * as moment from 'moment';
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
  efile = false;
  lettertitle = '';

  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  media: any;
  resumes = [];
  coverletters = [];
  userId: any;

  galleryOptions: CameraOptions = {
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.FILE_URI,
    quality: 100,
    allowEdit: true,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.VIDEO,
    correctOrientation: true
  }
  thumbpic: any;
  base64Data: Promise<string>;
  videobase64: any;
  constructor(public navCtrl: NavController,
    private chooser: Chooser,
    public rest: RestService,
    public extra: ExtrasService,
    private camera: Camera,
    private videoEditor: VideoEditor,
    public platform: Platform) { }

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


  ///upload resume////
  fileChangeEvent(fileInput: any) {
    if (this.title == '') {
      this.extra.presentToast('Title is required');
    } else {
      if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        this.efile = true;
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

  ///cover letter///
  uploadcoverletter(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      console.log('file type', fileInput.target.files[0].type);
      this.filetype = fileInput.target.files[0].type
      const max_size = 10485760;
      const allowed_types = ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf', 'application/msword', 'image/jpg', 'image/jpeg', 'image/png'];
      const max_height = 15200;
      const max_width = 25600;
      if (fileInput.target.files[0].size > max_size) {
        this.extra.presentToast('Upload a CV no larger than 10MB')

      }

      else if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
        this.extra.presentToast('upload type is not correct')
      } else {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          console.log('file on load===', e);
          const image = new Image();
          image.src = e.target.result;

          const imgBase64Path = e.target.result.split(',');
          this.cardImageBase64 = imgBase64Path[1];
          // console.log('dsadasdasd', this.cardImageBase64);

        };

        reader.readAsDataURL(fileInput.target.files[0]);
      }

    } else {
      alert('not valid')
    }
  }

  async uploadvideo() {
    // console.log('video from gallery is = ', imageData);
    console.log('dasdsadsadsad');
    if (this.title == '') {
      this.extra.presentToast('Title is required');
    } else {
      this.rest.requestNecessaryPermissions().then(() => {
        this.camera.getPicture(this.galleryOptions)
          .then(async imageData => {
            const base64Data = await this.readAsBase64(imageData);
            console.log('base64 data==', base64Data);
            let splitvideo = base64Data.split(',');
            this.videobase64 = splitvideo[1]
            console.log('this.videobase64= ', this.videobase64);
            this.sendvideo(this.videobase64)
            let thumbnail = this.randomnumberGenerator();
            this.thumbpic = '';
            this.videoEditor.createThumbnail({
              fileUri: imageData,
              outputFileName: thumbnail,
              atTime: 3,
              width: 320,
              height: 480,
              quality: 100,
            }).then(res => {
              console.log('thumbpic', this.thumbpic);
              let datatosubmit = {
                type: 1,
                picture: imageData,
                thumb: this.thumbpic,
                plainthumb: res,
                title: this.title
              }
              console.log('thumbnail image = ', res);
              console.log('data to submit is = ', datatosubmit);

            });
          }, err => {
            console.log('error-==', err);

          })
      });
    }


  }

  async readAsBase64(photo) {

    // if (this.platform.is('hybrid')) {
    //   console.log('in base 64 hybrid==', photo);
    //   const file = await Filesystem.readFile({
    //     path: 'file://' + photo
    //   })
    //   console.log('file path==', file);

    //   return file.data;
    // } else {
    console.log('in base 64==', photo);
    const response = await fetch(photo);
    const blob = await response.blob();

    return await this.convertBlobToBase64(blob) as string;
    // }


  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  uploadfile(filetype) {
    let datatosend = {
      title: this.title,
      resume: filetype
    }
    this.rest.sendRequest('add-cvpdf', datatosend, localStorage.getItem('auth_token')).subscribe((data: any) => {
      console.log('data cv resosne====', data);
      if (data.status == 'true') {
        this.efile = false;
        this.title = '';
        this.extra.presentToast(data.message);
        this.getuserdetails()
      } else {
        this.extra.presentToast(data.message);
      }

    })
  }

  saveletter() {
    if (this.lettertitle == '') {
      this.extra.presentToast('Title is required');
    } else {
      let datatosend = {
        title: this.lettertitle,
        coverletter: this.cardImageBase64
      }
      this.rest.sendRequest('add-coverletter', datatosend, localStorage.getItem('auth_token')).subscribe((data: any) => {
        console.log('data cv resosne====', data);
        if (data.status == 'true') {
          this.lettertitle = '';
          this.extra.presentToast(data.message);
          this.getuserdetails()
        } else {
          this.extra.presentToast(data.message);
        }

      })
    }

  }

  sendvideo(videourl) {
    let datatosend = {
      title: this.title,
      resume: videourl
    }
    this.rest.sendRequest('add-videocv', datatosend, localStorage.getItem('auth_token')).subscribe((data: any) => {
      console.log('data cv resosne====', data);
      if (data.status == 'true') {
        this.efile = false;
        this.extra.presentToast(data.message);
        this.getuserdetails()
      } else {
        this.extra.presentToast(data.message);
      }

    })
  }
  getuserdetails() {
    this.resumes = []
    this.coverletters = []
    this.rest.userdetail('getuser', this.userId, localStorage.getItem('auth_token')).subscribe((data: any) => {

      console.log('getuser data==', data);

      this.media = data.user.media
      for (var i = 0; i < this.media.length; i++) {
        if (this.media[i].collection_name == 'resumes' || this.media[i].collection_name == 'video-resumes') {
          let datato = {
            id: this.media[i].id,
            collectionname: this.media[i].collection_name,
            name: this.media[i].name,
            filesize: this.media[i].size / 1024,
            date: moment(this.media[i].created_at).format('DD MMM, YYYY')
          }
          this.resumes.push(datato)
        } if (this.media[i].collection_name == 'coverletters') {
          let datato = {
            id: this.media[i].uuid,
            collectionname: this.media[i].collection_name,
            name: this.media[i].name,
            filesize: this.media[i].size / 1024,
            date: moment(this.media[i].created_at).format('DD MMM, YYYY')
          }
          this.coverletters.push(datato)
        }
        console.log('media array=====', this.coverletters);
      }





    })
  }

  endurl: any
  delresume(i, resume) {
    console.log('resume id==', resume.id);
    if (resume.collectionname == 'resumes') {
      this.endurl = 'delete-cv'
      this.deleteresumeapi(i, this.endurl, resume.id)
    } else {
      this.endurl = 'delete-videocv';
      this.deleteresumeapi(i, this.endurl, resume.id)
    }
  }
  deleteresumeapi(index, endpoint, id) {
    this.rest.delete(this.endurl, id, localStorage.getItem('auth_token')).subscribe((data: any) => {
      console.log('delete-employment==', data);
      this.extra.presentToast(data.message)
      let splice = this.resumes.splice(index, 1)
      // console.log('splice index', splice);

    })
  }

  delletter(index, letter) {
    this.rest.delete('delete-coverletter', letter.id, localStorage.getItem('auth_token')).subscribe((data: any) => {
      console.log('delete-employment==', data);
      this.extra.presentToast(data.message)
      let splice = this.coverletters.splice(index, 1)
      // console.log('splice index', splice);

    })
  }

  randomnumberGenerator() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
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
