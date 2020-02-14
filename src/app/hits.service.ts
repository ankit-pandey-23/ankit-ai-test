import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const end_point = 'https://hn.algolia.com/api/v1/';

@Injectable({
  providedIn: 'root'
})
export class HitsService {
  constructor(public http: HttpClient) { }

  /* To get poll results*/
  getHits() {
    return this.http.get(end_point + 'search_by_date?tags=story');
  }

}
