import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Import HttpClientModule from @angular/common/http
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { MembersComponent } from './members/members.component';
import { PartnersComponent } from './partners/partners.component';
import { HomeComponent } from './home/home.component';
import { RedeptionItemsComponent } from './redeption-items/redeption-items.component';
import { RedeemPointsComponent } from './redeem-points/redeem-points.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'members', component: MembersComponent },
  { path: 'partners', component: PartnersComponent },
  { path: 'redemptionItems', component: RedeptionItemsComponent },
  { path: 'redeemPoints', component: RedeemPointsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MembersComponent,
    PartnersComponent,
    HomeComponent,
    RedeptionItemsComponent,
    RedeemPointsComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
