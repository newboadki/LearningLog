import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LearningLogComponent } from './learning-log/components/learning-log.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './core/auth/auth.module';

@NgModule({
  declarations: [AppComponent, LearningLogComponent],
  imports: [
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthenticationModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
