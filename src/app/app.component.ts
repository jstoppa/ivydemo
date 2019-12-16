import { Component, ViewChild, ViewContainerRef, Injector,
ɵcreateInjector as createInjector,
ɵrenderComponent as renderComponent,
ɵdetectChanges as detectChanges,
ComponentFactoryResolver,
ElementRef
} from '@angular/core';
import { PlainComponent } from './plain.component';
import { Plain2Component } from './plain2.component';

@Component({
  selector: 'app-root',
  styles: [`
  button {
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    padding: 5px 5px;
    margin: 3px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
  }`],
  template: `
  <h1> Ivy demo</h1>
  <p>This experiment shows all the different ways of creating components with Ivy, with and without lazy loading</p>

  <h3>Eager loading</h3>
  <div style="display:inline-block">
    <button (click)="eagerLoadingComponentUsingDynamicComponentLoader()">Eager loading component using Dynamic Component Loader</button>
    <button (click)="eagerLoadingComponentUsingRenderComponent()">Eager loading component using renderComponent</button>
    <button (click)="eagerLoadingComponentUsingRenderComponent()">Eager loading component using NgElement</button>
  <h3>Lazy loading</h3>
  <div style="display:inline-block">
    <button (click)="lazyLoadingComponentUsingDynamicComponentLoader()">Lazy loading component using Dynamic Component Loader</button>
    <button (click)="lazyLoadingComponentUsingCreateInjector()">Lazy loading component using createInjector</button>
    <button (click)="lazyLoadingComponentUsingRenderComponent()">Lazy loading component using renderComponent</button>
  </div>

  <h3>Change parameters</h3>
  <p><button (click)="increaseInputCounter()">Increase input counter</button></p>

  <p style="border:1px solid #000"></p>
  <h2>Component loading area</h2>

  <h3>Eager loaded component</h3>
  <app-plain-component [label]="'Hard coded in template'" [counter]="counter" [objectCounter]="objectCounter">
  </app-plain-component>
  <ng-container #eagerComponent></ng-container>
  <span #eagerComponentRef2></span>
  

  <h3>Lazy loaded component</h3>
  <ng-container #lazyComponent></ng-container>
  `
})
export class AppComponent {
  title = 'Ivy Demo';
  @ViewChild('eagerComponent', { read: ViewContainerRef, static: true })
  public eagerComponentRef: ViewContainerRef;
  @ViewChild('lazyComponent', { read: ViewContainerRef, static: true })
  public lazyComponentRef: ViewContainerRef;
  
  eagerComponentRef2: ElementRef;

  eagerComponent: any;
  lazyComponent: any;
  counter = 0;
  objectCounter = { num: 0 };

  constructor(
    private injector: Injector,
    private resolver: ComponentFactoryResolver) {}

  /*
    Eager loading methods
  */
  eagerLoadingComponentUsingDynamicComponentLoader() {
    const componentFactory = this.resolver.resolveComponentFactory(PlainComponent);
    const componentRef = this.eagerComponentRef.createComponent(componentFactory);
    componentRef.instance.objectCounter = this.objectCounter;
    componentRef.instance.counter = this.counter;
    componentRef.instance.label = 'Eager loading using dynamic component loader';
  }

  eagerLoadingComponentUsingRenderComponent() {
    this.eagerComponent = renderComponent(Plain2Component, { host : this.eagerComponentRef.element.nativeElement });
    this.eagerComponent.label = 'Eager loading using render component';
    this.eagerComponent.counter = this.counter;
    this.eagerComponent.objectCounter = this.objectCounter;
    detectChanges(this.eagerComponent);
  }

  /*
    Lazy loading methods
  */
  lazyLoadingComponentUsingDynamicComponentLoader() {
    import('./isolated.component').then(({ IsolatedComponent }) => {
      const componentFactory = this.resolver.resolveComponentFactory(IsolatedComponent);
      const componentRef = this.lazyComponentRef.createComponent(componentFactory);
      componentRef.instance.objectCounter = this.objectCounter;
      componentRef.instance.counter = this.counter;
      componentRef.instance.label = 'Lazy loading using dynamic component loader';
    });
  }

  lazyLoadingComponentUsingCreateInjector() {
    import('./isolated.module').then(({ IsolatedModule }) => {
      const injector = createInjector(IsolatedModule, this.injector);
      const lazyModule = injector.get(IsolatedModule);
      const componentFactory = lazyModule.resolveLazyComponentFactory();
      const componentRef = this.lazyComponentRef.createComponent(componentFactory);
      componentRef.instance.counter = this.counter;
      componentRef.instance.objectCounter = this.objectCounter;
      componentRef.instance.label = 'Lazy loading module using create injector';
    });
  }

  lazyLoadingComponentUsingRenderComponent() {
    // let component = renderComponent(Plain2Component, { host: 'span'});////
    // component.label = ''
    // const injector = this.injector;
    // import('./isolated.component').then(({ IsolatedComponent }) => {

    // });
  }

  increaseInputCounter() {
    this.counter++;
    this.objectCounter.num++;
    if (this.eagerComponent) {
      detectChanges(this.eagerComponent);
    }

    if (this.lazyComponent) {
      detectChanges(this.lazyComponent);
    }

  }
}
