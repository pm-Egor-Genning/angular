import { IS_DART, StringWrapper, isBlank, isArray, isStrictStringMap, isPrimitive } from 'angular2/src/facade/lang';
import { StringMapWrapper } from 'angular2/src/facade/collection';
export var MODULE_SUFFIX = IS_DART ? '.dart' : '';
var CAMEL_CASE_REGEXP = /([A-Z])/g;
var DASH_CASE_REGEXP = /-([a-z])/g;
export function camelCaseToDashCase(input) {
    return StringWrapper.replaceAllMapped(input, CAMEL_CASE_REGEXP, (m) => { return '-' + m[1].toLowerCase(); });
}
export function dashCaseToCamelCase(input) {
    return StringWrapper.replaceAllMapped(input, DASH_CASE_REGEXP, (m) => { return m[1].toUpperCase(); });
}
export function splitAtColon(input, defaultValues) {
    var parts = StringWrapper.split(input.trim(), /\s*:\s*/g);
    if (parts.length > 1) {
        return parts;
    }
    else {
        return defaultValues;
    }
}
export function sanitizeIdentifier(name) {
    return StringWrapper.replaceAll(name, /\W/g, '_');
}
export function visitValue(value, visitor, context) {
    if (isArray(value)) {
        return visitor.visitArray(value, context);
    }
    else if (isStrictStringMap(value)) {
        return visitor.visitStringMap(value, context);
    }
    else if (isBlank(value) || isPrimitive(value)) {
        return visitor.visitPrimitive(value, context);
    }
    else {
        return visitor.visitOther(value, context);
    }
}
export class ValueTransformer {
    visitArray(arr, context) {
        return arr.map(value => visitValue(value, this, context));
    }
    visitStringMap(map, context) {
        var result = {};
        StringMapWrapper.forEach(map, (value, key) => { result[key] = visitValue(value, this, context); });
        return result;
    }
    visitPrimitive(value, context) { return value; }
    visitOther(value, context) { return value; }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtVVcwQWJXTnYudG1wL2FuZ3VsYXIyL3NyYy9jb21waWxlci91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJPQUFPLEVBQ0wsT0FBTyxFQUNQLGFBQWEsRUFFYixPQUFPLEVBQ1AsT0FBTyxFQUNQLGlCQUFpQixFQUNqQixXQUFXLEVBQ1osTUFBTSwwQkFBMEI7T0FDMUIsRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGdDQUFnQztBQUUvRCxPQUFPLElBQUksYUFBYSxHQUFHLE9BQU8sR0FBRyxPQUFPLEdBQUcsRUFBRSxDQUFDO0FBRWxELElBQUksaUJBQWlCLEdBQUcsVUFBVSxDQUFDO0FBQ25DLElBQUksZ0JBQWdCLEdBQUcsV0FBVyxDQUFDO0FBRW5DLG9DQUFvQyxLQUFhO0lBQy9DLE1BQU0sQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLGlCQUFpQixFQUN4QixDQUFDLENBQUMsT0FBTyxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3JGLENBQUM7QUFFRCxvQ0FBb0MsS0FBYTtJQUMvQyxNQUFNLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxnQkFBZ0IsRUFDdkIsQ0FBQyxDQUFDLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9FLENBQUM7QUFFRCw2QkFBNkIsS0FBYSxFQUFFLGFBQXVCO0lBQ2pFLElBQUksS0FBSyxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQzFELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQixNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sTUFBTSxDQUFDLGFBQWEsQ0FBQztJQUN2QixDQUFDO0FBQ0gsQ0FBQztBQUVELG1DQUFtQyxJQUFZO0lBQzdDLE1BQU0sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDcEQsQ0FBQztBQUVELDJCQUEyQixLQUFVLEVBQUUsT0FBcUIsRUFBRSxPQUFZO0lBQ3hFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQVEsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUF1QixLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoRCxNQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzVDLENBQUM7QUFDSCxDQUFDO0FBU0Q7SUFDRSxVQUFVLENBQUMsR0FBVSxFQUFFLE9BQVk7UUFDakMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLFVBQVUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUNELGNBQWMsQ0FBQyxHQUF5QixFQUFFLE9BQVk7UUFDcEQsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQ0gsQ0FBQyxLQUFLLEVBQUUsR0FBRyxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxVQUFVLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlGLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUNELGNBQWMsQ0FBQyxLQUFVLEVBQUUsT0FBWSxJQUFTLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQy9ELFVBQVUsQ0FBQyxLQUFVLEVBQUUsT0FBWSxJQUFTLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQzdELENBQUM7QUFBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIElTX0RBUlQsXG4gIFN0cmluZ1dyYXBwZXIsXG4gIE1hdGgsXG4gIGlzQmxhbmssXG4gIGlzQXJyYXksXG4gIGlzU3RyaWN0U3RyaW5nTWFwLFxuICBpc1ByaW1pdGl2ZVxufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtTdHJpbmdNYXBXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuXG5leHBvcnQgdmFyIE1PRFVMRV9TVUZGSVggPSBJU19EQVJUID8gJy5kYXJ0JyA6ICcnO1xuXG52YXIgQ0FNRUxfQ0FTRV9SRUdFWFAgPSAvKFtBLVpdKS9nO1xudmFyIERBU0hfQ0FTRV9SRUdFWFAgPSAvLShbYS16XSkvZztcblxuZXhwb3J0IGZ1bmN0aW9uIGNhbWVsQ2FzZVRvRGFzaENhc2UoaW5wdXQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBTdHJpbmdXcmFwcGVyLnJlcGxhY2VBbGxNYXBwZWQoaW5wdXQsIENBTUVMX0NBU0VfUkVHRVhQLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChtKSA9PiB7IHJldHVybiAnLScgKyBtWzFdLnRvTG93ZXJDYXNlKCk7IH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGFzaENhc2VUb0NhbWVsQ2FzZShpbnB1dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIFN0cmluZ1dyYXBwZXIucmVwbGFjZUFsbE1hcHBlZChpbnB1dCwgREFTSF9DQVNFX1JFR0VYUCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAobSkgPT4geyByZXR1cm4gbVsxXS50b1VwcGVyQ2FzZSgpOyB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNwbGl0QXRDb2xvbihpbnB1dDogc3RyaW5nLCBkZWZhdWx0VmFsdWVzOiBzdHJpbmdbXSk6IHN0cmluZ1tdIHtcbiAgdmFyIHBhcnRzID0gU3RyaW5nV3JhcHBlci5zcGxpdChpbnB1dC50cmltKCksIC9cXHMqOlxccyovZyk7XG4gIGlmIChwYXJ0cy5sZW5ndGggPiAxKSB7XG4gICAgcmV0dXJuIHBhcnRzO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBkZWZhdWx0VmFsdWVzO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzYW5pdGl6ZUlkZW50aWZpZXIobmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIFN0cmluZ1dyYXBwZXIucmVwbGFjZUFsbChuYW1lLCAvXFxXL2csICdfJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2aXNpdFZhbHVlKHZhbHVlOiBhbnksIHZpc2l0b3I6IFZhbHVlVmlzaXRvciwgY29udGV4dDogYW55KTogYW55IHtcbiAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRBcnJheSg8YW55W10+dmFsdWUsIGNvbnRleHQpO1xuICB9IGVsc2UgaWYgKGlzU3RyaWN0U3RyaW5nTWFwKHZhbHVlKSkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0U3RyaW5nTWFwKDx7W2tleTogc3RyaW5nXTogYW55fT52YWx1ZSwgY29udGV4dCk7XG4gIH0gZWxzZSBpZiAoaXNCbGFuayh2YWx1ZSkgfHwgaXNQcmltaXRpdmUodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRQcmltaXRpdmUodmFsdWUsIGNvbnRleHQpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0T3RoZXIodmFsdWUsIGNvbnRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVmFsdWVWaXNpdG9yIHtcbiAgdmlzaXRBcnJheShhcnI6IGFueVtdLCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0U3RyaW5nTWFwKG1hcDoge1trZXk6IHN0cmluZ106IGFueX0sIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRQcmltaXRpdmUodmFsdWU6IGFueSwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdE90aGVyKHZhbHVlOiBhbnksIGNvbnRleHQ6IGFueSk6IGFueTtcbn1cblxuZXhwb3J0IGNsYXNzIFZhbHVlVHJhbnNmb3JtZXIgaW1wbGVtZW50cyBWYWx1ZVZpc2l0b3Ige1xuICB2aXNpdEFycmF5KGFycjogYW55W10sIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIGFyci5tYXAodmFsdWUgPT4gdmlzaXRWYWx1ZSh2YWx1ZSwgdGhpcywgY29udGV4dCkpO1xuICB9XG4gIHZpc2l0U3RyaW5nTWFwKG1hcDoge1trZXk6IHN0cmluZ106IGFueX0sIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIFN0cmluZ01hcFdyYXBwZXIuZm9yRWFjaChtYXAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICh2YWx1ZSwga2V5KSA9PiB7IHJlc3VsdFtrZXldID0gdmlzaXRWYWx1ZSh2YWx1ZSwgdGhpcywgY29udGV4dCk7IH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgdmlzaXRQcmltaXRpdmUodmFsdWU6IGFueSwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIHZhbHVlOyB9XG4gIHZpc2l0T3RoZXIodmFsdWU6IGFueSwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIHZhbHVlOyB9XG59XG4iXX0=