import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppConstant } from './app.constant';
import { RouterList } from './app.router';
import { CoreAPIService } from './shared/services/core-api.service';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		CommonModule,
		HttpClientModule,
		RouterModule.forRoot(RouterList, { initialNavigation: 'enabled' })
	],
	providers: [AppConstant, CoreAPIService],
	bootstrap: [AppComponent]
})
export class AppModule { }
