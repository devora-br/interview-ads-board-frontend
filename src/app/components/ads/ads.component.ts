import { Component, OnInit } from '@angular/core';
import { Ad } from 'src/app/models/ad.model';
import { AdsService } from 'src/app/services/ads.service';
import { AdFormDialogComponent } from '../ad-form-dialog/ad-form-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss'],
})
export class AdsComponent implements OnInit {

  ads: Ad[] = [];
  filteredAds: Ad[] = [];

  categories = ['Classes', 'Rent', 'Sale', 'Vehicles', 'Education'];

  searchText: string = '';
  selectedFilter: keyof Ad = 'location';

  isLoading: boolean = true;

  constructor(public dialog: MatDialog, private adService: AdsService) { }

  ngOnInit(): void {
    this.fetchAds();
  }

  fetchAds(): void {
    this.isLoading = true;
    this.adService.getAds().subscribe((data) => {
      this.ads = data;
      this.filteredAds = [...this.ads];
      this.isLoading = false;
    });
  }

  applyFilter() {
    if (!this.searchText.trim()) {
      this.filteredAds = [...this.ads];
      return;
    }

    this.filteredAds = this.ads.filter(ad => {
      const fieldValue = (ad[this.selectedFilter] as string)?.toLowerCase() || '';
      return fieldValue.includes(this.searchText.toLowerCase());
    });
  }

  openAdDialog() {
    const dialogRef = this.dialog.open(AdFormDialogComponent, {
      width: '400px',
      data: null,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.adService.createAd(result as Ad).subscribe(() => {
          this.fetchAds();
        });
      }
    });
  }

  openEditDialog(ad: Ad) {
    const dialogRef = this.dialog.open(AdFormDialogComponent, {
      width: '400px',
      data: { ...ad }, // Pass existing ad data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adService.updateAd(result.id, result).subscribe(() => {
          this.fetchAds();
        });
      }
    });
  }

  deleteAd(id: number): void {
    this.adService.deleteAd(id).subscribe(() => this.fetchAds());
  }
}
