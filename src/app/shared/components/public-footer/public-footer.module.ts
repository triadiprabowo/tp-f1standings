import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicFooterComponent } from './public-footer.component';
import { RouterModule } from '@angular/router';

@NgModule({
	imports: [
		CommonModule,
		RouterModule
	],
	declarations: [PublicFooterComponent],
	exports: [PublicFooterComponent]
})
export class PublicFooterModule { }
