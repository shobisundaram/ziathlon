import { Component } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions } from '@fullcalendar/core';
import { MenuService } from '../../shared/menu.service';
import { distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'ngx-fullcalender',
  templateUrl: './fullcalender.component.html',
  styleUrls: ['./fullcalender.component.scss']
})
export class FullcalenderComponent {
colorThemes = [
  { bg: '#E3F2FD', border: '#2196F3' }, // Blue
  { bg: '#F1F8E9', border: '#689F38' }, // Green
  { bg: '#FFF3E0', border: '#FB8C00' }, // Orange
  { bg: '#F3E5F5', border: '#8E24AA' }, // Purple
  { bg: '#E0F7FA', border: '#00ACC1' }, // Teal
  { bg: '#FCE4EC', border: '#D81B60' }, // Pink
];


  rawEvents = [
        {
      title: 'Meeting with Bob',
      start: '2025-05-15T10:00:00',
      end: '2025-05-15T11:00:00',
      description: 'Discuss project milestones'
    },
    {
      title: 'Lunch with Sarah',
      start: '2025-05-16T12:00:00',
      end: '2025-05-16T13:30:00',
      description: 'Lunch break at local restaurant'
    },
    {
      title: 'figma',
      start: '2025-05-16T11:30:00',
      end: '2025-05-16T13:00:00',
      description: 'plan figma'
    },
    {
      title: 'Conference Call',
      start: '2025-05-17T09:00:00',
      end: '2025-05-17T10:00:00',
      description: 'Monthly team call'
    }
  ]
allEvents = this.rawEvents.map(event => {
  const theme = this.colorThemes[Math.floor(Math.random() * this.colorThemes.length)];
  return {
    ...event,
    backgroundColor: theme.bg,
    borderColor: theme.border,
    textColor: '#000',
    className: 'custom-event'
  };
});

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,today,next',
      center: 'timeGridDay,timeGridWeek,dayGridMonth,dayGridYear',
      right: ''
    },
    customButtons: {
      searchInput: {
        text: '🔍', // placeholder, will be replaced
        click: () => {} // no action needed
      }
    
    },
    initialView: 'timeGridWeek',
    slotDuration: '00:30:00',
    allDaySlot: false,
    events: this.allEvents,
    datesSet: () => {
    setTimeout(() => this.injectSearchInput(), 0); // inject after view renders
    },
    views: {
      timeGridWeek: {
        dayHeaderContent: (arg) => {
          const date = arg.date;
          const weekday = date.toLocaleDateString('en-US', { weekday: 'short' }); // Sun
          const day = date.getDate(); // 21
          return { html: `<div class="custom-day-header"><div class="weeks">${weekday}</div><div class="day-number">${day}</div></div>` };
        }
      }
    },
      dayCellClassNames: (arg) => {
        const day = arg.date.getDay();
        if (day === 0 || day === 6) return ['fc-weekend'];
        return [];
      },
      dayHeaderClassNames: (arg) => {
        const day = arg.date.getDay();
        if (day === 0 || day === 6) return ['fc-weekend'];
        return [];
      }

  };

injectSearchInput() {
  const toolbar = document.querySelector('.fc-toolbar-chunk:last-child');
  if (!toolbar || toolbar.querySelector('#calendarSearchWrapper')) return;

  const wrapper = document.createElement('div');
  wrapper.id = 'calendarSearchWrapper';
  wrapper.style.position = 'relative';
  wrapper.style.display = 'inline-block';

  const icon = document.createElement('i');
  icon.className = 'fa fa-search';
  icon.style.position = 'absolute';
  icon.style.left = '10px';
  icon.style.top = '50%';
  icon.style.transform = 'translateY(-50%)';
  icon.style.color = '#888';

  const input = document.createElement('input');
  input.id = 'calendarSearch';
  input.type = 'text';
  input.placeholder = 'Search';
  input.style.padding = '5px 10px 5px 30px'; // add left padding for icon
  input.style.fontSize = '14px';
  input.style.border = '1px solid #F4F4F5';
  input.style.background = '#F4F4F5'
  input.style.borderRadius = '4px';

  input.addEventListener('input', (e: any) => {
    const searchTerm = e.target.value.toLowerCase();
    this.filterEvents(searchTerm);
  });

  wrapper.appendChild(icon);
  wrapper.appendChild(input);
  toolbar.appendChild(wrapper);
}

filterEvents(searchTerm: string) {
  // Example: filter your original events based on the search term
  const filtered = this.allEvents.filter(event =>
    event.title.toLowerCase().includes(searchTerm)
  );
  this.calendarOptions.events = filtered;
}
}
