import { Component, NgZone, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
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
    private iphoneMediaMatcher: MediaQueryList = matchMedia(`(min-device-width : 375px) 
    and (max-device-width : 667px)`);
        

    constructor(private zone: NgZone, private breakpointObserver: BreakpointObserver, private data: DataService, private router: Router) {
        this.mediaMatcher.addListener(mql => 
            zone.run(() => this.mediaMatcher = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)));

        this.iphoneMediaMatcher.addListener(mql => 
            zone.run(() => this.iphoneMediaMatcher = matchMedia(`(min-device-width : 375px) 
            and (max-device-width : 667px)`)));
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
        //console.log(this.mediaMatcher.matches);
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