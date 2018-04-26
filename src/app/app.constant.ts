import { Injectable } from '@angular/core';

@Injectable()
export class AppConstant {
	public apiURL:string;

	constructor() {
		this.apiURL = 'https://ergast.com/api/f1';
	}
}