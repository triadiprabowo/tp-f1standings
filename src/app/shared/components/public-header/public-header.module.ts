import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicHeaderComponent } from './public-header.component';
import { RouterModule } from '@angular/router';

@NgModule({
	imports: [
		CommonModule,
		RouterModule
	],
	declarations: [PublicHeaderComponent],
	exports: [PublicHeaderComponent]
})
export class PublicHeaderModule { }
