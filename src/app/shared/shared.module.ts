import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from './components/layout/layout.module';
import { BaseComponent } from './components/helpers/base-component/base.component';

@NgModule({
  imports: [LayoutModule, FormsModule, CommonModule, ReactiveFormsModule],
  exports: [LayoutModule, FormsModule, CommonModule, ReactiveFormsModule],
  declarations: [BaseComponent],
  providers: [],
})
export class SharedModule {}
