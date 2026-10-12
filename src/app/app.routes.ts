import { Routes } from '@angular/router';
import { AppShellComponent } from './shared/presentation/components/app-shell.component';

const baseTitle = 'UrbanFit Sports Center Management Platform';
const home = () => import('./sports-centers/presentation/views/home-page.component')
  .then((module) => module.HomePageComponent);
const newReservation = () => import('./sports-centers/presentation/views/new-reservation-page.component')
  .then((module) => module.NewReservationPageComponent);
const pageNotFound = () => import('./shared/presentation/views/page-not-found-page.component')
  .then((module) => module.PageNotFoundPageComponent);

export const routes: Routes = [
  {
    path: '',
    component: AppShellComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      {
        path: 'home',
        loadComponent: home,
        title: `${baseTitle} - Home`,
      },
      {
        path: 'reservations',
        children: [
          {
            path: 'new',
            loadComponent: newReservation,
            title: `${baseTitle} - New Reservation`,
          },
        ],
      },
      {
        path: '**',
        loadComponent: pageNotFound,
        title: `${baseTitle} - Page not found`,
      },
    ],
  },
];
