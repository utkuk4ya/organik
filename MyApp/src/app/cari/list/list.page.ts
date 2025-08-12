import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NewCariModalComponent } from '../new-cari-modal/new-cari-modal.component'; // Modal bileşenini import edin
import { Cari } from '../cari.model'; // Cari modelini import edin

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage {
  newCari: Cari = {
    cariAd: '',
    muhKod: '',
    unvan: '',
    eposta: '',
    vergiNo: '',
    tcKimlik: '',
    naceKodu: '',
    type: 'gerçek'
  };

  cariList: Cari[] = []; // Cari listesi
  router: any;

  constructor(private modalCtrl: ModalController) {}

  async openNewCariModal() {
    const modal = await this.modalCtrl.create({
      component: NewCariModalComponent
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.cariList.push(result.data);
      }
    });

    return await modal.present();
  }

  addCari() {
    this.openNewCariModal();
  }

  clearForm() {
    this.newCari = {
      cariAd: '',
      muhKod: '',
      unvan: '',
      eposta: '',
      vergiNo: '',
      tcKimlik: '',
      naceKodu: '',
      type: 'gerçek'
    };
  }

  refreshList() {
    // Listeyi yenileme işlemleri
    console.log('Liste yenilendi.');
  }

  downloadList() {
    // Listeyi indirme işlemleri
    console.log('Liste indirildi.');
  }

  goBack() {
    this.router.navigate(['dash']); // Replace '/dashboard' with the actual route of your Dashboard page
  }
}
