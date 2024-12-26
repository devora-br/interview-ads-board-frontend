// File: ads-state.service.ts
import { Injectable, computed, signal } from '@angular/core';
import { Ad } from '../models/ad.model';
import { AdsApiService } from './ads-api.service';


@Injectable({ providedIn: 'root' })
export class AdsStateService {
  private readonly allAds = signal<Ad[]>([]);
  readonly isLoading = signal<boolean>(true);

  searchText = signal<string>('');
  selectedFilter = signal<keyof Ad>('location');

  filteredAds = computed(() => {
    const ads = this.allAds();
    const searchText = this.searchText().toLowerCase().trim();
    const selectedFilter = this.selectedFilter();

    if (!searchText) return ads;

    return ads.filter(ad => {
      const fieldValue = (ad[selectedFilter] as string)?.toLowerCase() || '';
      return fieldValue.includes(searchText);
    });
  });

  constructor(private readonly adsApiService: AdsApiService) { }

  get ads() {
    return this.allAds.asReadonly();
  }

  fetchAds(): void {
    this.isLoading.set(true);
    this.adsApiService.getAds().subscribe({
      next: ads => {
        this.allAds.set(ads);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }

  createAd(ad: Ad): void {
    this.adsApiService.createAd(ad).subscribe(() => this.fetchAds());
  }

  updateAd(id: number, ad: Ad): void {
    this.adsApiService.updateAd(id, ad).subscribe(() => this.fetchAds());
  }

  deleteAd(id: number): void {
    this.adsApiService.deleteAd(id).subscribe(() => this.fetchAds());
  }
}
