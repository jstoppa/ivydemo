import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-plain-component',
  template: `
    <div style="border: 1px solid #000; margin-top: 5px; padding:5px;">
      <p><strong>Plain component</strong></p>
      <p><strong>This component IS included in an NgModule and entryComponents</strong></p>
      <p><strong>Load type:</strong><b style="color:red"> {{label}}</b></p>
      <p><strong>Parameters</strong></p>
      <p>Primitive parameter - Counter = {{counter}}</p>
      <p>Object parameter - Object counter = {{objectCounter?.num }}</p>
    </div>
    `
})
export class PlainComponent {
  @Input() label = null;
  @Input() counter = null;
  @Input() objectCounter = null;
}
