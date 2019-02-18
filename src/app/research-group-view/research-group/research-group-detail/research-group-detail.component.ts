
import { Component, OnInit, Input,  } from '@angular/core';
import { NgxCrudMocksService, CrudService } from 'ngx-crud-mocks';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { SearchComboBoxGenericModel } from 'ngx-academia-uniandes-library';
import { ResearchGroupModel } from '../research-group.model';
import { ResearchGroupService } from '../research-group.service';
import { ResearchGroupComponent } from '../research-group.component';
import { TranslateService } from '@ngx-translate/core';
import swal from 'sweetalert2'
import { researchGroupMockFormat } from '../../../../assets/mocks-helpers/researchGroupMockFormat';






@Component({
  selector: 'app-researchgroup-crud-detail',
  templateUrl: './research-group-detail.component.html',
  styleUrls: ['./research-group-detail.component.scss'],
providers:[{provide: CrudService, useClass: NgxCrudMocksService }]  
})
export class ResearchGroupDetailComponent implements OnInit {


  @Input() researchGroupFromParent:ResearchGroupModel;
  private formGroupStep1: FormGroup;
  
  private currentId: number;
  private researchGroup: ResearchGroupModel = new ResearchGroupModel();
  private isEditForm: boolean = false;  
  
  constructor(private _formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private researchGroupService: CrudService, private location: Location, private translate: TranslateService) {
	this.formGroupStep1 = this._formBuilder.group({
		nameCtrl: ['', Validators.compose([Validators.required])], 		externalIdCtrl: ['', Validators.compose([])], 		directorCtrl: ['', Validators.compose([])], 		colcienciasCodeCtrl: ['', Validators.compose([])], 		categortyCtrl: ['', Validators.compose([])], 		activeCtrl: ['', Validators.compose([])], 		webSiteCtrl: ['', Validators.compose([])]  
    });
 
    
		this.researchGroupService.setConfigMock(researchGroupMockFormat,'researchGroups');
  }
  

  ngOnChanges(){
    if(this.researchGroupFromParent){
      this.researchGroup = this.researchGroupFromParent;
      this.isEditForm = true;
    }
  }
  
  ngOnInit() {
    this.currentId = Number(this.route.snapshot.params['id']);
    if(this.currentId) { 
    	this.getResearchGroupById(this.currentId); 
    	this.isEditForm = true;
    }       
  }
  
  
  
  getResearchGroupById(id: number){
    this.researchGroupService.getById(id).subscribe(data => this.researchGroup = data), 
    error => {
      console.error(error);
    };
  }

  saveResearchGroup(researchGroup: ResearchGroupModel) {
    console.log(researchGroup);
    this.researchGroupService.save(researchGroup).subscribe(success => {
      console.info(success);
      this.translate.get('successSave').subscribe((res: string) => { swal('Ok!',res,'success') });   
    }, error => {
      console.error(error);
      this.translate.get('errorSave').subscribe((res: string) => { swal('Oups!',res,'error') });    
    }); 
  }
  
  goBack(){
    this.location.back();
  }


}