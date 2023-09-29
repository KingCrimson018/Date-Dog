import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DogDetailsPageRoutingModule } from './dog-details-routing.module';

import { DogDetailsPage } from './dog-details.page';
import { ModalsModule } from "../../components/modals/modals.module";

@NgModule({
    declarations: [DogDetailsPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DogDetailsPageRoutingModule,
        ModalsModule
    ]
})
export class DogDetailsPageModule {}
