import { Component, Input } from '@angular/core';
import PromotionDTO from 'app/interfaces/promotion-DTO';
import { InitializerService } from 'app/services/initializer.service';

@Component({
  selector: 'app-type-a-promotion',
  templateUrl: './type-a-promotion.component.html',
  styleUrls: ['./type-a-promotion.component.css']
})
export class TypeAPromotionComponent {

  @Input() promotionOfTypeA: PromotionDTO =this.intializerService.createPromotionDTO;


  constructor(
    private intializerService: InitializerService
  ){}

}
