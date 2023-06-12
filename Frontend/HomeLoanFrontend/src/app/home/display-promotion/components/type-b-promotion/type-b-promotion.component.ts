import { Component, Input } from '@angular/core';
import PromotionDTO from 'app/interfaces/promotion-DTO';
import { InitializerService } from 'app/services/initializer.service';

@Component({
  selector: 'app-type-b-promotion',
  templateUrl: './type-b-promotion.component.html',
  styleUrls: ['./type-b-promotion.component.css']
})
export class TypeBPromotionComponent {
  @Input() promotionOfTypeB: PromotionDTO =this.intializerService.createPromotionDTO;


  constructor(
    private intializerService: InitializerService
  ){}
}
