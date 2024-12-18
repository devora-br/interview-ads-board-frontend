import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ad } from '../models/ad.model';

@Injectable({ providedIn: 'root' })
export class AdsService {
  private apiUrl = 'https://localhost:5001/api/ads';

  constructor(private http: HttpClient) { }

  getAds(): Observable<Ad[]> {
    return this.http.get<Ad[]>(this.apiUrl);
  }

  createAd(ad: Ad): Observable<Ad> {
    return this.http.post<Ad>(this.apiUrl, ad);
  }

  updateAd(id: number, ad: Ad): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, ad);
  }

  deleteAd(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

