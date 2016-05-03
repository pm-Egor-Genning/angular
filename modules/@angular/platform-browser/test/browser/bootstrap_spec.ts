import {
  beforeEach,
  afterEach,
  ddescribe,
  describe,
  expect,
  iit,
  inject,
  it,
  xdescribe,
  xit
} from '@angular/core/testing/testing_internal';
import {
  fakeAsync,
  flushMicrotasks,
  Log,
  tick,
} from '@angular/core/testing';
import {AsyncTestCompleter} from '@angular/core/testing/testing_internal';
import {IS_DART, isPresent, stringify} from '../../src/facade/lang';
import {BROWSER_PROVIDERS} from '@angular/platform-browser';
import {BROWSER_APP_DYNAMIC_PROVIDERS} from '@angular/platform-browser-dynamic';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {ApplicationRef, PlatformRef} from '@angular/core/src/application_ref';
import {Console} from '@angular/core/src/console';
import {Component, Directive, OnDestroy} from '@angular/core';
import {getDOM} from '@angular/platform-browser/src/dom/dom_adapter';
import {DOCUMENT} from '@angular/platform-browser/src/dom/dom_tokens';
import {PromiseWrapper, TimerWrapper} from '../../src/facade/async';
import {
  provide,
  Inject,
  Injector,
  PLATFORM_INITIALIZER,
  APP_INITIALIZER,
  coreLoadAndBootstrap,
  createPlatform,
  ReflectiveInjector
} from '@angular/core';
import {disposePlatform} from '@angular/core/src/application_ref';
import {ExceptionHandler, BaseException} from '@angular/core';
import {Testability, TestabilityRegistry} from '@angular/core/src/testability/testability';
import {ComponentRef} from '@angular/core/src/linker/component_factory';

@Component({selector: 'hello-app', template: '{{greeting}} world!'})
class HelloRootCmp {
  greeting: string;
  constructor() { this.greeting = 'hello'; }
}

@Component({selector: 'hello-app', template: 'before: <ng-content></ng-content> after: done'})
class HelloRootCmpContent {
  constructor() {}
}

@Component({selector: 'hello-app-2', template: '{{greeting}} world, again!'})
class HelloRootCmp2 {
  greeting: string;
  constructor() { this.greeting = 'hello'; }
}

@Component({selector: 'hello-app', template: ''})
class HelloRootCmp3 {
  appBinding;

  constructor(@Inject("appBinding") appBinding) { this.appBinding = appBinding; }
}

@Component({selector: 'hello-app', template: ''})
class HelloRootCmp4 {
  appRef;

  constructor(@Inject(ApplicationRef) appRef) { this.appRef = appRef; }
}

@Component({selector: 'hello-app'})
class HelloRootMissingTemplate {
}

@Directive({selector: 'hello-app'})
class HelloRootDirectiveIsNotCmp {
}

@Component({selector: 'hello-app', template: ''})
class HelloOnDestroyTickCmp implements OnDestroy {
  appRef: ApplicationRef;
  constructor(@Inject(ApplicationRef) appRef) { this.appRef = appRef; }

  ngOnDestroy(): void { this.appRef.tick(); }
}

class _ArrayLogger {
  res: any[] = [];
  log(s: any): void { this.res.push(s); }
  logError(s: any): void { this.res.push(s); }
  logGroup(s: any): void { this.res.push(s); }
  logGroupEnd(){};
}


class DummyConsole implements Console {
  log(message) {}
  warn(message) {}
}

