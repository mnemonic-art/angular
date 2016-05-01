'use strict';"use strict";
var lang_1 = require('angular2/src/facade/lang');
var dom_adapter_1 = require('angular2/src/platform/dom/dom_adapter');
var debug_node_1 = require('angular2/src/core/debug/debug_node');
var dom_renderer_1 = require('angular2/src/platform/dom/dom_renderer');
var core_1 = require('angular2/core');
var debug_renderer_1 = require('angular2/src/core/debug/debug_renderer');
var CORE_TOKENS = { 'ApplicationRef': core_1.ApplicationRef, 'NgZone': core_1.NgZone };
var INSPECT_GLOBAL_NAME = 'ng.probe';
var CORE_TOKENS_GLOBAL_NAME = 'ng.coreTokens';
/**
 * Returns a {@link DebugElement} for the given native DOM element, or
 * null if the given native element does not have an Angular view associated
 * with it.
 */
function inspectNativeElement(element) {
    return debug_node_1.getDebugNode(element);
}
exports.inspectNativeElement = inspectNativeElement;
function _createConditionalRootRenderer(rootRenderer) {
    if (lang_1.assertionsEnabled()) {
        return _createRootRenderer(rootRenderer);
    }
    return rootRenderer;
}
function _createRootRenderer(rootRenderer) {
    dom_adapter_1.DOM.setGlobalVar(INSPECT_GLOBAL_NAME, inspectNativeElement);
    dom_adapter_1.DOM.setGlobalVar(CORE_TOKENS_GLOBAL_NAME, CORE_TOKENS);
    return new debug_renderer_1.DebugDomRootRenderer(rootRenderer);
}
/**
 * Providers which support debugging Angular applications (e.g. via `ng.probe`).
 */
