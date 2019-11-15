import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { AppComponent } from "./app.component";
// import { RegistrationComponent } from "./registration/registration.component";


const routes: Routes = [
  { path: "login/:from", component: LoginComponent },
  { path: "", component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
