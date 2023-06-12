import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CollateralDTO } from 'app/interfaces/collateral-DTO';
import { CollateralService } from '../collateral.service';

@Component({
  selector: 'app-collateral-dialog',
  templateUrl: './collateral-dialog.component.html',
  styleUrls: ['./collateral-dialog.component.css'],
})
export class CollateralDialogComponent {
  data:CollateralDTO[]=[];
  serialNumber:number=0;
  displayedColumns: string[] = [ 'collateralType', 'collateralValue', 'collateralShare'];

  constructor(private collateralService: CollateralService,public dialogRef: MatDialogRef<CollateralDialogComponent>) {}
  ngOnInit() {
    this.collateralService
      .getCollateralList()
      .subscribe({ next: (response) => {
       this.data=response;
      }, 
      error: (err) => {
        console.warn(err);
      } });
  }
  onRowClick(row: CollateralDTO) {
    this.dialogRef.close(row);
  }
}
