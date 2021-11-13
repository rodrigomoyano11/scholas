import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ProjectDetailsComponent } from './core/containers/project-details/project-details.component'
import { IsAdminGuard } from './core/guards/isAdmin/is-admin.guard'
import { IsLoggedGuard } from './core/guards/isLogged/is-logged.guard'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'donor',
  },
  { path: 'projects/read/:id', component: ProjectDetailsComponent },
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
    canLoad: [IsLoggedGuard],
    loadChildren: () => import('./donation/donation.module').then((m) => m.DonationModule),
  },
  {
    path: 'admin',
    canLoad: [IsLoggedGuard, IsAdminGuard],
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: '**',
    loadChildren: () => import('./core/core.module').then((m) => m.CoreModule),
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
