import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSortModule } from '@angular/material/sort';
import { LayoutComponent } from './layout/layout.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MenuComponent } from './menu/menu.component';
import { TableTypeComponent } from './table-type/table-type.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SideBarPokemonComponent } from './side-bar-pokemon/side-bar-pokemon.component';
import { ResistanceComponent } from './resistance/resistance.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { MatButtonModule } from '@angular/material/button';
import { TeamBuilderComponent } from './team-builder/team-builder.component';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { SideBarTeamComponent } from './side-bar-team/side-bar-team.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CalendarComponent } from './calendar/calendar.component';
import { SideBarFusionComponent } from './side-bar-fusion/side-bar-fusion.component';
import { SearchFusionComponent } from './search-fusion/search-fusion.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    LayoutComponent,
    MenuComponent,
    TableTypeComponent,
    SideBarPokemonComponent,
    ResistanceComponent,
    CalendarComponent,
    ComingSoonComponent,
    TeamBuilderComponent,
    SideBarTeamComponent,
    SideBarFusionComponent,
    SearchFusionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatSortModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatOptionModule,
    MatSelectModule,
    MatTooltipModule,
    MatCheckboxModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
