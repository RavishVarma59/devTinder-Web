import { NgModule } from "@angular/core";
import { Contactus } from "./contactus/contactus";
import { Cookiepolicy } from "./cookiepolicy/cookiepolicy";
import { Privacy } from "./privacy/privacy";
import { RefundPolicy } from "./refund-policy/refund-policy";
import { Shippingpolicy } from "./shippingpolicy/shippingpolicy";
import { Terms } from "./terms/terms";
import { Router, RouterModule } from "@angular/router";

const routes = [
    {
        path : "privacy", component : Privacy
    },
    {
        path : "contactus", component : Contactus
    },
    {
        path : "cookiespolicy", component : Cookiepolicy
    },
    {
        path : "refund", component : RefundPolicy
    },
    {
        path : "terms", component : Terms
    },
    {
        path : "shipping", component : Shippingpolicy
    },
]

@NgModule({
    // declarations:[Contactus,Cookiepolicy,Privacy,RefundPolicy,Shippingpolicy,Terms],
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class PolicyRoutingModule {

}