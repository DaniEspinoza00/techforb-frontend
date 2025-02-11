import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToggleNavService {
  isOpen = signal(false);

  constructor() { }

  isToggled(){
    this.isOpen.set(!this.isOpen());
  }
}
