import { NgModule } from '@angular/core';
import { NotaFiscalListComponent } from './notafiscal-list/notafiscal-list.component';
import { SharedModule } from '../../shared/shared.module';
import { GridModule } from '@progress/kendo-angular-grid';
import { NDDTitlebarModule } from '../../shared/ndd-ng-titlebar/component';
import { NDDTabsbarModule } from '../../shared/ndd-ng-tabsbar/component';
import { NotaFiscalRoutingModule } from './notafiscal-routing.module';
import { NotaFiscalGridService, NotaFiscalService } from './shared/notafiscal.service';

@NgModule({
    declarations: [NotaFiscalListComponent],
    imports: [ SharedModule, GridModule, NotaFiscalRoutingModule, NDDTitlebarModule, NDDTabsbarModule ],
    exports: [],
    providers: [NotaFiscalGridService, NotaFiscalService],
})
export class NotaFiscalModule {}