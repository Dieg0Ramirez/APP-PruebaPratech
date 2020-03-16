import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import {
MatButtonModule,
MatIconModule,
MatCardModule,
MatFormFieldModule,
MatInputModule,
MatListModule,
MatDatepickerModule,
MatNativeDateModule,
MatSelectModule,
MatOptionModule,
MatCheckboxModule,       
MatRadioModule
} from "@angular/material";
import {MatTableModule} from '@angular/material/table';
import {CdkTableModule} from '@angular/cdk/table';
import {MatPaginatorModule} from '@angular/material/paginator';
@NgModule({
imports: [
MatButtonModule,
MatIconModule,
MatCardModule,
MatFormFieldModule,
MatInputModule,
MatListModule,
MatDatepickerModule,
MatNativeDateModule,
MatMomentDateModule,
MatSelectModule,
MatOptionModule,
MatCheckboxModule,
MatRadioModule
],
exports: [
MatButtonModule,
MatIconModule,
MatCardModule,
MatFormFieldModule,
MatInputModule,
MatListModule,
MatDatepickerModule,
MatNativeDateModule,
MatMomentDateModule,
MatSelectModule,
MatOptionModule,
MatCheckboxModule,
MatRadioModule,
MatTableModule,
CdkTableModule,
MatPaginatorModule
]
})
export class MaterialModule { }

