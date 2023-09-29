import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IndexPageRoutingModule } from './index-routing.module';

import { IndexPage } from './index.page';
import { InicioModule } from "../../components/inicio/inicio.module";

@NgModule({
    declarations: [IndexPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        IndexPageRoutingModule,
        InicioModule
    ]
})
export class IndexPageModule {}
