import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DogsPageRoutingModule } from './dogs-routing.module';

import { DogsPage } from './dogs.page';
import { InicioModule } from "../../components/inicio/inicio.module";

@NgModule({
    declarations: [DogsPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DogsPageRoutingModule,
        InicioModule
    ]
})
export class DogsPageModule {}
