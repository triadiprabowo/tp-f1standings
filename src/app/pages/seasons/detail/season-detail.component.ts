import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CoreAPIService } from '../../../shared/services/core-api.service';

@Component({
	selector: 'app-season-detail',
	templateUrl: './season-detail.component.html'
})
export class SeasonDetailComponent implements OnInit {

	public seasonYear:number;
	public currentChampion:any = null;
	public $vm:any;

	constructor(private activatedRoute:ActivatedRoute, public api:CoreAPIService) {

		this.activatedRoute.params.subscribe((param:Params) => {
			this.seasonYear = param.year;
		});
	}

	ngOnInit() {
		/**
		 ** @description subscribe to subject
		 */
		this.api.data.subscribe(data => {
			this.$vm = data;

			if(data.champions.length > 0 && !this.currentChampion) {
				this.currentChampion = this.filterSeasonWorldChampion(this.seasonYear);
			}
		});

		/**
		 ** @description get season champion
		 ** @class CoreAPIService
		 ** @method getSeasonChampion()
		 */
		if(this.$vm.champions.length == 0) {
			this.api.getSeasonChampion(2005,2015);
		}

		/**
		 ** @description get winner lists each race per season
		 ** @class CoreAPIService
		 ** @method getRaceResults()
		 */
		this.api.getRaceResults(this.seasonYear, 1);
	}

	public filterSeasonWorldChampion(year:number): object {
		let currentChampion:any;

		for(let i=0; i < this.$vm.champions.length; i++) {
			if(this.$vm.champions[i].MRData.StandingsTable.season == year) {
				currentChampion = this.$vm.champions[i].MRData.StandingsTable;
			}
		}

		return currentChampion.StandingsLists[0].DriverStandings[0];
	}

	/**
	 ** @description check if selected data isChampion on selected season year
	 ** @method isChampion
	 ** @param <data driver>
	 ** @return boolean
	 */
	public isChampion(data:any): boolean {

		let currentChampion:any = '';

		for(let i=0; i < this.$vm.champions.length; i++) {
			if(this.$vm.champions[i].MRData.StandingsTable.season == this.seasonYear) {
				currentChampion = this.$vm.champions[i].MRData.StandingsTable;
			}
		}

		const raceDriverCode = data.Results[0].Driver.code;
		const championDriverCode = currentChampion.StandingsLists[0].DriverStandings[0].Driver.code;

		if(championDriverCode == raceDriverCode) {
			return true;
		}
		else {
			return false;	
		}
		
	}
}