import { isPresent, isBlank } from 'angular2/src/facade/lang';
import { BaseException } from 'angular2/src/facade/exceptions';
import { EmitterVisitorContext } from './abstract_emitter';
import { AbstractJsEmitterVisitor } from './abstract_js_emitter';
import { getImportModulePath, ImportEnv } from './path_util';
export class JavaScriptEmitter {
    constructor() {
    }
    emitStatements(moduleUrl, stmts, exportedVars) {
        var converter = new JsEmitterVisitor(moduleUrl);
        var ctx = EmitterVisitorContext.createRoot(exportedVars);
        converter.visitAllStatements(stmts, ctx);
        var srcParts = [];
        converter.importsWithPrefixes.forEach((prefix, importedModuleUrl) => {
            // Note: can't write the real word for import as it screws up system.js auto detection...
            srcParts.push(`var ${prefix} = req` +
                `uire('${getImportModulePath(moduleUrl, importedModuleUrl, ImportEnv.JS)}');`);
        });
        srcParts.push(ctx.toSource());
        return srcParts.join('\n');
    }
}
class JsEmitterVisitor extends AbstractJsEmitterVisitor {
    constructor(_moduleUrl) {
        super();
        this._moduleUrl = _moduleUrl;
        this.importsWithPrefixes = new Map();
    }
    visitExternalExpr(ast, ctx) {
        if (isBlank(ast.value.name)) {
            throw new BaseException(`Internal error: unknown identifier ${ast.value}`);
        }
        if (isPresent(ast.value.moduleUrl) && ast.value.moduleUrl != this._moduleUrl) {
            var prefix = this.importsWithPrefixes.get(ast.value.moduleUrl);
            if (isBlank(prefix)) {
                prefix = `import${this.importsWithPrefixes.size}`;
                this.importsWithPrefixes.set(ast.value.moduleUrl, prefix);
            }
            ctx.print(`${prefix}.`);
        }
        ctx.print(ast.value.name);
        return null;
    }
    visitDeclareVarStmt(stmt, ctx) {
        super.visitDeclareVarStmt(stmt, ctx);
        if (ctx.isExportedVar(stmt.name)) {
            ctx.println(exportVar(stmt.name));
        }
        return null;
    }
    visitDeclareFunctionStmt(stmt, ctx) {
        super.visitDeclareFunctionStmt(stmt, ctx);
        if (ctx.isExportedVar(stmt.name)) {
            ctx.println(exportVar(stmt.name));
        }
        return null;
    }
    visitDeclareClassStmt(stmt, ctx) {
        super.visitDeclareClassStmt(stmt, ctx);
        if (ctx.isExportedVar(stmt.name)) {
            ctx.println(exportVar(stmt.name));
        }
        return null;
    }
}
function exportVar(varName) {
    return `Object.defineProperty(exports, '${varName}', { get: function() { return ${varName}; }});`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNfZW1pdHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtd1hFSTM3ZlIudG1wL2FuZ3VsYXIyL3NyYy9jb21waWxlci9vdXRwdXQvanNfZW1pdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiT0FDTyxFQUNMLFNBQVMsRUFDVCxPQUFPLEVBS1IsTUFBTSwwQkFBMEI7T0FDMUIsRUFBQyxhQUFhLEVBQUMsTUFBTSxnQ0FBZ0M7T0FDckQsRUFBZ0IscUJBQXFCLEVBQUMsTUFBTSxvQkFBb0I7T0FDaEUsRUFBQyx3QkFBd0IsRUFBQyxNQUFNLHVCQUF1QjtPQUN2RCxFQUFDLG1CQUFtQixFQUFFLFNBQVMsRUFBQyxNQUFNLGFBQWE7QUFFMUQ7SUFDRTtJQUFlLENBQUM7SUFDaEIsY0FBYyxDQUFDLFNBQWlCLEVBQUUsS0FBb0IsRUFBRSxZQUFzQjtRQUM1RSxJQUFJLFNBQVMsR0FBRyxJQUFJLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hELElBQUksR0FBRyxHQUFHLHFCQUFxQixDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN6RCxTQUFTLENBQUMsa0JBQWtCLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3pDLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNsQixTQUFTLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLGlCQUFpQjtZQUM5RCx5RkFBeUY7WUFDekYsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLE1BQU0sUUFBUTtnQkFDckIsU0FBUyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvRixDQUFDLENBQUMsQ0FBQztRQUNILFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7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QUVELG1CQUFtQixPQUFlO0lBQ2hDLE1BQU0sQ0FBQyxtQ0FBbUMsT0FBTyxpQ0FBaUMsT0FBTyxRQUFRLENBQUM7QUFDcEcsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIG8gZnJvbSAnLi9vdXRwdXRfYXN0JztcbmltcG9ydCB7XG4gIGlzUHJlc2VudCxcbiAgaXNCbGFuayxcbiAgaXNTdHJpbmcsXG4gIGV2YWxFeHByZXNzaW9uLFxuICBSZWdFeHBXcmFwcGVyLFxuICBTdHJpbmdXcmFwcGVyXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge091dHB1dEVtaXR0ZXIsIEVtaXR0ZXJWaXNpdG9yQ29udGV4dH0gZnJvbSAnLi9hYnN0cmFjdF9lbWl0dGVyJztcbmltcG9ydCB7QWJzdHJhY3RKc0VtaXR0ZXJWaXNpdG9yfSBmcm9tICcuL2Fic3RyYWN0X2pzX2VtaXR0ZXInO1xuaW1wb3J0IHtnZXRJbXBvcnRNb2R1bGVQYXRoLCBJbXBvcnRFbnZ9IGZyb20gJy4vcGF0aF91dGlsJztcblxuZXhwb3J0IGNsYXNzIEphdmFTY3JpcHRFbWl0dGVyIGltcGxlbWVudHMgT3V0cHV0RW1pdHRlciB7XG4gIGNvbnN0cnVjdG9yKCkge31cbiAgZW1pdFN0YXRlbWVudHMobW9kdWxlVXJsOiBzdHJpbmcsIHN0bXRzOiBvLlN0YXRlbWVudFtdLCBleHBvcnRlZFZhcnM6IHN0cmluZ1tdKTogc3RyaW5nIHtcbiAgICB2YXIgY29udmVydGVyID0gbmV3IEpzRW1pdHRlclZpc2l0b3IobW9kdWxlVXJsKTtcbiAgICB2YXIgY3R4ID0gRW1pdHRlclZpc2l0b3JDb250ZXh0LmNyZWF0ZVJvb3QoZXhwb3J0ZWRWYXJzKTtcbiAgICBjb252ZXJ0ZXIudmlzaXRBbGxTdGF0ZW1lbnRzKHN0bXRzLCBjdHgpO1xuICAgIHZhciBzcmNQYXJ0cyA9IFtdO1xuICAgIGNvbnZlcnRlci5pbXBvcnRzV2l0aFByZWZpeGVzLmZvckVhY2goKHByZWZpeCwgaW1wb3J0ZWRNb2R1bGVVcmwpID0+IHtcbiAgICAgIC8vIE5vdGU6IGNhbid0IHdyaXRlIHRoZSByZWFsIHdvcmQgZm9yIGltcG9ydCBhcyBpdCBzY3Jld3MgdXAgc3lzdGVtLmpzIGF1dG8gZGV0ZWN0aW9uLi4uXG4gICAgICBzcmNQYXJ0cy5wdXNoKGB2YXIgJHtwcmVmaXh9ID0gcmVxYCArXG4gICAgICAgICAgICAgICAgICAgIGB1aXJlKCcke2dldEltcG9ydE1vZHVsZVBhdGgobW9kdWxlVXJsLCBpbXBvcnRlZE1vZHVsZVVybCwgSW1wb3J0RW52LkpTKX0nKTtgKTtcbiAgICB9KTtcbiAgICBzcmNQYXJ0cy5wdXNoKGN0eC50b1NvdXJjZSgpKTtcbiAgICByZXR1cm4gc3JjUGFydHMuam9pbignXFxuJyk7XG4gIH1cbn1cblxuY2xhc3MgSnNFbWl0dGVyVmlzaXRvciBleHRlbmRzIEFic3RyYWN0SnNFbWl0dGVyVmlzaXRvciB7XG4gIGltcG9ydHNXaXRoUHJlZml4ZXMgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX21vZHVsZVVybDogc3RyaW5nKSB7IHN1cGVyKCk7IH1cblxuICB2aXNpdEV4dGVybmFsRXhwcihhc3Q6IG8uRXh0ZXJuYWxFeHByLCBjdHg6IEVtaXR0ZXJWaXNpdG9yQ29udGV4dCk6IGFueSB7XG4gICAgaWYgKGlzQmxhbmsoYXN0LnZhbHVlLm5hbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihgSW50ZXJuYWwgZXJyb3I6IHVua25vd24gaWRlbnRpZmllciAke2FzdC52YWx1ZX1gKTtcbiAgICB9XG4gICAgaWYgKGlzUHJlc2VudChhc3QudmFsdWUubW9kdWxlVXJsKSAmJiBhc3QudmFsdWUubW9kdWxlVXJsICE9IHRoaXMuX21vZHVsZVVybCkge1xuICAgICAgdmFyIHByZWZpeCA9IHRoaXMuaW1wb3J0c1dpdGhQcmVmaXhlcy5nZXQoYXN0LnZhbHVlLm1vZHVsZVVybCk7XG4gICAgICBpZiAoaXNCbGFuayhwcmVmaXgpKSB7XG4gICAgICAgIHByZWZpeCA9IGBpbXBvcnQke3RoaXMuaW1wb3J0c1dpdGhQcmVmaXhlcy5zaXplfWA7XG4gICAgICAgIHRoaXMuaW1wb3J0c1dpdGhQcmVmaXhlcy5zZXQoYXN0LnZhbHVlLm1vZHVsZVVybCwgcHJlZml4KTtcbiAgICAgIH1cbiAgICAgIGN0eC5wcmludChgJHtwcmVmaXh9LmApO1xuICAgIH1cbiAgICBjdHgucHJpbnQoYXN0LnZhbHVlLm5hbWUpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHZpc2l0RGVjbGFyZVZhclN0bXQoc3RtdDogby5EZWNsYXJlVmFyU3RtdCwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpOiBhbnkge1xuICAgIHN1cGVyLnZpc2l0RGVjbGFyZVZhclN0bXQoc3RtdCwgY3R4KTtcbiAgICBpZiAoY3R4LmlzRXhwb3J0ZWRWYXIoc3RtdC5uYW1lKSkge1xuICAgICAgY3R4LnByaW50bG4oZXhwb3J0VmFyKHN0bXQubmFtZSkpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICB2aXNpdERlY2xhcmVGdW5jdGlvblN0bXQoc3RtdDogby5EZWNsYXJlRnVuY3Rpb25TdG10LCBjdHg6IEVtaXR0ZXJWaXNpdG9yQ29udGV4dCk6IGFueSB7XG4gICAgc3VwZXIudmlzaXREZWNsYXJlRnVuY3Rpb25TdG10KHN0bXQsIGN0eCk7XG4gICAgaWYgKGN0eC5pc0V4cG9ydGVkVmFyKHN0bXQubmFtZSkpIHtcbiAgICAgIGN0eC5wcmludGxuKGV4cG9ydFZhcihzdG10Lm5hbWUpKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmlzaXREZWNsYXJlQ2xhc3NTdG10KHN0bXQ6IG8uQ2xhc3NTdG10LCBjdHg6IEVtaXR0ZXJWaXNpdG9yQ29udGV4dCk6IGFueSB7XG4gICAgc3VwZXIudmlzaXREZWNsYXJlQ2xhc3NTdG10KHN0bXQsIGN0eCk7XG4gICAgaWYgKGN0eC5pc0V4cG9ydGVkVmFyKHN0bXQubmFtZSkpIHtcbiAgICAgIGN0eC5wcmludGxuKGV4cG9ydFZhcihzdG10Lm5hbWUpKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuZnVuY3Rpb24gZXhwb3J0VmFyKHZhck5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICcke3Zhck5hbWV9JywgeyBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gJHt2YXJOYW1lfTsgfX0pO2A7XG59XG4iXX0=