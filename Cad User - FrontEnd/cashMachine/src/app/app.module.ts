import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { UserFormComponent, BottomSheetOverviewBalance } from './users/user-form/user-form.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Interceptor } from './commons/Interceptor';
import { BalanceComponent, DialogOverview } from './balance/balance.component';

@NgModule({
  declarations: [
    AppComponent,
    UserFormComponent,
    UserListComponent,
    LoginComponent,
    BottomSheetOverviewBalance,
    BalanceComponent,
    DialogOverview
  ],
  entryComponents:[
    BottomSheetOverviewBalance,
    BalanceComponent,
    DialogOverview
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    MatBottomSheetModule,
    MatMenuModule,
    MatTooltipModule,
    MatListModule,
    MatDialogModule,
    Interceptor

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
