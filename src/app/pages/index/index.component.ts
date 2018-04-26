import { Component, OnInit } from '@angular/core';
import { CoreAPIService } from '../../shared/services/core-api.service';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.styl']
})
export class IndexComponent implements OnInit {

	public $vm:any;

	constructor(private api:CoreAPIService) { }

	ngOnInit() {
		this.api.data.subscribe(data => {
			this.$vm =  data;

			console.log(this.$vm)
		});

		/**
 		 ** @description get F1 world champion based on season year
 		 ** @method getSeasonChampion()
 		 ** @class CoreAPIService
 		 */
 		this.api.getSeasonChampion(2005,2015);
	}

}
