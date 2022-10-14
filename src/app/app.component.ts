import { MenuController } from '@ionic/angular';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Dashboard', url: 'dashboard' },
    { title: 'Profile', url: 'profile-preview' },
    { title: 'Jobs' },
    { title: 'Companies', url: 'companies' },
    { title: 'My Resumes', url: 'myresumes' },
    { title: 'Job Centers', url: 'jobcenters' },
    { title: 'Transactions', url: 'transactions' },
    { title: 'Interviews', url: 'interviews' },
    { title: 'Messages', url: 'messages' },
    { title: 'Pricing Plans', url: 'pricingplans' },
    { title: 'Raffle Tickets', url: 'raffletickets' },
    { title: 'superraffleticket', url: 'superraffleticket' },
    { title: 'Popup', url: 'popup' },
    { title: 'Our Services', url: 'ourservices' },
    { title: 'jobseekervideos', url: 'job-seeker-videos' },
    { title: 'trainingdirectory', url: 'training-directory' },
    { title: 'safejobs', url: 'safe-jobs' },
    { title: 'reportascam', url: 'reportascam' },
    // { title: 'checkout', url: 'checkout' },
    { title: 'cv services', url: 'cv-services' },
    // { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    // { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    // { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    // { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    // { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    // { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  activepage: any;
  show = false;
  // appsubPages = [];
  appsubPages = [

    { title: 'Find A Job', url: '/findajob' },
    { title: 'Saved Jobs', url: '/savedjobs' },
    { title: 'Application', url: '/application' }

  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(public menuCtrl: MenuController,
    public navCtrl: NavController) {


    console.log(localStorage.getItem('userid'));

    if (localStorage.getItem('userid') == '' || localStorage.getItem('userid') == null) {
      this.navCtrl.navigateRoot('signin')
    } else {
      this.navCtrl.navigateRoot('dashboard');
    }
  }

  menunbtn() {
    this.menuCtrl.close();
  }


  openpage(p) {
    console.log('page===', p);
    this.activepage = p.title
    if (p.url == '/findajob') {
      this.navCtrl.navigateRoot('findajob')
    }
    if (p.url == '/savedjobs') {
      this.navCtrl.navigateRoot('savedjobs')
    }
    if (p.url == '/application') {
      this.navCtrl.navigateRoot('application')
    }
    if (this.activepage != 'Jobs') {
      this.menuCtrl.close();
      this.show = false;
    } else {
      this.showhide(p.url);
    }


  }
  showhide(url) {
    console.log(url);

    if (this.show == false) {
      this.show = true;
    } else {
      this.appsubPages = []
      this.show = false
    }
  }

  logout() {
    localStorage.removeItem('userid');
    this.navCtrl.navigateRoot('signin');
    this.menuCtrl.close();
  }
}
