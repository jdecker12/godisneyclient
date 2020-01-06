import { Component, NgZone, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { Card } from '../models/card';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
    selector: 'app-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

    navActive: boolean;
    cardData: Card[];

    private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px`);
    private iphoneMediaMatcher: MediaQueryList = matchMedia(`(only screen and(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio : 3)`);

    constructor(zone: NgZone, private data: DataService, private router: Router) {
        this.mediaMatcher.addListener(mql => 
            zone.run(() => this.mediaMatcher = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)));
        this.iphoneMediaMatcher.addListener(mql => 
            zone.run(() => this.iphoneMediaMatcher = matchMedia(`(only screen and(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio : 3)`)));
    }

    ngOnInit() {
        this.data.loadCards()
            .subscribe(success => {
                if (success) {
                    this.cardData = this.data.cards;
                    return true;
                }
                return false;          
            });
}
    events: string[] = [];
    opened: boolean;
    navTrue: boolean;

    isScreenSmall(): boolean {
       if(this.iphoneMediaMatcher.matches == true || this.mediaMatcher.matches == true) {
        this.navTrue = false;
        return true;
       }
       return false;
    }

    onAdmin(): void {
        this.data.loginRequired ? this.router.navigate(['login']) : this.router.navigate(['select-card']);
    }
}