import { NgModule, ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsolatedComponent } from './isolated.component';

@NgModule({
  imports: [CommonModule],
  declarations: []
})
export class IsolatedModule {
  constructor(private resolver: ComponentFactoryResolver) {}

  public resolveLazyComponentFactory(): ComponentFactory<IsolatedComponent> {
    return this.resolver.resolveComponentFactory(IsolatedComponent);
  }
}