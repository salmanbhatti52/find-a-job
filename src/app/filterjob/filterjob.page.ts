import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { RestService } from '../services/rest.service';
@Component({
  selector: 'app-filterjob',
  templateUrl: './filterjob.page.html',
  styleUrls: ['./filterjob.page.scss'],
})
export class FilterjobPage implements OnInit {
  lowprice: any;
  highprice: any;
  jobs = [
    { name: 'Construction', status: 'unchecked' }, { name: 'Real Estate', status: 'unchecked' }, { name: 'Law & Compliance', status: 'unchecked' },
    { name: 'Education', status: 'unchecked' }, { name: 'Banking & Finance', status: 'unchecked' }, { name: 'Logistics', status: 'unchecked' },
  ]
  types = [
    { name: 'Full-time', status: 'unchecked' }, { name: 'Part-time', status: 'unchecked' }, { name: 'Temporary', status: 'unchecked' },
    { name: 'Permanent', status: 'unchecked' }, { name: 'Contract', status: 'unchecked' }, { name: 'Graduate', status: 'unchecked' },
  ]
  posted = [{ name: 'Agency', status: 'unchecked' }, { name: 'Employer', status: 'unchecked' }, { name: 'FindAJob', status: 'unchecked' }
  ]
  salary = [{ sal: 'Annually', status: 'unchecked' }, { sal: 'Hourly', status: 'unchecked' }]
  posteddate = [{ date: 'Today', status: 'unchecked' }, { date: 'Last three days', status: 'unchecked' }, { date: 'Last week', status: 'unchecked' }, { date: 'Last two weeks', status: 'unchecked' }, { date: 'Any time', status: 'unchecked' }]

  jobsarray = [];
  startPicker = false;
  dateValue: any;
  date = false;
  selectdate = 'Selectdate';
  sdate: any;
  constructor(public modalCtrl: ModalController,
    public rest: RestService) { }

  ngOnInit() {
  }

  close() {
    this.modalCtrl.dismiss();
  }
  onSliderChanged(event) {

    this.lowprice = event.detail.value.lower
    this.highprice = event.detail.value.upper


  }

  selectindustory(job, i) {
    if (job.status == 'unchecked') {
      job.status = 'checked'
      this.jobsarray.push(job.name)
      console.log('job aray', this.jobsarray)
    } else {
      job.status = 'unchecked';
      const index = this.jobsarray.indexOf(job.name);
      if (index > -1) {
        this.jobsarray.splice(index, 1); // 2nd parameter means remove one item only
        console.log('job aray', this.jobsarray)
      }

    }

  }
  selectType(type) {
    if (type.status == 'unchecked') {
      type.status = 'checked'
    } else {
      type.status = 'unchecked'
    }
  }
  selectpost(post) {
    if (post.status == 'unchecked') {
      post.status = 'checked'
    } else {
      post.status = 'unchecked'
    }
  }
  selectsalary(s) {
    if (s.status == 'unchecked') {
      s.status = 'checked'
    } else {
      s.status = 'unchecked'
    }
  }
  postbydate(date) {
    if (date.status == 'unchecked') {
      date.status = 'checked'
    } else {
      date.status = 'unchecked'
    }
  }

  startdate(value) {
    this.dateValue = value;
    this.date = true;
    this.sdate = moment(this.dateValue).format('YYYY-MM-DD');
    this.startPicker = false;

  }

  showjobs() {

    this.modalCtrl.dismiss(this.sdate);
  }
}
