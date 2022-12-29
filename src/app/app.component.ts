import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
  
  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })
  export class AppComponent implements OnInit {
    
    codingEvents: any = [];
    bootcampEvents: any = [];
    webinars: any = [];
    workshops: any = [];
    selectedTags: string[] = [];
    eventTags: string[] = [];
  
    
    constructor(private http: HttpClient) {}
  
    ngOnInit() {
      
      this.http.get<string[]>('https://api.codingninjas.com/api/v3/event_tags')
        .subscribe((response: string[]) => {
          this.eventTags = response;
        });
  
      
      this.fetchEvents('CODING_EVENT', 'UPCOMING', [], 0);
      this.fetchEvents('BOOTCAMP_EVENT', 'UPCOMING', [], 0);
      this.fetchEvents('WEBINAR', 'UPCOMING', [], 0);
      this.fetchEvents('WORKSHOP', 'UPCOMING', [], 0);
    }
  

    fetchEvents(category: string, subCategory: string, tags: string[], offset: number) {
      this.http.get('https://api.codingninjas.com/api/v3/events', {
        params: {
          event_category: category,
          event_sub_category: subCategory,
          tag_list: tags.join(','),
          offset: offset.toString()
        }
      })
        .subscribe(events => {

          if (category === 'CODING_EVENT') {
            this.codingEvents = events;
          } else if (category === 'BOOTCAMP_EVENT') {
            this.bootcampEvents = events;
          } else if (category === 'WEBINAR') {
            this.webinars = events;
          } else if (category === 'WORKSHOP') {
            this.workshops = events;
          }
        });
    }
  
    showUpcomingEvents(category: string) {
      if (category === 'coding') {
        this.fetchEvents('CODING_EVENT', 'UPCOMING', this.selectedTags, 0);
      } else if (category === 'bootcamp') {
        this.fetchEvents('BOOTCAMP_EVENT', 'UPCOMING', this.selectedTags, 0);
      } else if (category === 'webinars') {
        this.fetchEvents('WEBINAR', 'UPCOMING', this.selectedTags, 0);
      } else if (category === 'workshops') {
        this.fetchEvents('WORKSHOP', 'UPCOMING', this.selectedTags, 0);
      }
    }

    showArchivedEvents(category: string) {
      if (category === 'coding') {
        this.fetchEvents('CODING_EVENT', 'ARCHIVED', this.selectedTags, 0);
      } else if (category === 'bootcamp') {
        this.fetchEvents('BOOTCAMP_EVENT', 'ARCHIVED', this.selectedTags, 0);
      } else if (category === 'webinars') {
        this.fetchEvents('WEBINAR', 'ARCHIVED', this.selectedTags, 0);
      } else if (category === 'workshops') {
        this.fetchEvents('WORKSHOP', 'ARCHIVED', this.selectedTags, 0);
      }
    }

    showAllTimeFavourites(category: string) {
      if (category === 'coding') {
        this.fetchEvents('CODING_EVENT', 'ALL_TIME_FAVORITES', this.selectedTags, 0);
      } else if (category === 'bootcamp') {
        this.fetchEvents('BOOTCAMP_EVENT', 'ALL_TIME_FAVORITES', this.selectedTags, 0);
      } else if (category === 'webinars') {
        this.fetchEvents('WEBINAR', 'ALL_TIME_FAVORITES', this.selectedTags, 0);
      } else if (category === 'workshops') {
        this.fetchEvents('WORKSHOP', 'ALL_TIME_FAVORITES', this.selectedTags, 0);
      }
    }

    filterEvents() {
      this.fetchEvents('CODING_EVENT', 'UPCOMING', this.selectedTags, 0);
      this.fetchEvents('BOOTCAMP_EVENT', 'UPCOMING', this.selectedTags, 0);
      this.fetchEvents('WEBINAR', 'UPCOMING', this.selectedTags, 0);
      this.fetchEvents('WORKSHOP', 'UPCOMING', this.selectedTags, 0);
    }


    applyTagFilter() {

      this.fetchEvents('CODING_EVENT', 'UPCOMING', this.selectedTags, 0);
      this.fetchEvents('BOOTCAMP_EVENT', 'UPCOMING', this.selectedTags, 0);
      this.fetchEvents('WEBINAR', 'UPCOMING', this.selectedTags, 0);
      this.fetchEvents('WORKSHOP', 'UPCOMING', this.selectedTags, 0);
    }
  
    clearTagFilter() {
      this.selectedTags = [];
      this.fetchEvents('CODING_EVENT', 'UPCOMING', [], 0);
      this.fetchEvents('BOOTCAMP_EVENT', 'UPCOMING', [], 0);
      this.fetchEvents('WEBINAR', 'UPCOMING', [], 0);
      this.fetchEvents('WORKSHOP', 'UPCOMING', [], 0);
    }
  }