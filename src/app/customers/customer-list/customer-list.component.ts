import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Customer } from "../customer.model";
import * as customerActions from "../state/customer.actions";
import * as fromCustomer from "../state/customer.reducer";

@Component({
  selector: "app-customer-list",
  templateUrl: "./customer-list.component.html",
  styleUrls: ["./customer-list.component.css"]
})
export class CustomerListComponent implements OnInit {
  customers: Observable<Customer[]>;
  error: Observable<string>;

  constructor(protected store: Store<fromCustomer.AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(new customerActions.LoadCustomers());
    this.customers = this.store.pipe(select(fromCustomer.getCustomers));
    this.error = this.store.pipe(select(fromCustomer.getError));
  }

  deleteCustomer(customer: Customer) {
    if (confirm("Delete customer?")) {
      this.store.dispatch(new customerActions.DeleteCustomer(customer.id));
    }
  }

  editCustomer(customer: Customer) {
    this.store.dispatch(new customerActions.LoadCustomer(customer.id));
  }
}
