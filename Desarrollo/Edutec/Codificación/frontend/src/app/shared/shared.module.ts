import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummarizePipe } from './pipes/summarize.pipe';



@NgModule({
  declarations: [
    SummarizePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SummarizePipe
  ]
})
export class SharedModule { }
