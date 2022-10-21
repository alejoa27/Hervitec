import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UiSwitchModule } from 'ngx-ui-switch';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from '@home/home.component';
import { ProductoModule } from '@producto/producto.module';


import { CoreModule } from '@core/core.module';
import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from './feature/login/login.component';
import { RegisterComponent } from './feature/register/register.component';
import { ViewProfileComponent } from './feature/view-profile/view-profile.component';
import { AgregarServicioComponent } from './feature/agregar-servicio/agregar-servicio.component';
import { RegisterservicioComponent } from './feature/registerservicio/registerservicio.component';
import { HttpService } from '@core/services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './feature/login/shared/service/login.service';
import { RegisterService } from './feature/register/shared/service/register.service';
import { SendRecoveryService } from './feature/sendrecovery/shared/service/sendrecovery.service';
import { NewPasswordService } from './feature/recoverypassword/shared/service/recoverypassword.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SendrecoveryComponent } from './feature/sendrecovery/sendrecovery.component';
import { RecoverypasswordComponent } from './feature/recoverypassword/recoverypassword.component';
import { LandingComponent } from './feature/landing/landing.component';
import { ViewservicioComponent } from './feature/viewservicio/viewservicio.component';
import { GestorserviciosComponent } from './feature/gestorservicios/gestorservicios.component';
import { AddServiceService } from './feature/agregar-servicio/shared/service/add-service.service';
import { AuthGuardService } from './feature/auth/auth-guard.service';
import { AuthService } from './feature/auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NavbarService } from '@core/components/navbar/service/navbar.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoriaComponent } from './feature/categoria/categoria.component';
import { CategoriaServiceService } from './feature/categoria/shared/service/categoria-service.service';
import { ContactServiceService } from '@core/components/contact/shared/contact-service.service';
import { ServiceFilterComponent } from './feature/service-filter/service-filter.component';
import { ServiceFilterServiceService } from './feature/service-filter/shared/service/service-filter-service.service';
import { ChatComponent } from './feature/chat/chat.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ViewservicioService } from './feature/viewservicio/shared/service/viewservicio.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire'
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ViewProfileComponent,
    AgregarServicioComponent,
    RegisterservicioComponent,
    SendrecoveryComponent,
    RecoverypasswordComponent,
    LandingComponent,
    ViewservicioComponent,
    GestorserviciosComponent,
    CategoriaComponent,
    ServiceFilterComponent,
    ChatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductoModule,
    CoreModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    UiSwitchModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [AngularFirestore,
    CookieService, HttpService,
    LoginService, RegisterService, SendRecoveryService,
    NewPasswordService, AddServiceService,
    ViewservicioService, AuthGuardService,
    AuthService, JwtHelperService, NavbarService,
    CategoriaServiceService, ContactServiceService,
    ServiceFilterServiceService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
