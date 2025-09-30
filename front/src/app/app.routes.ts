import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'accueil',
    pathMatch: 'full',
  },
  {
    path: 'accueil',
    loadComponent: () => import('./pages/accueil/accueil.page').then( m => m.AccueilPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'user-selection',
    loadComponent: () => import('./pages/user-selection/user-selection.page').then( m => m.UserSelectionPage)
  },
  {
    path: 'info',
    loadComponent: () => import('./pages/candidat/info/info.page').then( m => m.InfoPage)
  },
  {
    path: 'parcours',
    loadComponent: () => import('./pages/candidat/parcours/parcours.page').then( m => m.ParcoursPage)
  },
];
