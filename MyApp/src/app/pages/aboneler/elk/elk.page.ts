import { Component, OnInit } from '@angular/core';
import { AbonelerService, ElektrikAbone } from 'src/app/services/aboneler.service';

@Component({
  selector: 'app-elk',
  templateUrl: './elk.page.html',
  styleUrls: ['./elk.page.scss'],
})
export class ElkPage implements OnInit {
  aboneler: ElektrikAbone[] = [];
  isLoading = false;

  constructor(private abonelerService: AbonelerService) {}

  ngOnInit() {
    this.load();
  }

  load(ev?: any) {
    this.isLoading = true;
    this.abonelerService.getElektrikAboneleri().subscribe({
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
