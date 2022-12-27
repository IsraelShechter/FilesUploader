import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FilesListComponent } from './files-list/files-list.component';
import { FileComponent } from './file/file.component';
import {MatInputModule} from '@angular/material/input';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { NgBytesPipeModule } from './pipes/fileSize';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    FilesListComponent,
    FileComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: FilesListComponent, pathMatch: 'full' },
    ]),
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    NgBytesPipeModule


  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
