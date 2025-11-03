import { NgModule } from "@angular/core";
import { PolicyRoutingModule } from "./policy-routing-module";
import { RouterModule } from "@angular/router";
import { Contactus } from "./contactus/contactus";
import { Cookiepolicy } from "./cookiepolicy/cookiepolicy";
import { Privacy } from "./privacy/privacy";
import { RefundPolicy } from "./refund-policy/refund-policy";
import { Shippingpolicy } from "./shippingpolicy/shippingpolicy";
import { Terms } from "./terms/terms";
import { CommonModule } from "@angular/common";

@NgModule({
     declarations:[],
    imports:[PolicyRoutingModule, CommonModule,
        Contactus,Cookiepolicy,Privacy,RefundPolicy,Shippingpolicy,Terms
    ],
   
    providers:[]
})

export class PolicyModule {

}