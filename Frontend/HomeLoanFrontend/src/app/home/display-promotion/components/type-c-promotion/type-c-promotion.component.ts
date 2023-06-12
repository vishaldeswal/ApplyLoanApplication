import { Component, Input } from '@angular/core';
import PromotionDTO from 'app/interfaces/promotion-DTO';
import { InitializerService } from 'app/services/initializer.service';

@Component({
  selector: 'app-type-c-promotion',
  templateUrl: './type-c-promotion.component.html',
  styleUrls: ['./type-c-promotion.component.css']
})
export class TypeCPromotionComponent {
  @Input() promotionOfTypeC: PromotionDTO =this.intializerService.createPromotionDTO;


  constructor(
    private intializerService: InitializerService
  ){}
}
