import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EventsService } from 'src/app/APIs/apis';

@Component({
  selector: 'app-tags',
  templateUrl: './sections.filtertags.html',
  styleUrls: ['./sections.filtertags.css'],
})
export class TagsComponent implements OnInit {
  @Input() showMobileTags = false;
  @Output() sendTag = new EventEmitter<string>();
  @Output() clearTag = new EventEmitter<boolean>();
  @Input() tagColor: boolean[] = new Array(22);
  tags: string[] = [];
  showTag: string[] = [];

  constructor(private eventsService: EventsService) {}

  async ngOnInit(): Promise<void> {
    (await this.eventsService.getEventsTag()).subscribe((resp: any) => {
      this.tags = resp.data.tags;
      this.showTag = this.tags.slice(0, 10);
    });
  }

  showTags() {
    this.showTag = this.tags;
  }

  showLessTags() {
    this.showTag = this.tags.slice(0, 10);
  }

  emitTag(tag: string) {
    const index = this.tags.indexOf(tag);
    this.tagColor[index] = !this.tagColor[index];
    this.sendTag.emit(tag);
  }

  emitClearTag() {
    this.clearTag.emit(true);
    this.tagColor.fill(false);
  }
}
