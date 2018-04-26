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
 ** Lazy-load module enabled
 ** @return Array()
 ** -----------------------------------------------------------
*/
export const RouterList: Routes = [
	{ path: '', redirectTo: 'seasons', pathMatch: 'full' },
	{ path: 'seasons', loadChildren: 'app/pages/seasons/seasons.module#SeasonsModule' }
]