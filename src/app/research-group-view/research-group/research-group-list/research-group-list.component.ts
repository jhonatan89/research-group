import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { NgxCrudMocksService, CrudService } from 'ngx-crud-mocks';
import swal from 'sweetalert2'
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import {zip} from "rxjs/observable/zip";
import { ResearchGroupModel } from '../research-group.model';
import { ResearchGroupService } from '../research-group.service';
import { researchGroupMockFormat } from '../../../../assets/mocks-helpers/researchGroupMockFormat';
import { ResearchGroupFormService }	from '../research-group-form'



@Component({
  selector: 'app-researchgroup-crud-list',
  templateUrl: './research-group-list-gallery.component.html',
  styleUrls: ['./research-group-list.component.scss'],
providers:[{provide: CrudService, useClass: NgxCrudMocksService}]  
})
export class ResearchGroupListComponent implements OnInit, OnChanges {
  
  private researchgroups:any;
  private start: number = 0;
  private totalRecords: number;
  private page: number = 1;
  private pageSize: number = 8;
  private isFetchFinish: boolean = false;
  private urlParams: any;
  private searchParams: any = {};

  @Input() isOnlyRead: boolean = false;
  @Input() filtersFetch: any;
  @Input() researchgroupInputItems : ResearchGroupModel[];
  @Output() researchgroupOutputItems: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteItem: EventEmitter<any> = new EventEmitter<any>(); 
  
  
  
  constructor(private researchGroupService : CrudService, 
	  private translate: TranslateService,
	  private route: ActivatedRoute,
	  private router: Router,      private filterService:ResearchGroupFormService 
	  ){ 
this.researchGroupService.setConfigMock(researchGroupMockFormat,'researchGroups');	  }
	
  ngOnInit() {
 
	this.sidebarToggle();
    this.filterService.currentFilterData.subscribe( searchParams => {
        this.searchParams = searchParams;
        this.resetPage();
        this.renderItems();
      });    
    this.route.queryParamMap.subscribe(paramsMap => {
      	this.urlParams = paramsMap;
        this.page = this.urlParams.params.page ? Number(this.urlParams.params.page) : 1;
        this.start = this.page * this.pageSize - this.pageSize;
        this.renderItems();
    });    
  }
  ngOnChanges(){
    if(this.researchgroupInputItems){
      this.researchgroups = this.researchgroupInputItems;
      this.isOnlyRead = true;
    }else {
      this.renderItems();
    }
  }


  getResearchGroups(start: number, pageSize: number, searchParams?: any){
    this.isFetchFinish = false;
    this.researchGroupService.search(start, pageSize,searchParams).subscribe(data => { 
      this.researchgroups = data; 
      this.researchgroupOutputItems.emit(this.researchgroups);
      this.isFetchFinish = true;
    },
    error => {
      console.error(error);
      this.isFetchFinish = true;
    })
  }
  
  deleteResearchGroup(id: number){
    this.researchGroupService.deleteById(id).subscribe(result => { 
    this.translate.get('successDelete').subscribe((res: string) => { swal('Ok!',res,'success') });
    this.deleteItem.emit(id);
    this.renderItems();         
    },
     error => {
       console.error(error);
       this.translate.get('errorDelete').subscribe((res: string) => { swal('Error!',res,'error') });   
     });
  }
  

  getResearchGroupNum(searchParams?: any){
    this.researchGroupService.getNumTotal(searchParams).subscribe(num => this.totalRecords = num, error => console.log(error));
  }
  
  
  private pageChanged(obj: any){
    this.start = obj.page * obj.pageSize - obj.pageSize;
    this.page = obj.page;
    this.pageSize = obj.pageSize;
    this.router.navigate([], { queryParams: { page: this.page}});
  }
  
  
  
  private renderItems(){
  	this.getResearchGroups(this.start, this.pageSize, this.searchParams);
    this.getResearchGroupNum(this.searchParams);
  }
  
  private resetPage(){
  	this.page = 1;
  }
  

  goToEdit(item: any){
    this.router.navigate(['../edit', item.id], { relativeTo: this.route });    
  }
  
  confirmDelete(id: number){
    let titleObs = this.translate.get('areYouSure');
    let textObs = this.translate.get('noRevert');
    let confirmButtonTextObs = this.translate.get('yesDelete');

    zip(titleObs, textObs, confirmButtonTextObs).subscribe( ([title, text, confText]) => {
      swal({
        title: title,
        text: text,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#868e96',
        confirmButtonText: confText
      }).then((result) => {
        if (result.value) {
          this.deleteResearchGroup(id);
        }
      })
    });
    
  }
  
  
   sidebarToggle(){
    document.getElementsByClassName('collapser-filter-container')[0].classList.toggle('collapsed');
    document.getElementsByClassName('collapser-container-grid')[0].classList.toggle('collapsed');
  }





}

