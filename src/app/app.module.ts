import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule  } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ServiceMainLocator } from './service-locator-main';
import { SharedModule } from './shared/shared.module';
import { routes as researchgroupviewChildRoutes } from './research-group-view/research-group-view.module';import { ResearchGroupViewModule } from './research-group-view/research-group-view.module';
import { ResearchGroupViewComponent } from './research-group-view/research-group-view.component';




const routes: Routes = [
{path: '', redirectTo: 'research-group-view', pathMatch: 'full'},	{path: 'research-group-view', component:ResearchGroupViewComponent ,children: researchgroupviewChildRoutes 	}]


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    SharedModule,
    ResearchGroupViewModule   ],
  providers: [ServiceMainLocator, ],
  bootstrap: [AppComponent],
})
export class AppModule { }

