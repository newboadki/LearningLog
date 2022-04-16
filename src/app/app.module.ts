import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LearningLogComponent } from './learning-log/components/learning-log.component';
import { SignupModule } from './public-feature/signup/signup.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [AppComponent, LearningLogComponent],
  imports: [
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SignupModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
