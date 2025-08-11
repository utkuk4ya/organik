import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import '@angular/compiler'
// Angular uygulamasını başlat
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err)); // Hataları konsola yazdır
