import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonsComponent } from './seasons.component';
import { HttpClientModule } from '@angular/common/http';
import { AppConstant } from '../../app.constant';

import { RouterTestingModule } from '@angular/router/testing';
import { PublicHeaderModule } from '../../shared/components/public-header/public-header.module';
import { PublicFooterModule } from '../../shared/components/public-footer/public-footer.module';
import { TpPreloaderModule } from '../../shared/components/tp-preloader/tp-preloader.module';
import { CoreAPIService } from '../../shared/services/core-api.service';

interface wcDriver {
	getFullName: string,
	getSeason: string,
	detail()
}

describe('SeasonsComponent', () => {
	let component: SeasonsComponent;
	let service: CoreAPIService;
	let fixture: ComponentFixture<SeasonsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				PublicFooterModule,
				PublicHeaderModule,
				RouterTestingModule,
				TpPreloaderModule,
				HttpClientModule
			],
			declarations: [ SeasonsComponent ],
			providers: [ AppConstant, CoreAPIService ]
		})
		.compileComponents()
		.then(() => {
			fixture = TestBed.createComponent(SeasonsComponent);
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

	it('should fetch champions data between 2005 and 2015', () => {
		fixture.detectChanges();
		expect(component.$vm.champions.length).toEqual(11);
	});

	it('should run wcDriver() function', () => {
		fixture.detectChanges();
		expect(component.wcDriver(component.$vm.champions[0])).toBeTruthy();
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