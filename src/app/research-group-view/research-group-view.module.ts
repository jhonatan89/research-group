import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ResearchGroupViewComponent } from './research-group-view.component';
import {  ResearchGroupComponent  } from './';
import { ResearchGroupListComponent, ResearchGroupDetailComponent, ResearchGroupService, LocatorResearchGroupService } from './research-group';

import { ResearchGroupFormComponent, ResearchGroupFormService }	from './'	


	


import { SharedModule } from '../shared/shared.module';

export const routes: Routes = [
  {path: '', redirectTo: 'researchgroup/list', pathMatch: 'full' },
  
  {path: 'researchgroup', component:ResearchGroupComponent, children:[
	  {path:'list', component:ResearchGroupListComponent},
	  {path:'edit/:id', component:ResearchGroupDetailComponent},
	  {path:'create', component:ResearchGroupDetailComponent}]
  },
  
  
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ], 
  declarations: [ResearchGroupViewComponent, ResearchGroupFormComponent,ResearchGroupComponent,ResearchGroupListComponent, ResearchGroupDetailComponent ],
  providers: [ ResearchGroupService, LocatorResearchGroupService ,ResearchGroupFormService,],
exports:[ ResearchGroupComponent, ResearchGroupListComponent, ResearchGroupDetailComponent ],})
export class ResearchGroupViewModule { }

