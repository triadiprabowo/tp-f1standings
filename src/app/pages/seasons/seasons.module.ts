import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeasonsComponent } from './seasons.component';
import { SeasonDetailComponent } from './detail/season-detail.component';
import { RouterModule } from '@angular/router';
import { TpPreloaderModule } from '../../shared/components/tp-preloader/tp-preloader.module';

@NgModule({
	imports: [
		CommonModule,
		TpPreloaderModule,
		RouterModule.forChild([
			{ path: '', component: SeasonsComponent },
			{ path: ':year', component: SeasonDetailComponent }
		])
	],
	declarations: [SeasonsComponent, SeasonDetailComponent]
})
export class SeasonsModule { }
