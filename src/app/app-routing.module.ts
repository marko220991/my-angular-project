import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

const appRouter: Routes = [
  {path: '', redirectTo: '/recipe', pathMatch: 'full'},
  {path: 'recipe', loadChildren: () => import('./recipes/recipes.module').then(module => module.RecipesModule)}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRouter)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
