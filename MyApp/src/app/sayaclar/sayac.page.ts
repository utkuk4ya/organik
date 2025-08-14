// src/app/sayaclar/sayac.page.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SayacService, Sayac } from '../services/sayac.service';

type MeterType = 'elk' | 'su' | 'gaz';

@Component({
  selector: 'app-sayac',
  templateUrl: './sayac.page.html',
  styleUrls: ['./sayac.page.scss'],
})
export class SayacPage implements OnInit, OnDestroy {
  isLoading = false;
  sayaclar: Sayac[] = [];
  sub?: Subscription;

  // 🔹 Seçilen tip state’i
  //selectedType: MeterType = 'elk';

  constructor(private sayacService: SayacService) {}

  ngOnInit(): void {
    this.loadData(); // varsayılan 'elk'
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  // 🔹 Tip parametresini opsiyonel yaptık; verilmezse selectedType kullanılır
  loadData(type?: MeterType): void {
    if (type) this.selectedType = type;

    this.isLoading = true;
    this.sub = this.sayacService.getMeters(this.selectedType).subscribe({
      next: (list: Sayac[]) => {
        this.sayaclar = list;
        this.isLoading = false;
      },
      error: (err: unknown) => {
        console.error('Sayaç listesi alınamadı:', err);
        this.sayaclar = [];
        this.isLoading = false;
      }
    });
  }

  // 🔹 Refresh aynı tipi korur
  /*doRefresh(event: any): void {
    this.loadData(); // tip göndermiyoruz → selectedType korunur
    setTimeout(() => event.target.complete(), 400);
  }

  // 🔹 UI event’i: tip değiştiğinde çağır
  onTypeChange(type: MeterType) {
    this.loadData(type);
  }*/
  selectedType: MeterType = 'elk';

  onTypeChange(ev: any) {
    const v = (ev?.detail?.value ?? 'elk') as MeterType;
    this.loadData(v);
  }

  doRefresh(event: any) {
    this.loadData(); // selectedType korunur
    setTimeout(() => event.target.complete(), 400);
  }
  
}