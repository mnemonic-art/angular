'use strict';"use strict";
var compile_metadata_1 = require('./compile_metadata');
var exceptions_1 = require('angular2/src/facade/exceptions');
var collection_1 = require('angular2/src/facade/collection');
var o = require('./output/output_ast');
var component_factory_1 = require('angular2/src/core/linker/component_factory');
var util_1 = require('./util');
var _COMPONENT_FACTORY_IDENTIFIER = new compile_metadata_1.CompileIdentifierMetadata({
    name: 'ComponentFactory',
    runtime: component_factory_1.ComponentFactory,
    moduleUrl: "asset:angular2/lib/src/core/linker/component_factory" + util_1.MODULE_SUFFIX
});
var SourceModule = (function () {
    function SourceModule(moduleUrl, source) {
        this.moduleUrl = moduleUrl;
        this.source = source;
    }
    return SourceModule;
}());
exports.SourceModule = SourceModule;
var NormalizedComponentWithViewDirectives = (function () {
    function NormalizedComponentWithViewDirectives(component, directives, pipes) {
        this.component = component;
        this.directives = directives;
        this.pipes = pipes;
    }
    return NormalizedComponentWithViewDirectives;
}());
exports.NormalizedComponentWithViewDirectives = NormalizedComponentWithViewDirectives;
var OfflineCompiler = (function () {
    function OfflineCompiler(_directiveNormalizer, _templateParser, _styleCompiler, _viewCompiler, _outputEmitter) {
        this._directiveNormalizer = _directiveNormalizer;
        this._templateParser = _templateParser;
        this._styleCompiler = _styleCompiler;
        this._viewCompiler = _viewCompiler;
        this._outputEmitter = _outputEmitter;
    }
    OfflineCompiler.prototype.normalizeDirectiveMetadata = function (directive) {
        return this._directiveNormalizer.normalizeDirective(directive);
    };
    OfflineCompiler.prototype.compileTemplates = function (components) {
        var _this = this;
        if (components.length === 0) {
            throw new exceptions_1.BaseException('No components given');
        }
        var statements = [];
        var exportedVars = [];
        var moduleUrl = _templateModuleUrl(components[0].component);
        components.forEach(function (componentWithDirs) {
            var compMeta = componentWithDirs.component;
            _assertComponent(compMeta);
            var compViewFactoryVar = _this._compileComponent(compMeta, componentWithDirs.directives, componentWithDirs.pipes, statements);
            exportedVars.push(compViewFactoryVar);
            var hostMeta = compile_metadata_1.createHostComponentMeta(compMeta.type, compMeta.selector);
            var hostViewFactoryVar = _this._compileComponent(hostMeta, [compMeta], [], statements);
            var compFactoryVar = compMeta.type.name + "NgFactory";
            statements.push(o.variable(compFactoryVar)
                .set(o.importExpr(_COMPONENT_FACTORY_IDENTIFIER, [o.importType(compMeta.type)])
                .instantiate([
                o.literal(compMeta.selector),
                o.variable(hostViewFactoryVar),
                o.importExpr(compMeta.type)
            ], o.importType(_COMPONENT_FACTORY_IDENTIFIER, [o.importType(compMeta.type)], [o.TypeModifier.Const])))
                .toDeclStmt(null, [o.StmtModifier.Final]));
            exportedVars.push(compFactoryVar);
        });
        return this._codegenSourceModule(moduleUrl, statements, exportedVars);
    };
    OfflineCompiler.prototype.compileStylesheet = function (stylesheetUrl, cssText) {
        var plainStyles = this._styleCompiler.compileStylesheet(stylesheetUrl, cssText, false);
        var shimStyles = this._styleCompiler.compileStylesheet(stylesheetUrl, cssText, true);
        return [
            this._codegenSourceModule(_stylesModuleUrl(stylesheetUrl, false), _resolveStyleStatements(plainStyles), [plainStyles.stylesVar]),
            this._codegenSourceModule(_stylesModuleUrl(stylesheetUrl, true), _resolveStyleStatements(shimStyles), [shimStyles.stylesVar])
        ];
    };
    OfflineCompiler.prototype._compileComponent = function (compMeta, directives, pipes, targetStatements) {
        var styleResult = this._styleCompiler.compileComponent(compMeta);
        var parsedTemplate = this._templateParser.parse(compMeta, compMeta.template.template, directives, pipes, compMeta.type.name);
        var viewResult = this._viewCompiler.compileComponent(compMeta, parsedTemplate, o.variable(styleResult.stylesVar), pipes);
        collection_1.ListWrapper.addAll(targetStatements, _resolveStyleStatements(styleResult));
        collection_1.ListWrapper.addAll(targetStatements, _resolveViewStatements(viewResult));
        return viewResult.viewFactoryVar;
    };
    OfflineCompiler.prototype._codegenSourceModule = function (moduleUrl, statements, exportedVars) {
        return new SourceModule(moduleUrl, this._outputEmitter.emitStatements(moduleUrl, statements, exportedVars));
    };
    return OfflineCompiler;
}());
exports.OfflineCompiler = OfflineCompiler;
function _resolveViewStatements(compileResult) {
    compileResult.dependencies.forEach(function (dep) { dep.factoryPlaceholder.moduleUrl = _templateModuleUrl(dep.comp); });
    return compileResult.statements;
}
function _resolveStyleStatements(compileResult) {
    compileResult.dependencies.forEach(function (dep) {
        dep.valuePlaceholder.moduleUrl = _stylesModuleUrl(dep.sourceUrl, dep.isShimmed);
    });
    return compileResult.statements;
}
function _templateModuleUrl(comp) {
    var moduleUrl = comp.type.moduleUrl;
    var urlWithoutSuffix = moduleUrl.substring(0, moduleUrl.length - util_1.MODULE_SUFFIX.length);
    return urlWithoutSuffix + ".ngfactory" + util_1.MODULE_SUFFIX;
}
function _stylesModuleUrl(stylesheetUrl, shim) {
    return shim ? stylesheetUrl + ".shim" + util_1.MODULE_SUFFIX : "" + stylesheetUrl + util_1.MODULE_SUFFIX;
}
function _assertComponent(meta) {
    if (!meta.isComponent) {
        throw new exceptions_1.BaseException("Could not compile '" + meta.type.name + "' because it is not a component.");
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2ZmbGluZV9jb21waWxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtRDN0RWJYOVgudG1wL2FuZ3VsYXIyL3NyYy9jb21waWxlci9vZmZsaW5lX2NvbXBpbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQ0FLTyxvQkFBb0IsQ0FBQyxDQUFBO0FBRTVCLDJCQUEyQyxnQ0FBZ0MsQ0FBQyxDQUFBO0FBQzVFLDJCQUEwQixnQ0FBZ0MsQ0FBQyxDQUFBO0FBTTNELElBQVksQ0FBQyxXQUFNLHFCQUFxQixDQUFDLENBQUE7QUFDekMsa0NBQStCLDRDQUE0QyxDQUFDLENBQUE7QUFFNUUscUJBRU8sUUFBUSxDQUFDLENBQUE7QUFFaEIsSUFBSSw2QkFBNkIsR0FBRyxJQUFJLDRDQUF5QixDQUFDO0lBQ2hFLElBQUksRUFBRSxrQkFBa0I7SUFDeEIsT0FBTyxFQUFFLG9DQUFnQjtJQUN6QixTQUFTLEVBQUUseURBQXVELG9CQUFlO0NBQ2xGLENBQUMsQ0FBQztBQUVIO0lBQ0Usc0JBQW1CLFNBQWlCLEVBQVMsTUFBYztRQUF4QyxjQUFTLEdBQVQsU0FBUyxDQUFRO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtJQUFHLENBQUM7SUFDakUsbUJBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQztBQUZZLG9CQUFZLGVBRXhCLENBQUE7QUFFRDtJQUNFLCtDQUFtQixTQUFtQyxFQUNuQyxVQUFzQyxFQUFTLEtBQTRCO1FBRDNFLGNBQVMsR0FBVCxTQUFTLENBQTBCO1FBQ25DLGVBQVUsR0FBVixVQUFVLENBQTRCO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBdUI7SUFBRyxDQUFDO0lBQ3BHLDRDQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7QUFIWSw2Q0FBcUMsd0NBR2pELENBQUE7QUFFRDtJQUNFLHlCQUFvQixvQkFBeUMsRUFDekMsZUFBK0IsRUFBVSxjQUE2QixFQUN0RSxhQUEyQixF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LEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLE1BQU0sR0FBRyxvQkFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZGLE1BQU0sQ0FBSSxnQkFBZ0Isa0JBQWEsb0JBQWUsQ0FBQztBQUN6RCxDQUFDO0FBRUQsMEJBQTBCLGFBQXFCLEVBQUUsSUFBYTtJQUM1RCxNQUFNLENBQUMsSUFBSSxHQUFNLGFBQWEsYUFBUSxvQkFBZSxHQUFHLEtBQUcsYUFBYSxHQUFHLG9CQUFlLENBQUM7QUFDN0YsQ0FBQztBQUVELDBCQUEwQixJQUE4QjtJQUN0RCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLE1BQU0sSUFBSSwwQkFBYSxDQUFDLHdCQUFzQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUkscUNBQWtDLENBQUMsQ0FBQztJQUNsRyxDQUFDO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSxcbiAgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSxcbiAgQ29tcGlsZVBpcGVNZXRhZGF0YSxcbiAgY3JlYXRlSG9zdENvbXBvbmVudE1ldGFcbn0gZnJvbSAnLi9jb21waWxlX21ldGFkYXRhJztcblxuaW1wb3J0IHtCYXNlRXhjZXB0aW9uLCB1bmltcGxlbWVudGVkfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtMaXN0V3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7U3R5bGVDb21waWxlciwgU3R5bGVzQ29tcGlsZURlcGVuZGVuY3ksIFN0eWxlc0NvbXBpbGVSZXN1bHR9IGZyb20gJy4vc3R5bGVfY29tcGlsZXInO1xuaW1wb3J0IHtWaWV3Q29tcGlsZXIsIFZpZXdDb21waWxlUmVzdWx0fSBmcm9tICcuL3ZpZXdfY29tcGlsZXIvdmlld19jb21waWxlcic7XG5pbXBvcnQge1RlbXBsYXRlUGFyc2VyfSBmcm9tICcuL3RlbXBsYXRlX3BhcnNlcic7XG5pbXBvcnQge0RpcmVjdGl2ZU5vcm1hbGl6ZXJ9IGZyb20gJy4vZGlyZWN0aXZlX25vcm1hbGl6ZXInO1xuaW1wb3J0IHtPdXRwdXRFbWl0dGVyfSBmcm9tICcuL291dHB1dC9hYnN0cmFjdF9lbWl0dGVyJztcbmltcG9ydCAqIGFzIG8gZnJvbSAnLi9vdXRwdXQvb3V0cHV0X2FzdCc7XG5pbXBvcnQge0NvbXBvbmVudEZhY3Rvcnl9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci9jb21wb25lbnRfZmFjdG9yeSc7XG5cbmltcG9ydCB7XG4gIE1PRFVMRV9TVUZGSVgsXG59IGZyb20gJy4vdXRpbCc7XG5cbnZhciBfQ09NUE9ORU5UX0ZBQ1RPUllfSURFTlRJRklFUiA9IG5ldyBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhKHtcbiAgbmFtZTogJ0NvbXBvbmVudEZhY3RvcnknLFxuICBydW50aW1lOiBDb21wb25lbnRGYWN0b3J5LFxuICBtb2R1bGVVcmw6IGBhc3NldDphbmd1bGFyMi9saWIvc3JjL2NvcmUvbGlua2VyL2NvbXBvbmVudF9mYWN0b3J5JHtNT0RVTEVfU1VGRklYfWBcbn0pO1xuXG5leHBvcnQgY2xhc3MgU291cmNlTW9kdWxlIHtcbiAgY29uc3RydWN0b3IocHVibGljIG1vZHVsZVVybDogc3RyaW5nLCBwdWJsaWMgc291cmNlOiBzdHJpbmcpIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBOb3JtYWxpemVkQ29tcG9uZW50V2l0aFZpZXdEaXJlY3RpdmVzIHtcbiAgY29uc3RydWN0b3IocHVibGljIGNvbXBvbmVudDogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhLFxuICAgICAgICAgICAgICBwdWJsaWMgZGlyZWN0aXZlczogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhW10sIHB1YmxpYyBwaXBlczogQ29tcGlsZVBpcGVNZXRhZGF0YVtdKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgT2ZmbGluZUNvbXBpbGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZGlyZWN0aXZlTm9ybWFsaXplcjogRGlyZWN0aXZlTm9ybWFsaXplcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfdGVtcGxhdGVQYXJzZXI6IFRlbXBsYXRlUGFyc2VyLCBwcml2YXRlIF9zdHlsZUNvbXBpbGVyOiBTdHlsZUNvbXBpbGVyLFxuICAgICAgICAgICAgICBwcml2YXRlIF92aWV3Q29tcGlsZXI6IFZpZXdDb21waWxlciwgcHJpdmF0ZSBfb3V0cHV0RW1pdHRlcjogT3V0cHV0RW1pdHRlcikge31cblxuICBub3JtYWxpemVEaXJlY3RpdmVNZXRhZGF0YShkaXJlY3RpdmU6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSk6XG4gICAgICBQcm9taXNlPENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YT4ge1xuICAgIHJldHVybiB0aGlzLl9kaXJlY3RpdmVOb3JtYWxpemVyLm5vcm1hbGl6ZURpcmVjdGl2ZShkaXJlY3RpdmUpO1xuICB9XG5cbiAgY29tcGlsZVRlbXBsYXRlcyhjb21wb25lbnRzOiBOb3JtYWxpemVkQ29tcG9uZW50V2l0aFZpZXdEaXJlY3RpdmVzW10pOiBTb3VyY2VNb2R1bGUge1xuICAgIGlmIChjb21wb25lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oJ05vIGNvbXBvbmVudHMgZ2l2ZW4nKTtcbiAgICB9XG4gICAgdmFyIHN0YXRlbWVudHMgPSBbXTtcbiAgICB2YXIgZXhwb3J0ZWRWYXJzID0gW107XG4gICAgdmFyIG1vZHVsZVVybCA9IF90ZW1wbGF0ZU1vZHVsZVVybChjb21wb25lbnRzWzBdLmNvbXBvbmVudCk7XG4gICAgY29tcG9uZW50cy5mb3JFYWNoKGNvbXBvbmVudFdpdGhEaXJzID0+IHtcbiAgICAgIHZhciBjb21wTWV0YSA9IDxDb21waWxlRGlyZWN0aXZlTWV0YWRhdGE+Y29tcG9uZW50V2l0aERpcnMuY29tcG9uZW50O1xuICAgICAgX2Fzc2VydENvbXBvbmVudChjb21wTWV0YSk7XG4gICAgICB2YXIgY29tcFZpZXdGYWN0b3J5VmFyID0gdGhpcy5fY29tcGlsZUNvbXBvbmVudChjb21wTWV0YSwgY29tcG9uZW50V2l0aERpcnMuZGlyZWN0aXZlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudFdpdGhEaXJzLnBpcGVzLCBzdGF0ZW1lbnRzKTtcbiAgICAgIGV4cG9ydGVkVmFycy5wdXNoKGNvbXBWaWV3RmFjdG9yeVZhcik7XG5cbiAgICAgIHZhciBob3N0TWV0YSA9IGNyZWF0ZUhvc3RDb21wb25lbnRNZXRhKGNvbXBNZXRhLnR5cGUsIGNvbXBNZXRhLnNlbGVjdG9yKTtcbiAgICAgIHZhciBob3N0Vmlld0ZhY3RvcnlWYXIgPSB0aGlzLl9jb21waWxlQ29tcG9uZW50KGhvc3RNZXRhLCBbY29tcE1ldGFdLCBbXSwgc3RhdGVtZW50cyk7XG4gICAgICB2YXIgY29tcEZhY3RvcnlWYXIgPSBgJHtjb21wTWV0YS50eXBlLm5hbWV9TmdGYWN0b3J5YDtcbiAgICAgIHN0YXRlbWVudHMucHVzaChcbiAgICAgICAgICBvLnZhcmlhYmxlKGNvbXBGYWN0b3J5VmFyKVxuICAgICAgICAgICAgICAuc2V0KG8uaW1wb3J0RXhwcihfQ09NUE9ORU5UX0ZBQ1RPUllfSURFTlRJRklFUiwgW28uaW1wb3J0VHlwZShjb21wTWV0YS50eXBlKV0pXG4gICAgICAgICAgICAgICAgICAgICAgIC5pbnN0YW50aWF0ZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgby5saXRlcmFsKGNvbXBNZXRhLnNlbGVjdG9yKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgby52YXJpYWJsZShob3N0Vmlld0ZhY3RvcnlWYXIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvLmltcG9ydEV4cHIoY29tcE1ldGEudHlwZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBvLmltcG9ydFR5cGUoX0NPTVBPTkVOVF9GQUNUT1JZX0lERU5USUZJRVIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW28uaW1wb3J0VHlwZShjb21wTWV0YS50eXBlKV0sIFtvLlR5cGVNb2RpZmllci5Db25zdF0pKSlcbiAgICAgICAgICAgICAgLnRvRGVjbFN0bXQobnVsbCwgW28uU3RtdE1vZGlmaWVyLkZpbmFsXSkpO1xuICAgICAgZXhwb3J0ZWRWYXJzLnB1c2goY29tcEZhY3RvcnlWYXIpO1xuICAgIH0pO1xuICAgIHJldHVybiB0aGlzLl9jb2RlZ2VuU291cmNlTW9kdWxlKG1vZHVsZVVybCwgc3RhdGVtZW50cywgZXhwb3J0ZWRWYXJzKTtcbiAgfVxuXG4gIGNvbXBpbGVTdHlsZXNoZWV0KHN0eWxlc2hlZXRVcmw6IHN0cmluZywgY3NzVGV4dDogc3RyaW5nKTogU291cmNlTW9kdWxlW10ge1xuICAgIHZhciBwbGFpblN0eWxlcyA9IHRoaXMuX3N0eWxlQ29tcGlsZXIuY29tcGlsZVN0eWxlc2hlZXQoc3R5bGVzaGVldFVybCwgY3NzVGV4dCwgZmFsc2UpO1xuICAgIHZhciBzaGltU3R5bGVzID0gdGhpcy5fc3R5bGVDb21waWxlci5jb21waWxlU3R5bGVzaGVldChzdHlsZXNoZWV0VXJsLCBjc3NUZXh0LCB0cnVlKTtcbiAgICByZXR1cm4gW1xuICAgICAgdGhpcy5fY29kZWdlblNvdXJjZU1vZHVsZShfc3R5bGVzTW9kdWxlVXJsKHN0eWxlc2hlZXRVcmwsIGZhbHNlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3Jlc29sdmVTdHlsZVN0YXRlbWVudHMocGxhaW5TdHlsZXMpLCBbcGxhaW5TdHlsZXMuc3R5bGVzVmFyXSksXG4gICAgICB0aGlzLl9jb2RlZ2VuU291cmNlTW9kdWxlKF9zdHlsZXNNb2R1bGVVcmwoc3R5bGVzaGVldFVybCwgdHJ1ZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9yZXNvbHZlU3R5bGVTdGF0ZW1lbnRzKHNoaW1TdHlsZXMpLCBbc2hpbVN0eWxlcy5zdHlsZXNWYXJdKVxuICAgIF07XG4gIH1cblxuICBwcml2YXRlIF9jb21waWxlQ29tcG9uZW50KGNvbXBNZXRhOiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlczogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhW10sIHBpcGVzOiBDb21waWxlUGlwZU1ldGFkYXRhW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0U3RhdGVtZW50czogby5TdGF0ZW1lbnRbXSk6IHN0cmluZyB7XG4gICAgdmFyIHN0eWxlUmVzdWx0ID0gdGhpcy5fc3R5bGVDb21waWxlci5jb21waWxlQ29tcG9uZW50KGNvbXBNZXRhKTtcbiAgICB2YXIgcGFyc2VkVGVtcGxhdGUgPSB0aGlzLl90ZW1wbGF0ZVBhcnNlci5wYXJzZShjb21wTWV0YSwgY29tcE1ldGEudGVtcGxhdGUudGVtcGxhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlcywgcGlwZXMsIGNvbXBNZXRhLnR5cGUubmFtZSk7XG4gICAgdmFyIHZpZXdSZXN1bHQgPSB0aGlzLl92aWV3Q29tcGlsZXIuY29tcGlsZUNvbXBvbmVudChjb21wTWV0YSwgcGFyc2VkVGVtcGxhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvLnZhcmlhYmxlKHN0eWxlUmVzdWx0LnN0eWxlc1ZhciksIHBpcGVzKTtcbiAgICBMaXN0V3JhcHBlci5hZGRBbGwodGFyZ2V0U3RhdGVtZW50cywgX3Jlc29sdmVTdHlsZVN0YXRlbWVudHMoc3R5bGVSZXN1bHQpKTtcbiAgICBMaXN0V3JhcHBlci5hZGRBbGwodGFyZ2V0U3RhdGVtZW50cywgX3Jlc29sdmVWaWV3U3RhdGVtZW50cyh2aWV3UmVzdWx0KSk7XG4gICAgcmV0dXJuIHZpZXdSZXN1bHQudmlld0ZhY3RvcnlWYXI7XG4gIH1cblxuXG4gIHByaXZhdGUgX2NvZGVnZW5Tb3VyY2VNb2R1bGUobW9kdWxlVXJsOiBzdHJpbmcsIHN0YXRlbWVudHM6IG8uU3RhdGVtZW50W10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwb3J0ZWRWYXJzOiBzdHJpbmdbXSk6IFNvdXJjZU1vZHVsZSB7XG4gICAgcmV0dXJuIG5ldyBTb3VyY2VNb2R1bGUoXG4gICAgICAgIG1vZHVsZVVybCwgdGhpcy5fb3V0cHV0RW1pdHRlci5lbWl0U3RhdGVtZW50cyhtb2R1bGVVcmwsIHN0YXRlbWVudHMsIGV4cG9ydGVkVmFycykpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9yZXNvbHZlVmlld1N0YXRlbWVudHMoY29tcGlsZVJlc3VsdDogVmlld0NvbXBpbGVSZXN1bHQpOiBvLlN0YXRlbWVudFtdIHtcbiAgY29tcGlsZVJlc3VsdC5kZXBlbmRlbmNpZXMuZm9yRWFjaChcbiAgICAgIChkZXApID0+IHsgZGVwLmZhY3RvcnlQbGFjZWhvbGRlci5tb2R1bGVVcmwgPSBfdGVtcGxhdGVNb2R1bGVVcmwoZGVwLmNvbXApOyB9KTtcbiAgcmV0dXJuIGNvbXBpbGVSZXN1bHQuc3RhdGVtZW50cztcbn1cblxuXG5mdW5jdGlvbiBfcmVzb2x2ZVN0eWxlU3RhdGVtZW50cyhjb21waWxlUmVzdWx0OiBTdHlsZXNDb21waWxlUmVzdWx0KTogby5TdGF0ZW1lbnRbXSB7XG4gIGNvbXBpbGVSZXN1bHQuZGVwZW5kZW5jaWVzLmZvckVhY2goKGRlcCkgPT4ge1xuICAgIGRlcC52YWx1ZVBsYWNlaG9sZGVyLm1vZHVsZVVybCA9IF9zdHlsZXNNb2R1bGVVcmwoZGVwLnNvdXJjZVVybCwgZGVwLmlzU2hpbW1lZCk7XG4gIH0pO1xuICByZXR1cm4gY29tcGlsZVJlc3VsdC5zdGF0ZW1lbnRzO1xufVxuXG5mdW5jdGlvbiBfdGVtcGxhdGVNb2R1bGVVcmwoY29tcDogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhKTogc3RyaW5nIHtcbiAgdmFyIG1vZHVsZVVybCA9IGNvbXAudHlwZS5tb2R1bGVVcmw7XG4gIHZhciB1cmxXaXRob3V0U3VmZml4ID0gbW9kdWxlVXJsLnN1YnN0cmluZygwLCBtb2R1bGVVcmwubGVuZ3RoIC0gTU9EVUxFX1NVRkZJWC5sZW5ndGgpO1xuICByZXR1cm4gYCR7dXJsV2l0aG91dFN1ZmZpeH0ubmdmYWN0b3J5JHtNT0RVTEVfU1VGRklYfWA7XG59XG5cbmZ1bmN0aW9uIF9zdHlsZXNNb2R1bGVVcmwoc3R5bGVzaGVldFVybDogc3RyaW5nLCBzaGltOiBib29sZWFuKTogc3RyaW5nIHtcbiAgcmV0dXJuIHNoaW0gPyBgJHtzdHlsZXNoZWV0VXJsfS5zaGltJHtNT0RVTEVfU1VGRklYfWAgOiBgJHtzdHlsZXNoZWV0VXJsfSR7TU9EVUxFX1NVRkZJWH1gO1xufVxuXG5mdW5jdGlvbiBfYXNzZXJ0Q29tcG9uZW50KG1ldGE6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSkge1xuICBpZiAoIW1ldGEuaXNDb21wb25lbnQpIHtcbiAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihgQ291bGQgbm90IGNvbXBpbGUgJyR7bWV0YS50eXBlLm5hbWV9JyBiZWNhdXNlIGl0IGlzIG5vdCBhIGNvbXBvbmVudC5gKTtcbiAgfVxufVxuIl19