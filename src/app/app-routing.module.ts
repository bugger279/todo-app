import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { AppComponent } from "./app.component";
import { AuthGuard } from './_guards/auth.guard';
import { HomeComponent } from './home/home.component';
// import { RegistrationComponent } from "./registration/registration.component";


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: "auth/:from", component: LoginComponent },
  // { path: "", component: AppComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
