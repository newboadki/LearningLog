import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LearningLogComponent } from './learning-log/components/learning-log.component';
import { authModuleHttpInterceptorProviders } from './authentication/interceptors/auth-module-interceptors-index';
import { AuthenticationModule } from './authentication/authentication.module';

@NgModule({
  declarations: [AppComponent, LearningLogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthenticationModule,
  ],
  providers: [authModuleHttpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
