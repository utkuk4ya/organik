import { Component, OnInit } from '@angular/core';
import { AbonelerService, Abone } from 'src/app/services/aboneler.service';


@Component({
  selector: 'app-su',
  templateUrl: './su.page.html',
  styleUrls: ['./su.page.scss'],
})
export class SuPage implements OnInit {
  aboneler: Abone[] = [];
  isLoading = false;
  constructor(private abonelerService: AbonelerService) { }

  ngOnInit() {
    this.load();
  }
  load(ev?: any) {
    this.isLoading = true;
    this.abonelerService.getSubscribers('su').subscribe({
      next: data => {
        this.aboneler = data;
        this.isLoading = false;
        ev?.target?.complete();
      },
      error: err => {
        console.error(err);
        this.isLoading = false;
        ev?.target?.complete();
      }
    });
  }

  doRefresh(ev: any) {
    this.load(ev);
  }
}
