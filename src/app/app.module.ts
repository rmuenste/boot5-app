import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { VocControllerComponent } from './components/voc-controller/voc-controller.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/navigation/header/header.component';
import { SidenavListComponent } from './components/navigation/sidenav-list/sidenav-list.component';
import { LandingComponent } from './components/landing/landing.component';
import { FooterComponent } from './components/footer/footer.component';
import { GameBarComponent } from './components/navigation/game-bar/game-bar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { StopTrainerComponent } from './components/voc-controller/stop-trainer.component';

@NgModule({
  declarations: [
    AppComponent,
    VocControllerComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    SidenavListComponent,
    LandingComponent,
    FooterComponent,
    GameBarComponent,
    StopTrainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSelectModule,
    MatDialogModule,
    MatListModule,
    HttpClientModule,
    MatIconModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [StopTrainerComponent]
})
export class AppModule { }
