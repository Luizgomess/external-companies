import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes2: Routes = [
  { path: '', component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes2)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
