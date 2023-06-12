import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UpdatePasswordService } from '../update-password/update-password.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  show: boolean = true;
  public emailId: string | null = "";
  constructor(private router: Router, private updatePasswordService: UpdatePasswordService) {

  }
  ngOnInit(): void {
    this.emailId = localStorage.getItem('emailId');
  }
  CheckRole(): number {
    if (localStorage.getItem("role") == "advisor") {
      return 0;
    }
    else {
      return 1;
    }
  }
  OnLogout(): void {
    localStorage.clear();
    this.router.navigateByUrl('');
  }

  OnUpdatePassword(): void {
    this.updatePasswordService.openCardDialog();
  }

  onAddPromotion():void{
    this.router.navigate(['Dashboard/AddPromotion'])
  }

  onEditCountryStateCity():void{
    this.router.navigate(['Dashboard/ListCountryStateCity'])
  }

}