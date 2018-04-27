import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonDetailComponent } from './season-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { AppConstant } from '../../../app.constant';

import { ActivatedRoute, Data } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PublicHeaderModule } from '../../../shared/components/public-header/public-header.module';
import { PublicFooterModule } from '../../../shared/components/public-footer/public-footer.module';
import { TpPreloaderModule } from '../../../shared/components/tp-preloader/tp-preloader.module';
import { CoreAPIService } from '../../../shared/services/core-api.service';
import * as Rx from 'rxjs/Rx';

describe('SeasonDetailComponent', () => {
	let component: SeasonDetailComponent;
	let service: CoreAPIService;
	let fixture: ComponentFixture<SeasonDetailComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				PublicFooterModule,
				PublicHeaderModule,
				RouterTestingModule,
				TpPreloaderModule,
				HttpClientModule
			],
			declarations: [ SeasonDetailComponent ],
			providers: [ 
				AppConstant, 
				CoreAPIService, 
				{ 
					provide: ActivatedRoute, 
					useValue: { 
						params: {
							subscribe: (fn: (value:Data) => void) => fn({
								year: 2015
							})
						}
					}
				}
			]
		})
		.compileComponents()
		.then(() => {
			fixture = TestBed.createComponent(SeasonDetailComponent);
			component = fixture.componentInstance;
			service = TestBed.get(CoreAPIService);
			fixture.detectChanges();
		})
	}));

	it('should be create required dependencies', () => {
		expect(component).toBeTruthy();
		expect(service).toBeTruthy();
		expect(service instanceof CoreAPIService).toBeTruthy();
	});

	it('should set season year to 2015', () => {
		fixture.detectChanges()
		expect(component.seasonYear).toEqual(2015);
	});

	it('should fetch detail data of 2015 season', () => {
		fixture.detectChanges();
		expect(component.$vm.champions.length).toEqual(11);
		expect(component.$vm.winners.length).not.toBeNull();
	});

	it('should return object of world champion driver detail', () => {
		fixture.detectChanges();
		expect(component.filterSeasonWorldChampion(2015)).not.toBeUndefined();
	});

	it('should return boolean when run isChampion', () => {
		fixture.detectChanges();

		fixture.whenStable().then(() => {
			expect(component.isChampion(component.$vm.winners.RaceTable.Races[0])).toBeDefined();
			expect(component.isChampion(component.$vm)).toBeFalsy();
		});
		
	});

	it('should known public-header element', async(() => {
		fixture.detectChanges();
		const compiled = fixture.debugElement.nativeElement;
		expect(compiled.querySelector('public-header')).toBeTruthy();
	}));

	it('should known public-footer element', async(() => {
		fixture.detectChanges();
		const compiled = fixture.debugElement.nativeElement;
		expect(compiled.querySelector('public-footer')).toBeTruthy();
	}));
});
