import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginPageGuard } from './auth/login-page.guard';

const routes: Routes = [
  {path: '', redirectTo:'dashboard', pathMatch:'full'},
  {path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardModule), canLoad:[AuthGuard]},
  {path: 'books', loadChildren: () => import('./books-list/books-list.module').then( m => m.BooksListModule), canLoad:[AuthGuard]},
  {path: 'authors', loadChildren: () => import('./authors/authors.module').then(m => m.AuthorsModule), canLoad:[AuthGuard]},
  {path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), canActivate:[LoginPageGuard]}
  //{path: '**'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
