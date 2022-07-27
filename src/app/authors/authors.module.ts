import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorsComponent } from './authors.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { AuthorsResolveGuard } from './authors-resolve.guard';

@NgModule({
  declarations: [
    AuthorsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatInputModule,
    RouterModule.forChild([{path: '', component: AuthorsComponent, resolve:{data: AuthorsResolveGuard}}]),
  ],
  providers: [
    AuthorsResolveGuard
  ]
})
export class AuthorsModule { }
