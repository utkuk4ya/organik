import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SayacService, Sayac } from '../services/sayac.service';

@Component({
  selector: 'app-sayac',
  templateUrl: './sayac.page.html',
  styleUrls: ['./sayac.page.scss'],
})
export class SayacPage implements OnInit, OnDestroy {
  isLoading = false;
  sayaclar: Sayac[] = [];
  sub?: Subscription;

  constructor(private sayacService: SayacService) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  loadData(overrides: Partial<any> = {}): void {
    this.isLoading = true;
    this.sub = this.sayacService.getElkSayac(overrides).subscribe({
      next: list => {
        this.sayaclar = list;
        this.isLoading = false;
      },
      error: err => {
        console.error('Sayaç listesi alınamadı:', err);
        this.sayaclar = [];
        this.isLoading = false;
      }
    });
  }

  doRefresh(event: any): void {
    this.loadData();
    setTimeout(() => event.target.complete(), 400);
  }
}