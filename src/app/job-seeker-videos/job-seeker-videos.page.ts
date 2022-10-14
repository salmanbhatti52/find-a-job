import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { ExtrasService } from '../services/extras.service';
import * as moment from 'moment';
import YouTubePlayer from 'youtube-player';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-job-seeker-videos',
  templateUrl: './job-seeker-videos.page.html',
  styleUrls: ['./job-seeker-videos.page.scss'],
})
export class JobSeekerVideosPage implements OnInit {
  videos = [];
  player: any;
  videoId: string = "";
  stopped = true;
  urlopen: any;
  constructor(public navCtrl: NavController,
    public rest: RestService,
    public extra: ExtrasService,
    public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.Jobseekervideos()
  }

  Jobseekervideos() {
    this.extra.loadershow();
    this.rest.getRequest('job-seeker-videos', localStorage.getItem('auth_token')).subscribe((res: any) => {

      console.log('response-===--', res);
      res.videos.forEach(ele => {
        let link = ele.link
        let split = link.split('https://www.youtube.com/watch?v=')
        console.log(split);
        this.videoId = 'https://www.youtube.com/embed/' + split[1];
        console.log(this.videoId);
        this.urlopen = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoId);
        let data = {
          title: ele.title,
          link: this.urlopen,
          date: moment(ele.created_at).format('DD MMM, YYYY')
        }
        this.videos.push(data);
        this.extra.hideLoader();
      });
      console.log('vdeos array====', this.videos);

    })
  }


  play(index, obj) {

    console.log(obj);

    let link = obj.link
    let split = link.split('https://www.youtube.com/watch?v=')
    console.log(split);
    this.videoId = 'https://www.youtube.com/embed/' + split[1];
    console.log(this.videoId);

    // if (this.stopped) {
    //   if (this.player == undefined) {
    this.player = YouTubePlayer('divid');
    this.player.loadVideoById(this.videoId).then((vd) => {
      console.log('video response=---', vd);

      this.player.playVideo();
      this.player = '';
      // this.stopped = false;
      this.videos[index].isdown = !(this.videos[index].isdown);
    })
    // }
    // } else {
    //   alert(this.videoId)
    // }
  }

  stop() {
    // if (!this.stopped) {
    //   if (this.player == undefined) {

    this.player
      .stopVideo()
      .then(() => {
        this.stopped == true;
      });
    // }
    // }
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
