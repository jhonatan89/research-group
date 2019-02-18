import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ResearchGroupModel } from './research-group.model';
import { LocatorResearchGroupService } from './research-group-locator.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class ResearchGroupService {

  private headers: HttpHeaders;
  private isEditDetailChanges = new BehaviorSubject<boolean>(false);
  currentDetailState = this.isEditDetailChanges.asObservable();
  private detailState: boolean = false;
  
  constructor(private http: HttpClient, private urlService: LocatorResearchGroupService) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json, text/plain'});
  }
  
  save(researchGroup: ResearchGroupModel){
    return researchGroup.id ? this.update(researchGroup) : this.create(researchGroup);
  }


  private create(researchgroup:ResearchGroupModel){
    let body = JSON.stringify(researchgroup);
    return this.http.post(this.urlService.getUrlCreate(), body, { headers: this.headers})
      .catch(this.handleError);
  }
	
  private update(researchgroup:ResearchGroupModel){
    let body = JSON.stringify(researchgroup); 
    return this.http.put(this.urlService.getUrlUpdate(), body, { headers: this.headers})
    .catch(this.handleError);
  }
  
  search(start: number, limit: number, searchParams?: string){
    let qParams;
    if(searchParams){
      qParams = searchParams;
      qParams.start = start;
      qParams.limit = limit;
    }else{
      qParams = {"start":start, "limit": limit};
    }
    return this.http.get(this.urlService.getUrlList(),{params : qParams})
    .catch(this.handleError)  
  }
  

  getById(id: number){
    return this.http.get(this.urlService.getUrlGetItem() + '/' + id)
    .catch(this.handleError)
  }



  getNumTotal(searchParams? : any){
     return this.http.get(this.urlService.getUrlListNum(),searchParams? searchParams:{})
     .catch(this.handleError)
  }

  

  deleteById(id: number){
    return this.http.delete(this.urlService.getUrlDeleteItem() + '/' + id, { headers: this.headers})
    .catch(this.handleError)
  }
  
    getResearchGByCode(){
    return this.http.get(this.urlService.getResearchGByCode())
    .catch(this.handleError)
  }
    
    
  
  private handleError(error: any){ 
    return Observable.throw(error.error || 'Server error');
  }
  
  publishDetailState(detailState: boolean){
    this.detailState = detailState;
    this.isEditDetailChanges.next(this.detailState);
  }


}
