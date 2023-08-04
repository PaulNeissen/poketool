import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { TableTypeComponent } from './table-type/table-type.component';
import { CalendarComponent } from './calendar/calendar.component';
import { SearchFusionComponent } from './search-fusion/search-fusion.component';

const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search', component: SearchComponent },
  { path: 'type-table', component: TableTypeComponent },
  { path: 'search-fusion', component: SearchFusionComponent },
  { path: 'calendar', component: CalendarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
