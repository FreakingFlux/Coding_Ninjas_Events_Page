import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const events_api = 'https://api.codingninjas.com/api/v3/events';
const tags_api = 'https://api.codingninjas.com/api/v3/event_tags';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private http: HttpClient) {}

  async getEvents(
    Category: string,
    Subcategory: string,
    List: string[],
    offset: number
  ) {
    const params = `?event_category=${Category}&event_sub_category=${Subcategory}&tag_list=${List.join(
      ','
    )}&offset=${offset}`;
    return await this.http.get(events_api + params);
  }

  async getEventsTag() {
    return await this.http.get(tags_api);
  }
}
