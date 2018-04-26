import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TpPreloaderComponent } from './tp-preloader.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [TpPreloaderComponent],
	exports: [TpPreloaderComponent]
})
export class TpPreloaderModule { }
