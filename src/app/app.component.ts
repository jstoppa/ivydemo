import { Component, ViewChild, ViewContainerRef, Injector,
ɵcreateInjector as createInjector,
ɵrenderComponent as renderComponent,
ComponentFactoryResolver
} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <p>Ivy demo</p>
  <p><button (click)="loadLazyComponentUsingCreateInjector()">Load Lazy Component using createInjector</button></p>
  <p><button (click)="loadLazyComponentUsingRenderComponent()">Load Lazy Component using renderComponent</button></p>
  <p><button (click)="loadLazyComponentUsingResolveComponentFactory()">Load Lazy Component using resolveComponentFactory</button></p>

  <p><ng-container #lazycomponent></ng-container></p>
  `
})
export class AppComponent {
  title = 'ivydemo';
  @ViewChild('lazycomponent', { read: ViewContainerRef, static: true })
  public lazycomponent: ViewContainerRef;

  constructor(private injector: Injector, private resolver: ComponentFactoryResolver) {}

  loadLazyComponentUsingCreateInjector() {
    import('./lazy.module').then(({ LazyModule }) => {
      const injector = createInjector(LazyModule, this.injector);
      const lazyModule = injector.get(LazyModule);
      const componentFactory = lazyModule.resolveLazyComponentFactory();
      const componentRef = this.lazycomponent.createComponent(componentFactory);
      componentRef.instance.text = 'using injector';
      componentRef.changeDetectorRef.markForCheck();
    });
  }

  loadLazyComponentUsingRenderComponent() {
    const injector = this.injector;
    import('./lazy.component').then(({ LazyComponent }) => {
      renderComponent(LazyComponent, { injector });
    });
  }

  loadLazyComponentUsingResolveComponentFactory() {
    import('./lazy.component').then(({ LazyComponent }) => {
      const componentFactory = this.resolver.resolveComponentFactory(LazyComponent);
      const componentRef = this.lazycomponent.createComponent(componentFactory, 0, this.injector);
      // renderComponent(LazyComponent, { injector });

      componentRef.instance.text = "no";
      componentRef.changeDetectorRef.markForCheck();
    });
  }


}
