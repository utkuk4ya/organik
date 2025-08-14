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
  isFaturaExpanded: boolean = false;
  isDashboardExpanded: boolean = true;
  isAbonelerExpanded: boolean = false;  // Toggle için eklenen özellik

  totalCustomers: number = 22;
  totalSubscriptions: number = 0;
  activeSubscriptions: number = 0;
  passiveSubscriptions: number = 0;

  chartData: { name: string; value: number }[] = [];
  chartWidth: number = 320;
  chartHeight: number = 250;
  colorScheme = { domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'] };

  isDashboardClosed: boolean = false;  // Proper type

  menuItems = [
    {
      type: 'elk',
      icon: 'flash-outline',
      label: 'Elektrik',
      expanded: false,
      children: [
        { label: 'Aboneler ve Cariler', icon: 'people-outline', link: '/aboneler/elk' },
        { label: 'Sayaçlar', icon: 'speedometer-outline', link: '../sayaclar' },
        {
          label: 'Fatura',
          icon: 'document-outline',
          expanded: false,
          children: [
            { label: 'Dönemler', icon: 'calendar-outline' },
            { label: 'Ücretler', icon: 'cash-outline' },
            { label: 'Fatura İşlemleri', icon: 'list-outline' }
          ]
        }
      ]
    },
    {
      type: 'su',
      icon: 'water-outline',
      label: 'Su',
      expanded: false,
      children: [
        { label: 'Aboneler ve Cariler', icon: 'people-outline', link: '/aboneler/su' },
        { label: 'Sayaçlar', icon: 'speedometer-outline', link: '/sayaclar' },
        {
          label: 'Fatura',
          icon: 'document-outline',
          expanded: false,
          children: [
            { label: 'Dönemler', icon: 'calendar-outline' },
            { label: 'Ücretler', icon: 'cash-outline' },
            { label: 'Fatura İşlemleri', icon: 'list-outline' }
          ]
        },
        { label: 'İş Makinesi Kullanım İşleri', icon: 'construct-outline' }
      ]
    },
    {
      type: 'gaz',
      icon: 'flame-outline',
      label: 'Gaz',
      expanded: false,
      children: [
        { label: 'Aboneler ve Cariler', icon: 'people-outline', link: '/aboneler/gaz' },
        { label: 'Sayaçlar', icon: 'speedometer-outline', link: '/sayaclar' },
        {
          label: 'Fatura',
          icon: 'document-outline',
          expanded: false,
          children: [
            { label: 'Dönemler', icon: 'calendar-outline' },
            { label: 'Ücretler', icon: 'cash-outline' },
            { label: 'Fatura İşlemleri', icon: 'list-outline' }
          ]
        }
      ]
    }
  ];

  toggleItem(item: any) {
    item.expanded = !item.expanded;
  }

  toggleChild(item: any, child: any) {
    child.expanded = !child.expanded;
  }

  constructor(private router: Router, private alertController: AlertController) { }

  ngOnInit() {
    this.updateChartData();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToDashboard() {
    this.router.navigate(["/dash"]);
  }

  toggleGeneral() {
    this.isGeneralExpanded = !this.isGeneralExpanded;
  }

  toggleFatura() {
    this.isFaturaExpanded = !this.isFaturaExpanded;
  }

  /*toggleDashboard() {
    this.isDashboardExpanded = !this.isDashboardExpanded;  // Toggle state değişimi
  }*/
  toggleDashboard() { this.isDashboardClosed = !this.isDashboardClosed; }

  toggleAboneler() {
    this.isAbonelerExpanded = !this.isAbonelerExpanded;
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
