/**
 * @module
 * @description
 * Alternative implementation of the router. Experimental.
 */
export { Router, RouterOutletMap } from './src/alt_router/router';
export { RouteSegment, UrlSegment, Tree, UrlTree, RouteTree } from './src/alt_router/segments';
export { Routes } from './src/alt_router/metadata/decorators';
export { Route } from './src/alt_router/metadata/metadata';
export { RouterUrlSerializer, DefaultRouterUrlSerializer } from './src/alt_router/router_url_serializer';
export { ROUTER_PROVIDERS } from './src/alt_router/router_providers';
import { RouterOutlet } from './src/alt_router/directives/router_outlet';
import { RouterLink } from './src/alt_router/directives/router_link';
export const ROUTER_DIRECTIVES = [RouterOutlet, RouterLink];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWx0X3JvdXRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtVVcwQWJXTnYudG1wL2FuZ3VsYXIyL2FsdF9yb3V0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILFNBQVEsTUFBTSxFQUFFLGVBQWUsUUFBTyx5QkFBeUIsQ0FBQztBQUNoRSxTQUFRLFlBQVksRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxTQUFTLFFBQU8sMkJBQTJCLENBQUM7QUFDN0YsU0FBUSxNQUFNLFFBQU8sc0NBQXNDLENBQUM7QUFDNUQsU0FBUSxLQUFLLFFBQU8sb0NBQW9DLENBQUM7QUFDekQsU0FDRSxtQkFBbUIsRUFDbkIsMEJBQTBCLFFBQ3JCLHdDQUF3QyxDQUFDO0FBRWhELFNBQVEsZ0JBQWdCLFFBQU8sbUNBQW1DLENBQUM7T0FFNUQsRUFBQyxZQUFZLEVBQUMsTUFBTSwyQ0FBMkM7T0FDL0QsRUFBQyxVQUFVLEVBQUMsTUFBTSx5Q0FBeUM7QUFFbEUsT0FBTyxNQUFNLGlCQUFpQixHQUE0QixDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQG1vZHVsZVxuICogQGRlc2NyaXB0aW9uXG4gKiBBbHRlcm5hdGl2ZSBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgcm91dGVyLiBFeHBlcmltZW50YWwuXG4gKi9cblxuZXhwb3J0IHtSb3V0ZXIsIFJvdXRlck91dGxldE1hcH0gZnJvbSAnLi9zcmMvYWx0X3JvdXRlci9yb3V0ZXInO1xuZXhwb3J0IHtSb3V0ZVNlZ21lbnQsIFVybFNlZ21lbnQsIFRyZWUsIFVybFRyZWUsIFJvdXRlVHJlZX0gZnJvbSAnLi9zcmMvYWx0X3JvdXRlci9zZWdtZW50cyc7XG5leHBvcnQge1JvdXRlc30gZnJvbSAnLi9zcmMvYWx0X3JvdXRlci9tZXRhZGF0YS9kZWNvcmF0b3JzJztcbmV4cG9ydCB7Um91dGV9IGZyb20gJy4vc3JjL2FsdF9yb3V0ZXIvbWV0YWRhdGEvbWV0YWRhdGEnO1xuZXhwb3J0IHtcbiAgUm91dGVyVXJsU2VyaWFsaXplcixcbiAgRGVmYXVsdFJvdXRlclVybFNlcmlhbGl6ZXJcbn0gZnJvbSAnLi9zcmMvYWx0X3JvdXRlci9yb3V0ZXJfdXJsX3NlcmlhbGl6ZXInO1xuZXhwb3J0IHtPbkFjdGl2YXRlLCBDYW5EZWFjdGl2YXRlfSBmcm9tICcuL3NyYy9hbHRfcm91dGVyL2ludGVyZmFjZXMnO1xuZXhwb3J0IHtST1VURVJfUFJPVklERVJTfSBmcm9tICcuL3NyYy9hbHRfcm91dGVyL3JvdXRlcl9wcm92aWRlcnMnO1xuXG5pbXBvcnQge1JvdXRlck91dGxldH0gZnJvbSAnLi9zcmMvYWx0X3JvdXRlci9kaXJlY3RpdmVzL3JvdXRlcl9vdXRsZXQnO1xuaW1wb3J0IHtSb3V0ZXJMaW5rfSBmcm9tICcuL3NyYy9hbHRfcm91dGVyL2RpcmVjdGl2ZXMvcm91dGVyX2xpbmsnO1xuXG5leHBvcnQgY29uc3QgUk9VVEVSX0RJUkVDVElWRVM6IGFueVtdID0gLypAdHMyZGFydF9jb25zdCovW1JvdXRlck91dGxldCwgUm91dGVyTGlua107XG4iXX0=