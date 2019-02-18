
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ResearchGroupFormService  } from './research-group-form.service';
import { ResearchGroupFilterModel } from './research-group-filter.model'




@Component({
  selector: 'research-group-form-search-filter',
  templateUrl: './research-group-form.component.html',
  styleUrls: ['./research-group-form.component.scss']
})
export class ResearchGroupFormComponent implements OnInit {

  private researchGroupFilterModel: ResearchGroupFilterModel = new ResearchGroupFilterModel();
  private formGroup: FormGroup;
  private genericSearchModel: any;
  @Output() onSubmitFilter: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _formBuilder: FormBuilder, private filterService: ResearchGroupFormService) { 
    this.formGroup = this._formBuilder.group({
		investigationLineCtrl: ['', Validators.compose([])], 		stateCtrl: ['', Validators.compose([])], 		categoryCtrl: ['', Validators.compose([])], 		nameCtrl: ['', Validators.compose([])], 		dependencyCtrl: ['', Validators.compose([])] 
    });
    
    
    
    
    
    
  }

  ngOnInit() {
  }


  saveModel(model: any){
      this.filterService.updateFilterData(model);
  }

  cleanFields(){
    this.formGroup.reset();
    this.researchGroupFilterModel = new ResearchGroupFilterModel();
  }




}
