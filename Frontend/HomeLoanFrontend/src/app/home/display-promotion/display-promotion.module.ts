import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisplayPromotionRoutingModule } from './display-promotion-routing.module';
import { TypeAPromotionComponent } from './components/type-a-promotion/type-a-promotion.component';
import { TypeBPromotionComponent } from './components/type-b-promotion/type-b-promotion.component';
import { TypeCPromotionComponent } from './components/type-c-promotion/type-c-promotion.component';


@NgModule({
  declarations: [
    TypeAPromotionComponent,
    TypeBPromotionComponent,
    TypeCPromotionComponent
  ],
  imports: [
    CommonModule,
    DisplayPromotionRoutingModule
  ],
  exports: [
    TypeAPromotionComponent,
    TypeBPromotionComponent,
    TypeCPromotionComponent
  ]
})
export class DisplayPromotionModule { }
