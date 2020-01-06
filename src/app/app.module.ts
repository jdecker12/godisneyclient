import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './shared/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { DataService } from './services/data.service';
import { CardComponent } from './cards/card/card.component';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { FooterComponent } from './footer/footer.component';
import { GdHeroComponent } from './gdb-hero/gd-hero.component';
import { GdbMenuComponent } from './gdb-menu/gdb-menu.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { SidenavToolbarComponent } from './sidenav-toolbar/sidenav-toolbar.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FullCardComponent } from './cards/full-card/full-card.component';
import { LoginComponent } from './login/login.component';
import { SelectCardComponent } from './admin/select-card/select-card.component';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { BtmSheetComponent, BottomSheetOverviewExampleSheet } from './btm-sheet/btm-sheet.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    ToolbarComponent,
    SideBarComponent,
    FooterComponent,
    GdHeroComponent,
    GdbMenuComponent,
    SideNavComponent,
    SidenavToolbarComponent,
    AboutComponent,
    ContactComponent,
    FullCardComponent,
    LoginComponent,
    SelectCardComponent,
    NewsFeedComponent,
    BtmSheetComponent,
    BottomSheetOverviewExampleSheet
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    //RouterModule.forRoot(routes, {useHash: true})
  ],
  providers: [DataService],
  entryComponents: [BtmSheetComponent, BottomSheetOverviewExampleSheet],
  bootstrap: [AppComponent]
})
export class AppModule { }
