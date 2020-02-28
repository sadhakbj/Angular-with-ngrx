import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { CustomerAddComponent } from "./customer-add/customer-add.component";
import { CustomerEditComponent } from "./customer-edit/customer-edit.component";
import { CustomerListComponent } from "./customer-list/customer-list.component";
import { CustomerComponent } from "./customer/customer.component";
import { CustomerEffect } from "./state/customer.effects";
import { customerReducer } from "./state/customer.reducer";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

const customerRoutes: Routes = [
  {
    path: "",
    component: CustomerComponent
  },
  {
    path: "create",
    component: CustomerAddComponent
  }
];

@NgModule({
  declarations: [
    CustomerComponent,
    CustomerAddComponent,
    CustomerEditComponent,
    CustomerListComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild(customerRoutes),
    StoreModule.forFeature("customers", customerReducer),
    EffectsModule.forFeature([CustomerEffect])
  ]
})
export class CustomersModule {}
