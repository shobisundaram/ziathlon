import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  private currentSection: string | null = null;
  private sectionSubject = new BehaviorSubject<string | null>(null);
  section$ = this.sectionSubject.asObservable();

  setSection(section: string) {
    console.log(section);
    this.currentSection = section;
    this.sectionSubject.next(section);
  }

  getCurrentSection(): string | null {
    return this.currentSection;
  }
}
