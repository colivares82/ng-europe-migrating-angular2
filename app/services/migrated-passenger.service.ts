/**
 * Created by colivares on 10/24/16.
 */
import {Http, URLSearchParams, Headers} from '@angular/http';
import {Injectable} from '@angular/core';

import {Passenger} from '../shared/passenger';

@Injectable()
export class MigratedPassengerService {

    constructor(private http: Http) {

    }


    find(name): Promise<Passenger[]> {
        // Add debug-info
        console.debug('calling MigratedPassengerService.find', name);
        var url = 'http://www.angular.at/api/passenger';

        let urlParams = new URLSearchParams()
        urlParams.set('name', name);

        let headers = new Headers();
        headers.set('Accept', 'text/json');

        return this
            .http
            .get(url, {search: urlParams, headers: headers})
            .map(resp => resp.json())
            .toPromise();
    }
}