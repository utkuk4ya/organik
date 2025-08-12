import { Component, OnInit } from '@angular/core';
import { AbonelerService } from './aboneler.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
    selector: 'app-aboneler',
    templateUrl: './aboneler.page.html',
    styleUrls: ['./aboneler.page.scss'],
})
export class AbonelerPage implements OnInit {

    type: string = '';
    subscribers: any[] = [];

    constructor(private abonelerService: AbonelerService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.type = this.route.snapshot.paramMap.get('type') || '';
        this.loadSubscribers(this.type);
    }

    loadSubscribers(type: string) {
        this.abonelerService.getSubscribers(type).subscribe(data => {
            this.subscribers = data;
        });
    }

    typeLabels: any = {
        elk: 'Elektrik',
        su: 'Su',
        gaz: 'Gaz'
    };

    getTypeLabel(): string {
        return this.typeLabels[this.type] || this.type;
    }


    goBack() {
        this.router.navigate(['/dash']);
    }
}
