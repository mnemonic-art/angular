'use strict';"use strict";
var core_1 = require('angular2/core');
/**
 * Used to provide a {@link ControlValueAccessor} for form controls.
 *
 * See {@link DefaultValueAccessor} for how to implement one.
 */
exports.NG_VALUE_ACCESSOR = 
/*@ts2dart_const*/ new core_1.OpaqueToken("NgValueAccessor");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbF92YWx1ZV9hY2Nlc3Nvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtRDN0RWJYOVgudG1wL2FuZ3VsYXIyL3NyYy9jb21tb24vZm9ybXMvZGlyZWN0aXZlcy9jb250cm9sX3ZhbHVlX2FjY2Vzc29yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxxQkFBMEIsZUFBZSxDQUFDLENBQUE7QUEyQjFDOzs7O0dBSUc7QUFDVSx5QkFBaUI7QUFDMUIsa0JBQWtCLENBQUMsSUFBSSxrQkFBVyxDQUFDLGlCQUFpQixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge09wYXF1ZVRva2VufSBmcm9tICdhbmd1bGFyMi9jb3JlJztcblxuLyoqXG4gKiBBIGJyaWRnZSBiZXR3ZWVuIGEgY29udHJvbCBhbmQgYSBuYXRpdmUgZWxlbWVudC5cbiAqXG4gKiBBIGBDb250cm9sVmFsdWVBY2Nlc3NvcmAgYWJzdHJhY3RzIHRoZSBvcGVyYXRpb25zIG9mIHdyaXRpbmcgYSBuZXcgdmFsdWUgdG8gYVxuICogRE9NIGVsZW1lbnQgcmVwcmVzZW50aW5nIGFuIGlucHV0IGNvbnRyb2wuXG4gKlxuICogUGxlYXNlIHNlZSB7QGxpbmsgRGVmYXVsdFZhbHVlQWNjZXNzb3J9IGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgLyoqXG4gICAqIFdyaXRlIGEgbmV3IHZhbHVlIHRvIHRoZSBlbGVtZW50LlxuICAgKi9cbiAgd3JpdGVWYWx1ZShvYmo6IGFueSk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIHdoZW4gdGhlIGNvbnRyb2wgcmVjZWl2ZXMgYSBjaGFuZ2UgZXZlbnQuXG4gICAqL1xuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCB3aGVuIHRoZSBjb250cm9sIHJlY2VpdmVzIGEgdG91Y2ggZXZlbnQuXG4gICAqL1xuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZDtcbn1cblxuLyoqXG4gKiBVc2VkIHRvIHByb3ZpZGUgYSB7QGxpbmsgQ29udHJvbFZhbHVlQWNjZXNzb3J9IGZvciBmb3JtIGNvbnRyb2xzLlxuICpcbiAqIFNlZSB7QGxpbmsgRGVmYXVsdFZhbHVlQWNjZXNzb3J9IGZvciBob3cgdG8gaW1wbGVtZW50IG9uZS5cbiAqL1xuZXhwb3J0IGNvbnN0IE5HX1ZBTFVFX0FDQ0VTU09SOiBPcGFxdWVUb2tlbiA9XG4gICAgLypAdHMyZGFydF9jb25zdCovIG5ldyBPcGFxdWVUb2tlbihcIk5nVmFsdWVBY2Nlc3NvclwiKTtcbiJdfQ==