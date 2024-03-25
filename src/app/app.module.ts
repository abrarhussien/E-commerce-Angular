import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductModule } from './products/product.module';
import { ReviewModule } from './reviews/review.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/authinterceptor';
import { EditReviewComponent } from './reviews/components/edit-review/edit-review.component';


@NgModule({
  declarations: [AppComponent, EditReviewComponent],
  imports: [BrowserModule, AppRoutingModule, ProductModule,ReviewModule],
  providers: [ {
    provide:HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },],
  bootstrap: [AppComponent],
})
export class AppModule {}
