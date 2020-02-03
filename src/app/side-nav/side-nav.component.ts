import { Component, NgZone, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { Card } from '../models/card';
import { ViewportScroller } from '@angular/common';

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
    private iphone8MediaMatcher: MediaQueryList = matchMedia(`(min-device-width : 375px) 
    and (max-device-width : 667px)`);
    private iphoneXMediaMatcher: MediaQueryList = matchMedia(`and (device-width : 375px) 
    and (device-height : 812px) 
    and (-webkit-device-pixel-ratio : 3)`);
        

    constructor(private zone: NgZone, private breakpointObserver: BreakpointObserver, private data: DataService, private router: Router, private viewportScroller: ViewportScroller) {
        this.mediaMatcher.addListener(mql => 
            zone.run(() => this.mediaMatcher = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)));

        this.iphoneMediaMatcher.addListener(mql => 
            zone.run(() => this.iphoneMediaMatcher = matchMedia(`(min-device-width : 375px) 
            and (max-device-width : 667px)
            and (-webkit-device-pixel-ratio : 2)`)));

            this.iphone8MediaMatcher.addListener(mql => 
                zone.run(() => this.iphoneMediaMatcher = matchMedia(`(min-device-width : 414px) 
                and (max-device-width : 736px)
                and (-webkit-device-pixel-ratio : 3)`)));

                this.iphone8MediaMatcher.addListener(mql => 
                    zone.run(() => this.iphoneMediaMatcher = matchMedia(`(min-device-width : 375px) 
                    and (max-device-width : 812px)
                    and (-webkit-device-pixel-ratio : 3)`)));

            breakpointObserver.observe([
                Breakpoints.HandsetLandscape,
                Breakpoints.HandsetPortrait
              ]).subscribe(result => {
                if (result.matches) {
                 this.isScreenSmall() == true;
                }
              });
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
       if(this.iphoneMediaMatcher.matches == true || this.mediaMatcher.matches == true || this.iphone8MediaMatcher.matches == true || this.iphoneXMediaMatcher.matches == true) {
        this.navTrue = false;
        return true;
       }
       return false;
    }

    onAdmin(): void {
        this.data.loginRequired ? this.router.navigate(['login']) : this.router.navigate(['select-card']);
    }
}