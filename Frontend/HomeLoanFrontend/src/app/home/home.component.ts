import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import PromotionDTO from 'app/interfaces/promotion-DTO';
import { InitializerService } from 'app/services/initializer.service';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public promotionTypeA: PromotionDTO = this.intializerService.createPromotionDTO;
  public promotionTypeB : PromotionDTO= this.intializerService.createPromotionDTO;
  public promotionTypeC : PromotionDTO= this.intializerService.createPromotionDTO;

  public activePromotion='';

  constructor(
    private router: Router,
    private homeService: HomeService,
    private intializerService: InitializerService
  ) { 
    this.homeService.Fetchpromotion().subscribe({
      next: (response) => {
        console.log(response);
        if (response.type === 'A') {
          this.promotionTypeA.message = response.message;
          this.activePromotion=this.promotionTypeA.type = response.type;
          this.promotionTypeA.startDate = response.startDate;
          this.promotionTypeA.endDate = response.endDate;
        }
        else if (response.type === 'B') {
          this.promotionTypeB.message = response.message;
          this.activePromotion=this.promotionTypeB.type = response.type;
          this.promotionTypeB.startDate = response.startDate;
          this.promotionTypeB.endDate = response.endDate;
        }
        else {
          this.promotionTypeC.message = response.message;
          this.activePromotion=this.promotionTypeC.type = response.type;
          this.promotionTypeC.startDate = response.startDate;
          this.promotionTypeC.endDate = response.endDate;
        }
      },
      error: (err) => {
        console.log("No Active Promotion" + err);
      }
    });

  }

  ngOnInit(): void {
    

    if (localStorage.getItem('authToken') != undefined) {
      this.router.navigateByUrl('Dashboard');
    }
  }

  public OnAdvisorLoginClick(): void {
    localStorage.setItem('role', 'advisor');
    this.router.navigateByUrl('Login');
  }
  public OnUserLoginClick(): void {
    localStorage.setItem('role', 'user');
    this.router.navigateByUrl('Login');
  }
  public OnRegisterUserClick(): void {
    this.router.navigateByUrl('Register');
  }

}

