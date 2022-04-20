import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'otpphoneinput',
    loadChildren: () => import('./otpphoneinput/otpphoneinput.module').then( m => m.OtpphoneinputPageModule)
  },
  {
    path: 'otpinput',
    loadChildren: () => import('./otpinput/otpinput.module').then( m => m.OtpinputPageModule)
  },
  {
    path: 'resetpassword',
    loadChildren: () => import('./resetpassword/resetpassword.module').then( m => m.ResetpasswordPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'searchresult',
    loadChildren: () => import('./searchresult/searchresult.module').then( m => m.SearchresultPageModule)
  },
  {
    path: 'salon',
    loadChildren: () => import('./salon/salon.module').then( m => m.SalonPageModule)
  },
  {
    path: 'services',
    loadChildren: () => import('./services/services.module').then( m => m.ServicesPageModule)
  },
  {
    path: 'selectProfessionals',
    loadChildren: () => import('./selectProfessionals/selectProfessionals.module').then( m => m.SelectProfessionalsPageModule)
  },
  {
    path: 'professional',
    loadChildren: () => import('./professional/professional.module').then( m => m.ProfessionalPageModule)
  },
  {
    path: 'portfolio',
    loadChildren: () => import('./portfolio/portfolio.module').then( m => m.PortfolioPageModule)
  },
  {
    path: 'appointmentmodal',
    loadChildren: () => import('./appointmentmodal/appointmentmodal.module').then( m => m.AppointmentmodalPageModule)
  },
  {
    path: 'paymentmodal',
    loadChildren: () => import('./paymentmodal/paymentmodal.module').then( m => m.PaymentmodalPageModule)
  },
  {
    path: 'market',
    loadChildren: () => import('./market/market.module').then( m => m.MarketPageModule)
  },
  {
    path: 'wallet',
    loadChildren: () => import('./wallet/wallet.module').then( m => m.WalletPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'myappointments',
    loadChildren: () => import('./myappointments/myappointments.module').then( m => m.MyappointmentsPageModule)
  },
  {
    path: 'review',
    loadChildren: () => import('./review/review.module').then( m => m.ReviewPageModule)
  },
  {
    path: 'favorite',
    loadChildren: () => import('./favorite/favorite.module').then( m => m.FavoritePageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'cards',
    loadChildren: () => import('./cards/cards.module').then( m => m.CardsPageModule)
  },
  {
    path: 'business',
    loadChildren: () => import('./business/business.module').then( m => m.BusinessPageModule)
  },
  {
    path: 'businesssetup',
    loadChildren: () => import('./businesssetup/businesssetup.module').then( m => m.BusinesssetupPageModule)
  },
  {
    path: 'mybusiness',
    loadChildren: () => import('./mybusiness/mybusiness.module').then( m => m.MybusinessPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'clients',
    loadChildren: () => import('./clients/clients.module').then( m => m.ClientsPageModule)
  },
  {
    path: 'addclient',
    loadChildren: () => import('./addclient/addclient.module').then( m => m.AddclientPageModule)
  },
  {
    path: 'verify',
    loadChildren: () => import('./verify/verify.module').then( m => m.VerifyPageModule)
  },
  {
    path: 'bankaccount1',
    loadChildren: () => import('./bankaccount1/bankaccount1.module').then( m => m.Bankaccount1PageModule)
  },
  {
    path: 'bankaccount2',
    loadChildren: () => import('./bankaccount2/bankaccount2.module').then( m => m.Bankaccount2PageModule)
  },
  {
    path: 'businessprofile',
    loadChildren: () => import('./businessprofile/businessprofile.module').then( m => m.BusinessprofilePageModule)
  },
  {
    path: 'location',
    loadChildren: () => import('./location/location.module').then( m => m.LocationPageModule)
  },
  {
    path: 'openinghours',
    loadChildren: () => import('./openinghours/openinghours.module').then( m => m.OpeninghoursPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'addservices',
    loadChildren: () => import('./addservices/addservices.module').then( m => m.AddservicesPageModule)
  },
  {
    path: 'editservice',
    loadChildren: () => import('./editservice/editservice.module').then( m => m.EditservicePageModule)
  },
  {
    path: 'professionallist',
    loadChildren: () => import('./professionallist/professionallist.module').then( m => m.ProfessionallistPageModule)
  },
  {
    path: 'addprofessional',
    loadChildren: () => import('./addprofessional/addprofessional.module').then( m => m.AddprofessionalPageModule)
  },
  {
    path: 'availability',
    loadChildren: () => import('./availability/availability.module').then( m => m.AvailabilityPageModule)
  },
  {
    path: 'availabilities',
    loadChildren: () => import('./availabilities/availabilities.module').then( m => m.AvailabilitiesPageModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./calendar/calendar.module').then( m => m.CalendarPageModule)
  },
  {
    path: 'appointmentdetail',
    loadChildren: () => import('./appointmentdetail/appointmentdetail.module').then( m => m.AppointmentdetailPageModule)
  },
  {
    path: 'profilesetting',
    loadChildren: () => import('./profilesetting/profilesetting.module').then( m => m.ProfilesettingPageModule)
  },
  {
    path: 'imagemodal',
    loadChildren: () => import('./imagemodal/imagemodal.module').then( m => m.ImagemodalPageModule)
  },
  {
    path: 'detailed',
    loadChildren: () => import('./detailed/detailed.module').then( m => m.DetailedPageModule)
  },
  {
    path: 'pricealerts',
    loadChildren: () => import('./pricealerts/pricealerts.module').then( m => m.PricealertsPageModule)
  },
  {
    path: 'buy',
    loadChildren: () => import('./buy/buy.module').then( m => m.BuyPageModule)
  },
  {
    path: 'insight',
    loadChildren: () => import('./insight/insight.module').then( m => m.InsightPageModule)
  },
  {
    path: 'insightdetails',
    loadChildren: () => import('./insightdetails/insightdetails.module').then( m => m.InsightdetailsPageModule)
  },
  {
    path: 'convert',
    loadChildren: () => import('./convert/convert.module').then( m => m.ConvertPageModule)
  },
  {
    path: 'searchmodal',
    loadChildren: () => import('./searchmodal/searchmodal.module').then( m => m.SearchmodalPageModule)
  },
  {
    path: 'calendarmodal',
    loadChildren: () => import('./calendarmodal/calendarmodal.module').then( m => m.CalendarmodalPageModule)
  },
  {
    path: 'compare',
    loadChildren: () => import('./compare/compare.module').then( m => m.ComparePageModule)
  },
  {
    path: 'paybycard',
    loadChildren: () => import('./paybycard/paybycard.module').then( m => m.PaybycardPageModule)
  },
  {
    path: 'paysuccess',
    loadChildren: () => import('./modals/paysuccess/paysuccess.module').then( m => m.PaysuccessPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
