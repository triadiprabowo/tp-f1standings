import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { AppConstant } from '../../app.constant';
import { forkJoin } from 'rxjs/observable/forkJoin';

export interface APIModel {
	seasons: any[],
	winners: any,
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
			winners: null,
			seasons: [],
			champions: [],
			isFetching: false,
			isFetched: true
		}

		this.$subject = <BehaviorSubject<APIModel>>new BehaviorSubject({});
		this.data = this.$subject.asObservable();

		// init store data
		this.$subject.next(this.store);
	}

	/**
	 ** @description update subject data store
	 ** @method $dataStore
	 ** @param object reference to store interface
	 ** @return [object Object]
	 */
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

	/**
	 ** @description get season champions (driver) from selected season
	 ** @method getSeasonChampion
	 ** @param startYear (start season year), endYear (end season year)
	 ** @return void
	 */
	public getSeasonChampion(startYear:number, endYear:number): void {
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

	/**
	 ** @description get race results (driver) from selected season and position
	 ** @method getRaceResults
	 ** @param seasons (season year), position (driver position)
	 ** @return void
	 */
	public getRaceResults(seasons:number, position:number): void {
		this.$dataStore({ isFetching: false, isFetched: false, winners: null }).update();

		this.http.get(`${this.$constant.apiURL}/${seasons}/results/${position}.json`)
		.subscribe(
			(results:any) => {
				this.$dataStore({ isFetching: false, isFetched: true, winners: results.MRData }).update();
			},
			(err:HttpErrorResponse) => {
				this.$dataStore({ isFetching: false, isFetched: false, winners: null }).update();
			}
		);
	}
}