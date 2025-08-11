import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-dash',
  templateUrl: 'dash.page.html',
  styleUrls: ['dash.page.scss'],
})
export class DashPage implements OnInit {
  isGeneralExpanded: boolean = false;
  isFenIsleriExpanded: boolean = false;
  isFaturaExpanded: boolean = false;
  isDashboardExpanded: boolean = true;  // Toggle için eklenen özellik

  totalCustomers: number = 22;
  totalSubscriptions: number = 0;
  activeSubscriptions: number = 0;
  passiveSubscriptions: number = 0;

  chartData: { name: string; value: number }[] = [];
  chartWidth: number = 320;
  chartHeight: number = 250;
  colorScheme = { domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'] };

  isDashboardClosed: boolean = false;  // Proper type

  constructor(private router: Router, private alertController: AlertController) {}

  ngOnInit() {
    this.updateChartData();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToDashboard() {
    this.router.navigate(['/dash']);
  }

  toggleGeneral() {
    this.isGeneralExpanded = !this.isGeneralExpanded;
  }

  toggleFenIsleri() {
    this.isFenIsleriExpanded = !this.isFenIsleriExpanded;
  }

  toggleFatura() {
    this.isFaturaExpanded = !this.isFaturaExpanded;
  }

  toggleDashboard() {
    this.isDashboardExpanded = !this.isDashboardExpanded;  // Toggle state değişimi
  }

  async showLisanssizUretimAlert() {
    const alert = await this.alertController.create({
      header: 'Uyarı',
      message: 'Lisanssız Üretim Başvuru Modülü Lisansınızda bulunmuyor. Lütfen sistem yöneticiniz ile görüşün !!!',
      buttons: ['Tamam']
    });

    await alert.present();
  }

  private updateChartData() {
    this.chartData = [
      { name: 'Cari', value: this.totalCustomers },
      { name: 'Aktif Abone', value: this.activeSubscriptions },
      { name: 'Pasif Abone', value: this.passiveSubscriptions },
    ];
  }
}