exports.ELEMENT_PROBE_PROVIDERS = [
    /*@ts2dart_Provider*/ {
        provide: core_1.RootRenderer,
        useFactory: _createConditionalRootRenderer,
        deps: [dom_renderer_1.DomRootRenderer]
    }
];
exports.ELEMENT_PROBE_PROVIDERS_PROD_MODE = [
    /*@ts2dart_Provider*/ {
        provide: core_1.RootRenderer,
        useFactory: _createRootRenderer,
        deps: [dom_renderer_1.DomRootRenderer]
    }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfcHJvYmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLUQzdEViWDlYLnRtcC9hbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2RlYnVnL25nX3Byb2JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxxQkFBZ0MsMEJBQTBCLENBQUMsQ0FBQTtBQUMzRCw0QkFBa0IsdUNBQXVDLENBQUMsQ0FBQTtBQUMxRCwyQkFBc0Msb0NBQW9DLENBQUMsQ0FBQTtBQUMzRSw2QkFBOEIsd0NBQXdDLENBQUMsQ0FBQTtBQUN2RSxxQkFBbUQsZUFBZSxDQUFDLENBQUE7QUFDbkUsK0JBQW1DLHdDQUF3QyxDQUFDLENBQUE7QUFFNUUsSUFBTSxXQUFXLEdBQXNCLEVBQUMsZ0JBQWdCLEVBQUUscUJBQWMsRUFBRSxRQUFRLEVBQUUsYUFBTSxFQUFDLENBQUM7QUFFNUYsSUFBTSxtQkFBbUIsR0FBRyxVQUFVLENBQUM7QUFDdkMsSUFBTSx1QkFBdUIsR0FBRyxlQUFlLENBQUM7QUFFaEQ7Ozs7R0FJRztBQUNILDhCQUFxQyxPQUFPO0lBQzFDLE1BQU0sQ0FBQyx5QkFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQy9CLENBQUM7QUFGZSw0QkFBb0IsdUJBRW5DLENBQUE7QUFFRCx3Q0FBd0MsWUFBWTtJQUNsRCxFQUFFLENBQUMsQ0FBQyx3QkFBaUIsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN4QixNQUFNLENBQUMsbUJBQW1CLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUNELE1BQU0sQ0FBQyxZQUFZLENBQUM7QUFDdEIsQ0FBQztBQUVELDZCQUE2QixZQUFZO0lBQ3ZDLGlCQUFHLENBQUMsWUFBWSxDQUFDLG1CQUFtQixFQUFFLG9CQUFvQixDQUFDLENBQUM7SUFDNUQsaUJBQUcsQ0FBQyxZQUFZLENBQUMsdUJBQXVCLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDdkQsTUFBTSxDQUFDLElBQUkscUNBQW9CLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDaEQsQ0FBQztBQUVEOztHQUVHO0FBQ1UsK0JBQXVCLEdBQTRCO0lBQzlELHFCQUFxQixDQUFDO1FBQ3BCLE9BQU8sRUFBRSxtQkFBWTtRQUNyQixVQUFVLEVBQUUsOEJBQThCO1FBQzFDLElBQUksRUFBRSxDQUFDLDhCQUFlLENBQUM7S0FDeEI7Q0FDRixDQUFDO0FBRVcseUNBQWlDLEdBQTRCO0lBQ3hFLHFCQUFxQixDQUFDO1FBQ3BCLE9BQU8sRUFBRSxtQkFBWTtRQUNyQixVQUFVLEVBQUUsbUJBQW1CO1FBQy9CLElBQUksRUFBRSxDQUFDLDhCQUFlLENBQUM7S0FDeEI7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHthc3NlcnRpb25zRW5hYmxlZH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7RE9NfSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2RvbV9hZGFwdGVyJztcbmltcG9ydCB7RGVidWdOb2RlLCBnZXREZWJ1Z05vZGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RlYnVnL2RlYnVnX25vZGUnO1xuaW1wb3J0IHtEb21Sb290UmVuZGVyZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vZG9tX3JlbmRlcmVyJztcbmltcG9ydCB7Um9vdFJlbmRlcmVyLCBOZ1pvbmUsIEFwcGxpY2F0aW9uUmVmfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7RGVidWdEb21Sb290UmVuZGVyZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RlYnVnL2RlYnVnX3JlbmRlcmVyJztcblxuY29uc3QgQ09SRV9UT0tFTlMgPSAvKkB0czJkYXJ0X2NvbnN0Ki8geydBcHBsaWNhdGlvblJlZic6IEFwcGxpY2F0aW9uUmVmLCAnTmdab25lJzogTmdab25lfTtcblxuY29uc3QgSU5TUEVDVF9HTE9CQUxfTkFNRSA9ICduZy5wcm9iZSc7XG5jb25zdCBDT1JFX1RPS0VOU19HTE9CQUxfTkFNRSA9ICduZy5jb3JlVG9rZW5zJztcblxuLyoqXG4gKiBSZXR1cm5zIGEge0BsaW5rIERlYnVnRWxlbWVudH0gZm9yIHRoZSBnaXZlbiBuYXRpdmUgRE9NIGVsZW1lbnQsIG9yXG4gKiBudWxsIGlmIHRoZSBnaXZlbiBuYXRpdmUgZWxlbWVudCBkb2VzIG5vdCBoYXZlIGFuIEFuZ3VsYXIgdmlldyBhc3NvY2lhdGVkXG4gKiB3aXRoIGl0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5zcGVjdE5hdGl2ZUVsZW1lbnQoZWxlbWVudCk6IERlYnVnTm9kZSB7XG4gIHJldHVybiBnZXREZWJ1Z05vZGUoZWxlbWVudCk7XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVDb25kaXRpb25hbFJvb3RSZW5kZXJlcihyb290UmVuZGVyZXIpIHtcbiAgaWYgKGFzc2VydGlvbnNFbmFibGVkKCkpIHtcbiAgICByZXR1cm4gX2NyZWF0ZVJvb3RSZW5kZXJlcihyb290UmVuZGVyZXIpO1xuICB9XG4gIHJldHVybiByb290UmVuZGVyZXI7XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVSb290UmVuZGVyZXIocm9vdFJlbmRlcmVyKSB7XG4gIERPTS5zZXRHbG9iYWxWYXIoSU5TUEVDVF9HTE9CQUxfTkFNRSwgaW5zcGVjdE5hdGl2ZUVsZW1lbnQpO1xuICBET00uc2V0R2xvYmFsVmFyKENPUkVfVE9LRU5TX0dMT0JBTF9OQU1FLCBDT1JFX1RPS0VOUyk7XG4gIHJldHVybiBuZXcgRGVidWdEb21Sb290UmVuZGVyZXIocm9vdFJlbmRlcmVyKTtcbn1cblxuLyoqXG4gKiBQcm92aWRlcnMgd2hpY2ggc3VwcG9ydCBkZWJ1Z2dpbmcgQW5ndWxhciBhcHBsaWNhdGlvbnMgKGUuZy4gdmlhIGBuZy5wcm9iZWApLlxuICovXG5leHBvcnQgY29uc3QgRUxFTUVOVF9QUk9CRV9QUk9WSURFUlM6IGFueVtdID0gLypAdHMyZGFydF9jb25zdCovW1xuICAvKkB0czJkYXJ0X1Byb3ZpZGVyKi8ge1xuICAgIHByb3ZpZGU6IFJvb3RSZW5kZXJlcixcbiAgICB1c2VGYWN0b3J5OiBfY3JlYXRlQ29uZGl0aW9uYWxSb290UmVuZGVyZXIsXG4gICAgZGVwczogW0RvbVJvb3RSZW5kZXJlcl1cbiAgfVxuXTtcblxuZXhwb3J0IGNvbnN0IEVMRU1FTlRfUFJPQkVfUFJPVklERVJTX1BST0RfTU9ERTogYW55W10gPSAvKkB0czJkYXJ0X2NvbnN0Ki9bXG4gIC8qQHRzMmRhcnRfUHJvdmlkZXIqLyB7XG4gICAgcHJvdmlkZTogUm9vdFJlbmRlcmVyLFxuICAgIHVzZUZhY3Rvcnk6IF9jcmVhdGVSb290UmVuZGVyZXIsXG4gICAgZGVwczogW0RvbVJvb3RSZW5kZXJlcl1cbiAgfVxuXTtcbiJdfQ==