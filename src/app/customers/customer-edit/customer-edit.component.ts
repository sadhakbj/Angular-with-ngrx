import { Customer } from "./../customer.model";
import { Component, OnInit } from "@angular/core";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import * as customerActions from "../state/customer.actions";
import * as fromCustomer from "../state/customer.reducer";

@Component({
  selector: "app-customer-edit",
  templateUrl: "./customer-edit.component.html",
  styleUrls: ["./customer-edit.component.css"]
})
export class CustomerEditComponent implements OnInit {
  customerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromCustomer.AppState>
  ) {}

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      name: ["", Validators.required],
      phone: ["", Validators.required],
      address: ["", Validators.required],
      membership: ["", Validators.required],
      id: null
    });

    const customer: Observable<Customer> = this.store.select(
      fromCustomer.getCurrentCustomer
    );

    customer.subscribe(currentCustomer => {
      if (currentCustomer) {
        this.customerForm.patchValue({
          id: currentCustomer.id,
          name: currentCustomer.name,
          phone: currentCustomer.phone,
          address: currentCustomer.address,
          membership: currentCustomer.membership
        });
      }
    });
  }

  updateCustomer() {
    const updatedCustomer: Customer = {
      id: this.customerForm.get("id").value,
      name: this.customerForm.get("name").value,
      phone: this.customerForm.get("phone").value,
      address: this.customerForm.get("address").value,
      membership: this.customerForm.get("membership").value
    };

    this.store.dispatch(new customerActions.UpdateCustomer(updatedCustomer));
    this.customerForm.reset();
  }
}
