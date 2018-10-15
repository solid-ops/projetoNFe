import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { GridModule } from '@progress/kendo-angular-grid';
import { NDDTitlebarModule } from '../../shared/ndd-ng-titlebar/component';
import { NDDTabsbarModule } from '../../shared/ndd-ng-tabsbar/component';

import { NotaFiscalRoutingModule } from './notafiscal-routing.module';
import { NotaFiscalGridService, NotaFiscalService, NotaFiscalResolveService } from './shared/notafiscal.service';
import { NotaFiscalAddComponent } from './notafiscal-add/notafiscal-add.component';
import { NotaFiscalDetailComponent } from './notafiscal-view/notafiscal-detail/notafiscal-detail.component';
import { NotaFiscalListComponent } from './notafiscal-list/notafiscal-list.component';
import { NotaFiscalViewComponent } from './notafiscal-view/notafiscal-view.component';

@NgModule({
    declarations: [NotaFiscalListComponent, NotaFiscalAddComponent,
        NotaFiscalDetailComponent, NotaFiscalViewComponent],
    imports: [ SharedModule, GridModule, NotaFiscalRoutingModule, NDDTitlebarModule, NDDTabsbarModule ],
    exports: [],
    providers: [NotaFiscalGridService, NotaFiscalService, NotaFiscalResolveService],
})
export class NotaFiscalModule {}