export function main() {
  var fakeDoc, el, el2, testProviders, lightDom;

  describe('bootstrap factory method', () => {
    beforeEach(() => {
      disposePlatform();

      fakeDoc = getDOM().createHtmlDocument();
      el = getDOM().createElement('hello-app', fakeDoc);
      el2 = getDOM().createElement('hello-app-2', fakeDoc);
      lightDom = getDOM().createElement('light-dom-el', fakeDoc);
      getDOM().appendChild(fakeDoc.body, el);
      getDOM().appendChild(fakeDoc.body, el2);
      getDOM().appendChild(el, lightDom);
      getDOM().setText(lightDom, 'loading');
      testProviders =
          [provide(DOCUMENT, {useValue: fakeDoc}), provide(Console, {useClass: DummyConsole})];
    });

    afterEach(disposePlatform);

    it('should throw if bootstrapped Directive is not a Component', () => {
      var logger = new _ArrayLogger();
      var exceptionHandler = new ExceptionHandler(logger, false);
      expect(
          () => bootstrap(HelloRootDirectiveIsNotCmp,
                          [testProviders, provide(ExceptionHandler, {useValue: exceptionHandler})]))
          .toThrowError(
              `Could not compile '${stringify(HelloRootDirectiveIsNotCmp)}' because it is not a component.`);
      expect(logger.res.join("")).toContain("Could not compile");
    });

    it('should throw if no element is found', inject([AsyncTestCompleter], (async) => {
         var logger = new _ArrayLogger();
         var exceptionHandler = new ExceptionHandler(logger, false);

         var refPromise =
             bootstrap(HelloRootCmp, [provide(ExceptionHandler, {useValue: exceptionHandler})]);
         PromiseWrapper.then(refPromise, null, (reason) => {
           expect(reason.message).toContain('The selector "hello-app" did not match any elements');
           async.done();
           return null;
         });
       }));

    if (getDOM().supportsDOMEvents()) {
      it('should forward the error to promise when bootstrap fails',
         inject([AsyncTestCompleter], (async) => {
           // Skip for dart since it causes a confusing error message in console when test passes.
           var logger = new _ArrayLogger();
           var exceptionHandler = new ExceptionHandler(logger, false);

           var refPromise =
               bootstrap(HelloRootCmp, [provide(ExceptionHandler, {useValue: exceptionHandler})]);
           PromiseWrapper.then(refPromise, null, (reason: any) => {
             expect(reason.message)
                 .toContain('The selector "hello-app" did not match any elements');
             async.done();
           });
         }));

      it('should invoke the default exception handler when bootstrap fails',
         inject([AsyncTestCompleter], (async) => {
           var logger = new _ArrayLogger();
           var exceptionHandler = new ExceptionHandler(logger, false);

           var refPromise =
               bootstrap(HelloRootCmp, [provide(ExceptionHandler, {useValue: exceptionHandler})]);
           PromiseWrapper.then(refPromise, null, (reason) => {
             expect(logger.res.join(""))
                 .toContain('The selector "hello-app" did not match any elements');
             async.done();
             return null;
           });
         }));
    }

    it('should create an injector promise', () => {
      var refPromise = bootstrap(HelloRootCmp, testProviders);
      expect(refPromise).not.toBe(null);
    });

    it('should display hello world', inject([AsyncTestCompleter], (async) => {
         var refPromise = bootstrap(HelloRootCmp, testProviders);
         refPromise.then((ref) => {
           expect(el).toHaveText('hello world!');
           async.done();
         });
       }));

    it('should support multiple calls to bootstrap', inject([AsyncTestCompleter], (async) => {
         var refPromise1 = bootstrap(HelloRootCmp, testProviders);
         var refPromise2 = bootstrap(HelloRootCmp2, testProviders);
         PromiseWrapper.all([refPromise1, refPromise2])
             .then((refs) => {
               expect(el).toHaveText('hello world!');
               expect(el2).toHaveText('hello world, again!');
               async.done();
             });
       }));

    it('should not crash if change detection is invoked when the root component is disposed',
       inject([AsyncTestCompleter], (async) => {
         bootstrap(HelloOnDestroyTickCmp, testProviders)
             .then((ref) => {
               expect(() => ref.destroy()).not.toThrow();
               async.done();
             });
       }));

    it('should unregister change detectors when components are disposed',
       inject([AsyncTestCompleter], (async) => {
         var platform = createPlatform(ReflectiveInjector.resolveAndCreate(BROWSER_PROVIDERS));
         var app =
             ReflectiveInjector.resolveAndCreate([BROWSER_APP_DYNAMIC_PROVIDERS, testProviders],
                                                 platform.injector)
                 .get(ApplicationRef);
         coreLoadAndBootstrap(app.injector, HelloRootCmp)
             .then((ref) => {
               ref.destroy();
               expect(() => app.tick()).not.toThrow();
               async.done();
             });
       }));

    it("should make the provided bindings available to the application component",
       inject([AsyncTestCompleter], (async) => {
         var refPromise = bootstrap(
             HelloRootCmp3, [testProviders, provide("appBinding", {useValue: "BoundValue"})]);

         refPromise.then((ref) => {
           expect(ref.instance.appBinding).toEqual("BoundValue");
           async.done();
         });
       }));

    it("should avoid cyclic dependencies when root component requires Lifecycle through DI",
       inject([AsyncTestCompleter], (async) => {
         var refPromise = bootstrap(HelloRootCmp4, testProviders);

         refPromise.then((ref) => {
           expect(ref.instance.appRef).toBe(ref.injector.get(ApplicationRef));
           async.done();
         });
       }));

    it("should run platform initializers", inject([Log], (log: Log) => {
         let p = createPlatform(ReflectiveInjector.resolveAndCreate([
           BROWSER_PROVIDERS,
           provide(PLATFORM_INITIALIZER, {useValue: log.fn("platform_init1"), multi: true}),
           provide(PLATFORM_INITIALIZER, {useValue: log.fn("platform_init2"), multi: true})
         ]));
         expect(log.result()).toEqual("platform_init1; platform_init2");
         log.clear();
         var a = ReflectiveInjector.resolveAndCreate(
             [
               BROWSER_APP_DYNAMIC_PROVIDERS,
               provide(APP_INITIALIZER, {useValue: log.fn("app_init1"), multi: true}),
               provide(APP_INITIALIZER, {useValue: log.fn("app_init2"), multi: true})
             ],
             p.injector);
         a.get(ApplicationRef);

         expect(log.result()).toEqual("app_init1; app_init2");
       }));

    it('should register each application with the testability registry',
       inject([AsyncTestCompleter], (async) => {
         var refPromise1: Promise<ComponentRef<any>> = bootstrap(HelloRootCmp, testProviders);
         var refPromise2: Promise<ComponentRef<any>> = bootstrap(HelloRootCmp2, testProviders);

         PromiseWrapper.all([refPromise1, refPromise2])
             .then((refs: ComponentRef<any>[]) => {
               var registry = refs[0].injector.get(TestabilityRegistry);
               var testabilities =
                   [refs[0].injector.get(Testability), refs[1].injector.get(Testability)];
               PromiseWrapper.all(testabilities)
                   .then((testabilities: Testability[]) => {
                     expect(registry.findTestabilityInTree(el)).toEqual(testabilities[0]);
                     expect(registry.findTestabilityInTree(el2)).toEqual(testabilities[1]);
                     async.done();
                   });
             });
       }));
  });
}