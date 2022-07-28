import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
//import { NgbModule} from '@ng-bootstrap/ng-bootstrap'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LibroComponent } from './components/libro/libro.component';
import { LibroformComponent } from './components/libroform/libroform.component';

import { HttpClientModule } from '@angular/common/http';
import { UsuarioFormsComponent } from './components/usuario-forms/usuario-forms.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { NotaVentaComponent } from './components/nota-venta/nota-venta.component';
import { ModalNotaVComponent } from './components/modal-nota-v/modal-nota-v.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReservasComponent } from './components/reservas/reservas.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LibroComponent,
    LibroformComponent,
    UsuarioFormsComponent,
    UserLoginComponent,
    UsuariosComponent,
    NotaVentaComponent,
    ModalNotaVComponent,
    ReservasComponent,
  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
 
})
export class AppModule { }
