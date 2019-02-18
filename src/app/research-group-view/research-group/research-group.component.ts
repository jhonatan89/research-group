import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ResearchGroupModel } from './research-group.model';
import { ResearchGroupService } from './research-group.service';

@Component({
  selector: 'app-research-group',
  templateUrl: './research-group.component.html',
  styleUrls: ['./research-group.component.scss']
})
export class ResearchGroupComponent implements OnInit {
	

  showDetail: boolean = false;
	
  
  constructor(private researchGroupService : ResearchGroupService, private _router: Router) { 
  	this.setDetailListener();
  }

  ngOnInit() {
  }
  
  

  setDetailListener(){
    this._router.events
    .filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
         if(this._router.url.match('/\list$')){
          this.showDetail = false;
         }else{
           this.showDetail = true;
         }
      });
  }
  
  

}
