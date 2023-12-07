import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';

const appRouter: Routes = [
  {path: '', redirectTo: '/recipe', pathMatch: 'full'},
  {path: 'recipe', component: RecipesComponent, children: [
    {path: '', component: RecipeStartComponent}
  ]},
  {path: 'shopping-list', component: ShoppingListComponent}
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
