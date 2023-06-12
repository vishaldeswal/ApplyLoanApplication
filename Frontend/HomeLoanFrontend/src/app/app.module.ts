import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { EndpointsService } from './services/endpoints.service';
import { InitializerService } from './services/initializer.service';
import { RouterModule } from '@angular/router';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { LoggingInterceptor } from './services/logging.interceptor';
import { CollateralModule } from './dashboard/collateral/collateral.module';
import { DisplayPromotionModule } from './home/display-promotion/display-promotion.module';
import { authGuard } from './services/auth.guard';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
    DashboardModule,
    LoginModule,
    HomeModule,
    RegisterModule,
    CollateralModule,
    DisplayPromotionModule
  ],
  providers: [
    InitializerService,
    EndpointsService,
    authGuard,
    [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: LoggingInterceptor,
        multi: true,
      },
    ],
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
