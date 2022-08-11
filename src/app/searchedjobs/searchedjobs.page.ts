import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-searchedjobs',
  templateUrl: './searchedjobs.page.html',
  styleUrls: ['./searchedjobs.page.scss'],
})
export class SearchedjobsPage implements OnInit {
  jobs = []
  date: any;
  constructor(public rest: RestService,
    public activatedRoute: ActivatedRoute,
    public navCtrl: NavController) { }

  ngOnInit() {
    this.date = this.activatedRoute.snapshot.params['date'];
    console.log('date coming====', this.date);

    this.getjobs(this.date)
  }

  getjobs(date) {
    let data = {
      date: date
    }
    this.rest.sendRequest('search-job', data, localStorage.getItem('auth_token')).subscribe((res: any) => {
      console.log('saved jobs====', res);
      this.jobs = res.jobs[0]
    }, err => {
      console.log('error saved jobs====', err);
      // this.extra.presentToast(err.error.message)
    })
  }

  seedetail(jobid) {
    localStorage.setItem('jobid', jobid)
    this.navCtrl.navigateForward('job-detail');
  }
}
