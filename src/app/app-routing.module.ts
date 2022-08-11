import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./signin/signin.module').then(m => m.SigninPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'otp',
    loadChildren: () => import('./otp/otp.module').then(m => m.OtpPageModule)
  },
  {
    path: 'forgotpassword',
    loadChildren: () => import('./forgotpassword/forgotpassword.module').then(m => m.ForgotpasswordPageModule)
  },
  {
    path: 'superraffleticket',
    loadChildren: () => import('./superraffleticket/superraffleticket.module').then(m => m.SuperraffleticketPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'findajob',
    loadChildren: () => import('./findajob/findajob.module').then(m => m.FindajobPageModule)
  },
  {
    path: 'savedjobs',
    loadChildren: () => import('./savedjobs/savedjobs.module').then(m => m.SavedjobsPageModule)
  },
  {
    path: 'application',
    loadChildren: () => import('./application/application.module').then(m => m.ApplicationPageModule)
  },
  {
    path: 'companies',
    loadChildren: () => import('./companies/companies.module').then(m => m.CompaniesPageModule)
  },
  {
    path: 'company-details',
    loadChildren: () => import('./company-details/company-details.module').then(m => m.CompanyDetailsPageModule)
  },
  {
    path: 'myresumes',
    loadChildren: () => import('./myresumes/myresumes.module').then(m => m.MyresumesPageModule)
  },
  {
    path: 'jobcenters',
    loadChildren: () => import('./jobcenters/jobcenters.module').then(m => m.JobcentersPageModule)
  },
  {
    path: 'transactions',
    loadChildren: () => import('./transactions/transactions.module').then(m => m.TransactionsPageModule)
  },
  {
    path: 'interviews',
    loadChildren: () => import('./interviews/interviews.module').then(m => m.InterviewsPageModule)
  },
  {
    path: 'messages',
    loadChildren: () => import('./messages/messages.module').then(m => m.MessagesPageModule)
  },
  {
    path: 'message',
    loadChildren: () => import('./message/message.module').then(m => m.MessagePageModule)
  },
  {
    path: 'profile-preview',
    loadChildren: () => import('./profile-preview/profile-preview.module').then(m => m.ProfilePreviewPageModule)
  },
  {
    path: 'job-detail',
    loadChildren: () => import('./job-detail/job-detail.module').then(m => m.JobDetailPageModule)
  },
  {
    path: 'pricingplans',
    loadChildren: () => import('./pricingplans/pricingplans.module').then(m => m.PricingplansPageModule)
  },
  {
    path: 'raffletickets',
    loadChildren: () => import('./raffletickets/raffletickets.module').then(m => m.RaffleticketsPageModule)
  },
  {
    path: 'filterjob',
    loadChildren: () => import('./filterjob/filterjob.module').then(m => m.FilterjobPageModule)
  },
  {
    path: 'jobcenterdetails',
    loadChildren: () => import('./jobcenterdetails/jobcenterdetails.module').then(m => m.JobcenterdetailsPageModule)
  },
  {
    path: 'jobappointment',
    loadChildren: () => import('./jobappointment/jobappointment.module').then(m => m.JobappointmentPageModule)
  },
  {
    path: 'training-directory',
    loadChildren: () => import('./training-directory/training-directory.module').then(m => m.TrainingDirectoryPageModule)
  },
  {
    path: 'job-seeker-videos',
    loadChildren: () => import('./job-seeker-videos/job-seeker-videos.module').then(m => m.JobSeekerVideosPageModule)
  },
  {
    path: 'jobalert',
    loadChildren: () => import('./jobalert/jobalert.module').then(m => m.JobalertPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutPageModule)
  },
  {
    path: 'reportascam',
    loadChildren: () => import('./reportascam/reportascam.module').then(m => m.ReportascamPageModule)
  },
  {
    path: 'cv-services',
    loadChildren: () => import('./cv-services/cv-services.module').then(m => m.CvServicesPageModule)
  },
  {
    path: 'safe-jobs',
    loadChildren: () => import('./safe-jobs/safe-jobs.module').then(m => m.SafeJobsPageModule)
  },
  {
    path: 'popup',
    loadChildren: () => import('./popup/popup.module').then( m => m.PopupPageModule)
  },
  {
    path: 'ourservices',
    loadChildren: () => import('./ourservices/ourservices.module').then( m => m.OurservicesPageModule)
  },
  {
    path: 'employmenthistory',
    loadChildren: () => import('./employmenthistory/employmenthistory.module').then( m => m.EmploymenthistoryPageModule)
  },
  {
    path: 'addcertificate',
    loadChildren: () => import('./addcertificate/addcertificate.module').then( m => m.AddcertificatePageModule)
  },
  {
    path: 'userskills',
    loadChildren: () => import('./userskills/userskills.module').then( m => m.UserskillsPageModule)
  },
  {
    path: 'searchedjobs',
    loadChildren: () => import('./searchedjobs/searchedjobs.module').then( m => m.SearchedjobsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
