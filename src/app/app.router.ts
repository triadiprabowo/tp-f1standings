/*
** ----------------------------------------------
** import required dependencies
** @return class
** ----------------------------------------------
*/
import { Routes } from '@angular/router';

/**
 ** -----------------------------------------------------------
 ** Export config of RouterList
 ** @return Array()
 ** -----------------------------------------------------------
*/
export const RouterList: Routes = [
	{ path: '', loadChildren: 'app/pages/index/index.module#IndexModule' }
]