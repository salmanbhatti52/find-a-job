import { Component, OnInit } from '@angular/core';
import { ExtrasService } from '../services/extras.service';
import { RestService } from '../services/rest.service';

import { format, parseISO, getDate, getMonth, getYear } from 'date-fns';
import { Location } from '@angular/common';
@Component({
  selector: 'app-employmenthistory',
  templateUrl: './employmenthistory.page.html',
  styleUrls: ['./employmenthistory.page.scss'],
})
export class EmploymenthistoryPage implements OnInit {
  list1 = false;
  industryname = '';
  industries: any;

  employer_name = '';
  job_title = '';
  job_level = '';
  country = '';
  function = '';
  monthly_salary = '';
  work_type = '';
  city = '';
  currently_work_here = '';
  responsibilities = '';

  startPicker = false;
  endPicker = false;
  dateValue = format(new Date(), 'yyyy-MM-dd');
  starteddate = '';
  endeddate = '';
  choosestate = '';
  constructor(public rest: RestService,
    public extra: ExtrasService,
    public location: Location) { }

  ngOnInit() {
    this.setToday();

  }
  goback() {
    this.location.back()
  }
  setToday() {
    this.starteddate = 'Choose start date'
    this.endeddate = 'Choose end date';
    this.choosestate = 'State of origin'
  }


  startdate(value) {
    this.dateValue = value;
    this.starteddate = format(parseISO(value), ' yyyy-MM-d')
    this.startPicker = false;
  }

  enddate(value) {
    this.dateValue = value;
    this.endeddate = format(parseISO(value), ' yyyy-MM-d')
    this.endPicker = false;
  }

  Industrylist() {
    if (this.list1 == false) {
      this.list1 = true;
      this.extra.loadershow()
      this.rest.getRequest('industry', localStorage.getItem('auth_token')).subscribe((data: any) => {
        console.log('industries array==', data)
        this.industries = data.industries;
        this.extra.hideLoader()
      })
    } else {
      this.list1 = false
    }
  }

  selectIndustry(list) {
    console.log('list of industries==', list);
    this.industryname = list.name
  }

  add() {
    if (this.employer_name == '') {
      this.extra.presentToast('Enter your name')
    } else if (this.job_title == '') {
      this.extra.presentToast('Enter job title')
    }
    else if (this.job_level == '') {
      this.extra.presentToast('Enter job level')
    }
    else if (this.country == '') {
      this.extra.presentToast('Enter your country name')
    }
    else if (this.industryname == '') {
      this.extra.presentToast('Enter your industry')
    }
    else if (this.function == '') {
      this.extra.presentToast('Enter function')
    }
    else if (this.monthly_salary == '') {
      this.extra.presentToast('Enter your monthly salary')
    }
    else if (this.work_type == '') {
      this.extra.presentToast('Enter your work type')
    }
    else if (this.city == '') {
      this.extra.presentToast('Enter your city')
    } else if (this.starteddate == 'Choose start date') {
      this.extra.presentToast('Enter job started date')
    }
    else if (this.currently_work_here == '') {
      this.extra.presentToast('Enter sCurrently work or not')
    }
    else if (this.responsibilities == '') {
      this.extra.presentToast('Enter your responsibilities')
    } else {
      if (this.endeddate == 'Choose end date') {
        this.endeddate = '';
      }
      let datatosend = {
        employer_name: this.employer_name,
        job_title: this.job_title,
        job_level: this.job_level,
        country: this.country,
        industry: this.industryname,
        function: this.function,
        monthly_salary: this.monthly_salary,
        work_type: this.work_type,
        city: this.city,
        start_date: this.starteddate,
        end_date: this.endeddate,
        currently_work_here: this.currently_work_here,
        responsibilities: this.responsibilities

      }
      this.rest.sendRequest('add-employment', datatosend, localStorage.getItem('auth_token')).subscribe((res: any) => {
        console.log('employment histort rsponse==', res);
        if (res.status == 'true') {
          this.employer_name = '';
          this.job_title = ''
          this.job_level = ''
          this.country = ''
          this.industryname = ''
          this.function = ''
          this.monthly_salary = ''
          this.work_type = ''
          this.city = ''
          this.starteddate = ''
          this.endeddate = ''
          this.currently_work_here = ''
          this.responsibilities = ''
          this.extra.presentToast(res.message)
        }
        if (res.status == 'false') {
          this.extra.presentToast(res.message)
        }
      })

    }
  }

}
