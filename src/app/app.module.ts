import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptorService } from './auth/auth-interceptor.service';

import { SharedModule } from './shared/shared.module';

import { StoreModule} from '@ngrx/store';

import { EffectsModule } from '@ngrx/effects';
import { CoreModule } from './core.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    // FormsModule,
    AppRoutingModule,
    HttpClientModule,

    SharedModule,
    CoreModule
    //StoreModule.forRoot(fromApp.appReducer),
    //EffectsModule.forRoot([AuthEffects])
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
