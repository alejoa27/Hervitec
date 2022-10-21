import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityGuard } from '@core/guard/security.guard';
import { HomeComponent } from '@home/home.component';
import { AgregarServicioComponent } from './feature/agregar-servicio/agregar-servicio.component';
import { LoginComponent } from './feature/login/login.component';
import { RegisterComponent } from './feature/register/register.component';
import { ViewProfileComponent } from './feature/view-profile/view-profile.component';
import { SendrecoveryComponent } from './feature/sendrecovery/sendrecovery.component';
import { RecoverypasswordComponent } from './feature/recoverypassword/recoverypassword.component';
import { LandingComponent } from './feature/landing/landing.component';
import { ViewservicioComponent } from './feature/viewservicio/viewservicio.component';
import { GestorserviciosComponent } from './feature/gestorservicios/gestorservicios.component';
import { AuthGuardService } from './feature/auth/auth-guard.service';
import { TypeUserGuardService } from './feature/auth/type-user-guard.service';
import { CategoriaComponent } from './feature/categoria/categoria.component';
import { ServiceFilterComponent } from './feature/service-filter/service-filter.component';
import { ChatComponent } from './feature/chat/chat.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [SecurityGuard] },
  { path: 'producto', loadChildren: () => import('@producto/producto.module').then(mod => mod.ProductoModule) },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'viewprofile', component: ViewProfileComponent, canActivate: [AuthGuardService] },
  { path: 'agregarservicio', component: AgregarServicioComponent, canActivate: [TypeUserGuardService] },
  { path: 'sendrecovery', component: SendrecoveryComponent },
  { path: 'recoverypassword', component: RecoverypasswordComponent },
  { path: 'landing', component: LandingComponent },
  { path: 'viewservicio', component: ViewservicioComponent },
  { path: 'gestorservicios', component: GestorserviciosComponent, canActivate: [TypeUserGuardService] },
  { path: 'categoria', component: CategoriaComponent },
  { path: 'filter-service', component: ServiceFilterComponent },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuardService] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
