import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-lazy-component',
  template: `<p>This is a lazy component - text input = {{ text }}</p>`
})
export class LazyComponent {
  @Input() text = '';

}
