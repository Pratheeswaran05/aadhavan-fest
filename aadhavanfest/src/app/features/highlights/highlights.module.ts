import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighlightsRoutingModule } from './highlights-routing.module';
import { HighlightsComponent } from './highlights/highlights.component';


@NgModule({
  declarations: [
    HighlightsComponent
  ],
  imports: [
    CommonModule,
    HighlightsRoutingModule
  ]
})
export class HighlightsModule { }
