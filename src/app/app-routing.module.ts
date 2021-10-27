import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { IsAdminGuard } from './shared/guards/isAdmin/is-admin.guard'
import { IsLoggedGuard } from './shared/guards/isLogged/is-logged.guard'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'donor',
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'donor',
    loadChildren: () => import('./donor/donor.module').then((m) => m.DonorModule),
  },
  {
    path: 'donation',
    loadChildren: () => import('./donation/donation.module').then((m) => m.DonationModule),
  },
  {
    path: 'admin',
    canLoad: [IsLoggedGuard, IsAdminGuard],
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: '**',
    loadChildren: () => import('./shared/shared.module').then((m) => m.SharedModule),
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
