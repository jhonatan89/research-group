

import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
import { Component, OnInit, ElementRef, Renderer} from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  
  constructor(private el: ElementRef, private renderer: Renderer,private utilTranslate: TranslateService, private _router: Router) { 
  _router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        let fgh = this._router.url;
        switch (fgh) {
          case '/research-group-view':
            this.resetActive();
            this.researchGroupViewisActive = true;
            break;
        }
      });
  }

  	isCollapsed = true;

	researchGroupViewisActive = false;
	researchGroupViewisVisible = false;

  //============Events===============
  
  onResearchGroupViewClick() {
    this._router.navigate(['research-group-view']);
  }
  onCollapseButtonClick() {
    this.isCollapsed = !this.isCollapsed;
  }

  resetActive() {
	this.researchGroupViewisActive = false;

  }
  
  ngOnInit() {

  }
}
