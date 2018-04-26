import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { AppConstant } from '../../app.constant';
import { forkJoin } from 'rxjs/observable/forkJoin';

export interface APIModel {
	seasons: any[],
	winners: any[],
	champions: any[],
	isFetching: boolean,
	isFetched: boolean
}

@Injectable()
export class CoreAPIService {

	public data:Observable<APIModel>;
	private $subject:BehaviorSubject<APIModel>;
	private store:APIModel;

	constructor(private http:HttpClient, private $constant:AppConstant) {
		this.store = {
			winners: [],
			seasons: [],
			champions: [],
			isFetching: false,
			isFetched: true
		}

		this.$subject = <BehaviorSubject<APIModel>>new BehaviorSubject({});
		this.data = this.$subject.asObservable();
	}

	public $dataStore(obj:any) {
		let newObj = (<any>Object).assign(this.store, obj);

		return {
			update: () => {
				this.$subject.next(newObj);

				return newObj;
			},
			getValue: (<any>Object).assign({}, this.store)
		}
	}

	public getSeasonChampion(startYear:number, endYear:number) {
		let requests = [];

		this.$dataStore({ isFetching: true, isFetched: false, champions: [] }).update();

		for(let i=startYear; i <= endYear; i++) {
			requests.push(
				this.http.get(`${this.$constant.apiURL}/${i}/driverStandings/1.json`)
			);
		}

		forkJoin(requests)
		.subscribe(
			(results:any) => {
				this.$dataStore({ isFetching: false, isFetched: true, champions: results }).update();
			},
			(error:HttpErrorResponse) => {
				this.$dataStore({ isFetching: false, isFetched: false, champions: [] }).update();
			}
		);

	}
}