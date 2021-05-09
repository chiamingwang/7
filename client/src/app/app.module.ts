import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeListItemComponent } from './recipe-list-item/recipe-list-item.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';

const routes: Routes = [
	{path: '', redirectTo: '/recipe-list', pathMatch: 'full'},
	{path: 'recipe-list', component: RecipeListComponent},
	{path: 'recipe-detail/:id', component: RecipeDetailComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    RecipeListItemComponent,
    RecipeDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	HttpClientModule,
	RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
