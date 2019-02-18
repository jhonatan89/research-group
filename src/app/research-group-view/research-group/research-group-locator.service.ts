import { Injectable }    from '@angular/core';
import { ServiceMainLocator } from '../../service-locator-main';
import {CREATERESEARCHGROUP,
	UPDATERESEARCHGROUP,
	GETRESEARCHGROUP,
	SEARCHRESEARCHGROUP,
	TOTALNUMRESEARCHGROUP,
	DELETERESEARCHGROUP,
	BASE_URL,	GETRESEARCHGBYCODE } from './url-constants'



@Injectable()
export class LocatorResearchGroupService {
	
	constructor(private serviceLocator: ServiceMainLocator){}
	

    getUrlList(): string{
        return this.buildURL(this.getHost(),BASE_URL,SEARCHRESEARCHGROUP);
    }
        
    getUrlCreate(): string{
        return this.buildURL(this.getHost(),BASE_URL, CREATERESEARCHGROUP);
    }
    
    getUrlUpdate(): string{
        return this.buildURL(this.getHost(), BASE_URL, UPDATERESEARCHGROUP);
    }
    
    getUrlGetItem(): string{
        return this.buildURL(this.getHost(), BASE_URL, GETRESEARCHGROUP);
    }
    
    getUrlListNum(): string{
        return this.buildURL(this.getHost(), BASE_URL, TOTALNUMRESEARCHGROUP);
    }
    
    getUrlDeleteItem(): string{
        return this.buildURL(this.getHost(), BASE_URL, DELETERESEARCHGROUP);
    }
    
    
    getResearchGByCode(): string{
    	return this.buildURL(this.getHost(), BASE_URL, GETRESEARCHGBYCODE);
    }
    
    
    
    public getHost(): string{
	        let host = this.serviceLocator.getHost();
	        return host;
	}
	
	private buildURL(...urlElements): string{
        return urlElements.reduce(function (accumulator, currentValue){
            return accumulator + '/' + currentValue ;
        });
    }
       



}