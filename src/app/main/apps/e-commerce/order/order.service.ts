import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class EcommerceOrderService implements Resolve<any>
{
    routeParams: any;
    order: any;
    onOrderChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    )
    {
        // Set the defaults
        this.onOrderChanged = new BehaviorSubject({});
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        this.routeParams = route.params;

        return new Promise<void>((resolve, reject) => {

            Promise.all([
                this.getOrder()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get order
     *
     * @returns {Promise<any>}
     */
    getOrder(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('http://localhost:3000/api/order/' + this.routeParams.id)
                .subscribe((response: any) => {
                    this.order = response[0];
                    this.onOrderChanged.next(this.order);
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Save order
     *
     * @param order
     * @returns {Promise<any>}
     */
    saveOrder(order): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post('http://localhost:3000/api/order' + order.id, order)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Add order
     *
     * @param order
     * @returns {Promise<any>}
     */
    addOrder(order): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post('http://localhost:3000/api/order', order)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }


        /**
     * Update order
     *
     * @param order
     * @returns {Promise<any>}
     */
         updateOrder(order): Promise<any>
         {
             return new Promise((resolve, reject) => {
                 this._httpClient.put('http://localhost:3000/api/order', order)
                     .subscribe((response: any) => {
                         resolve(response);
                     }, reject);
             });
         }
}
