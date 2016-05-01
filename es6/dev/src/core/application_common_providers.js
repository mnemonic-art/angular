import { APP_ID_RANDOM_PROVIDER } from './application_tokens';
import { APPLICATION_CORE_PROVIDERS } from './application_ref';
import { IterableDiffers, defaultIterableDiffers, KeyValueDiffers, defaultKeyValueDiffers } from './change_detection/change_detection';
import { ViewUtils } from "./linker/view_utils";
import { ComponentResolver, ReflectorComponentResolver } from './linker/component_resolver';
import { DynamicComponentLoader, DynamicComponentLoader_ } from './linker/dynamic_component_loader';
let __unused; // avoid unused import when Type union types are erased
/**
 * A default set of providers which should be included in any Angular
 * application, regardless of the platform it runs onto.
 */
export const APPLICATION_COMMON_PROVIDERS = 
/*@ts2dart_const*/ [
    APPLICATION_CORE_PROVIDERS,
    /* @ts2dart_Provider */ { provide: ComponentResolver, useClass: ReflectorComponentResolver },
    APP_ID_RANDOM_PROVIDER,
    ViewUtils,
    /* @ts2dart_Provider */ { provide: IterableDiffers, useValue: defaultIterableDiffers },
    /* @ts2dart_Provider */ { provide: KeyValueDiffers, useValue: defaultKeyValueDiffers },
    /* @ts2dart_Provider */ { provide: DynamicComponentLoader, useClass: DynamicComponentLoader_ }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGljYXRpb25fY29tbW9uX3Byb3ZpZGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtd1hFSTM3ZlIudG1wL2FuZ3VsYXIyL3NyYy9jb3JlL2FwcGxpY2F0aW9uX2NvbW1vbl9wcm92aWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ik9BQ08sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLHNCQUFzQjtPQUNwRCxFQUFDLDBCQUEwQixFQUFDLE1BQU0sbUJBQW1CO09BQ3JELEVBQ0wsZUFBZSxFQUNmLHNCQUFzQixFQUN0QixlQUFlLEVBQ2Ysc0JBQXNCLEVBQ3ZCLE1BQU0scUNBQXFDO09BQ3JDLEVBQUMsU0FBUyxFQUFDLE1BQU0scUJBQXFCO09BQ3RDLEVBQUMsaUJBQWlCLEVBQUUsMEJBQTBCLEVBQUMsTUFBTSw2QkFBNkI7T0FDbEYsRUFBQyxzQkFBc0IsRUFBRSx1QkFBdUIsRUFBQyxNQUFNLG1DQUFtQztBQUVqRyxJQUFJLFFBQWMsQ0FBQyxDQUFFLHVEQUF1RDtBQUU1RTs7O0dBR0c7QUFDSCxPQUFPLE1BQU0sNEJBQTRCO0FBQ3JDLGtCQUFrQixDQUFBO0lBQ2hCLDBCQUEwQjtJQUMxQix1QkFBdUIsQ0FBQyxFQUFDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsMEJBQTBCLEVBQUM7SUFDMUYsc0JBQXNCO0lBQ3RCLFNBQVM7SUFDVCx1QkFBdUIsQ0FBQyxFQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLHNCQUFzQixFQUFDO0lBQ3BGLHVCQUF1QixDQUFDLEVBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsc0JBQXNCLEVBQUM7SUFDcEYsdUJBQXVCLENBQUMsRUFBQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsUUFBUSxFQUFFLHVCQUF1QixFQUFDO0NBQzdGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1R5cGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0FQUF9JRF9SQU5ET01fUFJPVklERVJ9IGZyb20gJy4vYXBwbGljYXRpb25fdG9rZW5zJztcbmltcG9ydCB7QVBQTElDQVRJT05fQ09SRV9QUk9WSURFUlN9IGZyb20gJy4vYXBwbGljYXRpb25fcmVmJztcbmltcG9ydCB7XG4gIEl0ZXJhYmxlRGlmZmVycyxcbiAgZGVmYXVsdEl0ZXJhYmxlRGlmZmVycyxcbiAgS2V5VmFsdWVEaWZmZXJzLFxuICBkZWZhdWx0S2V5VmFsdWVEaWZmZXJzXG59IGZyb20gJy4vY2hhbmdlX2RldGVjdGlvbi9jaGFuZ2VfZGV0ZWN0aW9uJztcbmltcG9ydCB7Vmlld1V0aWxzfSBmcm9tIFwiLi9saW5rZXIvdmlld191dGlsc1wiO1xuaW1wb3J0IHtDb21wb25lbnRSZXNvbHZlciwgUmVmbGVjdG9yQ29tcG9uZW50UmVzb2x2ZXJ9IGZyb20gJy4vbGlua2VyL2NvbXBvbmVudF9yZXNvbHZlcic7XG5pbXBvcnQge0R5bmFtaWNDb21wb25lbnRMb2FkZXIsIER5bmFtaWNDb21wb25lbnRMb2FkZXJffSBmcm9tICcuL2xpbmtlci9keW5hbWljX2NvbXBvbmVudF9sb2FkZXInO1xuXG5sZXQgX191bnVzZWQ6IFR5cGU7ICAvLyBhdm9pZCB1bnVzZWQgaW1wb3J0IHdoZW4gVHlwZSB1bmlvbiB0eXBlcyBhcmUgZXJhc2VkXG5cbi8qKlxuICogQSBkZWZhdWx0IHNldCBvZiBwcm92aWRlcnMgd2hpY2ggc2hvdWxkIGJlIGluY2x1ZGVkIGluIGFueSBBbmd1bGFyXG4gKiBhcHBsaWNhdGlvbiwgcmVnYXJkbGVzcyBvZiB0aGUgcGxhdGZvcm0gaXQgcnVucyBvbnRvLlxuICovXG5leHBvcnQgY29uc3QgQVBQTElDQVRJT05fQ09NTU9OX1BST1ZJREVSUzogQXJyYXk8VHlwZSB8IHtbazogc3RyaW5nXTogYW55fSB8IGFueVtdPiA9XG4gICAgLypAdHMyZGFydF9jb25zdCovW1xuICAgICAgQVBQTElDQVRJT05fQ09SRV9QUk9WSURFUlMsXG4gICAgICAvKiBAdHMyZGFydF9Qcm92aWRlciAqLyB7cHJvdmlkZTogQ29tcG9uZW50UmVzb2x2ZXIsIHVzZUNsYXNzOiBSZWZsZWN0b3JDb21wb25lbnRSZXNvbHZlcn0sXG4gICAgICBBUFBfSURfUkFORE9NX1BST1ZJREVSLFxuICAgICAgVmlld1V0aWxzLFxuICAgICAgLyogQHRzMmRhcnRfUHJvdmlkZXIgKi8ge3Byb3ZpZGU6IEl0ZXJhYmxlRGlmZmVycywgdXNlVmFsdWU6IGRlZmF1bHRJdGVyYWJsZURpZmZlcnN9LFxuICAgICAgLyogQHRzMmRhcnRfUHJvdmlkZXIgKi8ge3Byb3ZpZGU6IEtleVZhbHVlRGlmZmVycywgdXNlVmFsdWU6IGRlZmF1bHRLZXlWYWx1ZURpZmZlcnN9LFxuICAgICAgLyogQHRzMmRhcnRfUHJvdmlkZXIgKi8ge3Byb3ZpZGU6IER5bmFtaWNDb21wb25lbnRMb2FkZXIsIHVzZUNsYXNzOiBEeW5hbWljQ29tcG9uZW50TG9hZGVyX31cbiAgICBdO1xuIl19