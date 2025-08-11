import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

interface Cari {
  gsm: string;
  telefon: string;
  faturaadres: string;
  adres: string;
  nacekodu: string;
  vergidaresi: string;
  vergino: string;
  tckimlik: string;
  ad: string;
  soyad: string;
  durum: 'aktif' | 'pasif';
  calisanSayisi: number;
  ticSicilNo: string;
  eposta: string;
  unvan: string; // Yeni özellik eklendi
  muhKod: string; // Yeni özellik eklendi
  type: 'gerçek' | 'tüzel'; // Yeni özellik eklendi
  cariAd: string; // Yeni özellik eklendi
}

@Component({
  selector: 'app-new-cari-modal',
  templateUrl: './new-cari-modal.component.html',
  styleUrls: ['./new-cari-modal.component.scss'],
})
export class NewCariModalComponent {
  newCari: Cari = {
    gsm: '',
    telefon: '',
    faturaadres: '',
    adres: '',
    nacekodu: '',
    vergidaresi: '',
    vergino: '',
    tckimlik: '',
    ad: '',
    soyad: '',
    durum: 'aktif',
    calisanSayisi: 0,
    ticSicilNo: '',
    eposta: '',
    unvan: '', // Yeni özellik başlatıldı
    muhKod: '', // Yeni özellik başlatıldı
    type: 'gerçek', // Yeni özellik başlatıldı
    cariAd: '', // Yeni özellik başlatıldı
  };

  constructor(private modalController: ModalController) {}

  closeModal() {
    this.modalController.dismiss();
  }

  saveCari() {
    this.modalController.dismiss(this.newCari);
  }
}
