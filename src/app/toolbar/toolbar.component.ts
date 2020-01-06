import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectorRef  } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

 
    update: string = 'login';


    @Output() toggleSidenav = new EventEmitter<void>();
    @Output() goToAdmin = new EventEmitter<void>();

    @Input() navTrue: boolean;

    get _loggedIn() { return this.data.loginRequired };

    constructor(private data: DataService, private router: Router, private cd: ChangeDetectorRef) {
      
    }

    onAdmin(): void {
        this.data.loginRequired == true ? this.router.navigate(['login']) : this.router.navigate(['select-card']);
    }

    buttonText(): void {
        this.data.loginRequired == true ? this.update = 'login' : this.update = 'Create Content'; 
    }

    ngOnInit() {
    
    }

}
