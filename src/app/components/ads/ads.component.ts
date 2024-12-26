import { Component, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdFormDialogComponent } from '../ad-form-dialog/ad-form-dialog.component';
import { Ad } from 'src/app/models/ad.model';
import { AdsStateService } from 'src/app/services/ads-state.service';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss'],
})
export class AdsComponent implements OnInit {

  constructor(public dialog: MatDialog, public readonly adService: AdsStateService) { }

  ngOnInit(): void {
    this.adService.fetchAds();
  }

  openAdDialog(): void {
    const dialogRef = this.dialog.open(AdFormDialogComponent, {
      width: '400px',
      data: null,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adService.createAd(result);
      }
    });
  }

  openEditDialog(ad: Ad): void {
    const dialogRef = this.dialog.open(AdFormDialogComponent, {
      width: '400px',
      data: { ...ad },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adService.updateAd(result.id, result);
      }
    });
  }
}