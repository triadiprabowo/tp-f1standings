import { Component, OnInit } from '@angular/core';
import { CoreAPIService } from '../../shared/services/core-api.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-seasons',
	templateUrl: './seasons.component.html',
	styleUrls: ['./seasons.component.styl']
})
export class SeasonsComponent implements OnInit {

	public $vm:any;

	constructor(public api:CoreAPIService, private router:Router) { }

	ngOnInit() {
		this.api.data.subscribe(data => {
			this.$vm =  data;
		});

		/**
 		 ** @description get F1 world champion based on season year
 		 ** @method getSeasonChampion()
 		 ** @class CoreAPIService
 		 */
 		if(this.$vm.champions.length == 0) {
 			this.api.getSeasonChampion(2005,2015);	
 		} 		
	}

	/**
	 ** @description process data of driverStandings each season
	 ** @method wcDriver
	 ** @return object
	 */
	public wcDriver(item:any) {
		const givenName = item.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.givenName;
		const familyName = item.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.familyName;
		const season = item.MRData.StandingsTable.season;

		return {
			getFullName: `${givenName} ${familyName}`,
			getSeason: season,
			detail: (): void => {
				this.router.navigateByUrl(`/seasons/${season}`);
			}
		}
	}
}
