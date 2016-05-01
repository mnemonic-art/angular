'use strict';"use strict";
var segments_1 = require('./segments');
var lang_1 = require('angular2/src/facade/lang');
var collection_1 = require('angular2/src/facade/collection');
function link(segment, routeTree, urlTree, change) {
    if (change.length === 0)
        return urlTree;
    var startingNode;
    var normalizedChange;
    if (lang_1.isString(change[0]) && change[0].startsWith("./")) {
        normalizedChange = ["/", change[0].substring(2)].concat(change.slice(1));
        startingNode = _findStartingNode(_findUrlSegment(segment, routeTree), segments_1.rootNode(urlTree));
    }
    else if (lang_1.isString(change[0]) && change.length === 1 && change[0] == "/") {
        normalizedChange = change;
        startingNode = segments_1.rootNode(urlTree);
    }
    else if (lang_1.isString(change[0]) && !change[0].startsWith("/")) {
        normalizedChange = ["/"].concat(change);
        startingNode = _findStartingNode(_findUrlSegment(segment, routeTree), segments_1.rootNode(urlTree));
    }
    else {
        normalizedChange = ["/"].concat(change);
        startingNode = segments_1.rootNode(urlTree);
    }
    var updated = _update(startingNode, normalizedChange);
    var newRoot = _constructNewTree(segments_1.rootNode(urlTree), startingNode, updated);
    return new segments_1.Tree(newRoot);
}
exports.link = link;
function _findUrlSegment(segment, routeTree) {
    var s = segment;
    var res = null;
    while (lang_1.isBlank(res)) {
        res = collection_1.ListWrapper.last(s.urlSegments);
        s = routeTree.parent(s);
    }
    return res;
}
function _findStartingNode(segment, node) {
    if (node.value === segment)
        return node;
    for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
        var c = _a[_i];
        var r = _findStartingNode(segment, c);
        if (lang_1.isPresent(r))
            return r;
    }
    return null;
}
function _constructNewTree(node, original, updated) {
    if (node === original) {
        return new segments_1.TreeNode(node.value, updated.children);
    }
    else {
        return new segments_1.TreeNode(node.value, node.children.map(function (c) { return _constructNewTree(c, original, updated); }));
    }
}
function _update(node, changes) {
    var rest = changes.slice(1);
    var outlet = _outlet(changes);
    var segment = _segment(changes);
    if (lang_1.isString(segment) && segment[0] == "/")
        segment = segment.substring(1);
    // reach the end of the tree => create new tree nodes.
    if (lang_1.isBlank(node)) {
        var urlSegment = new segments_1.UrlSegment(segment, null, outlet);
        var children = rest.length === 0 ? [] : [_update(null, rest)];
        return new segments_1.TreeNode(urlSegment, children);
    }
    else if (outlet != node.value.outlet) {
        return node;
    }
    else {
        var urlSegment = lang_1.isStringMap(segment) ? new segments_1.UrlSegment(null, segment, null) :
            new segments_1.UrlSegment(segment, null, outlet);
        if (rest.length === 0) {
            return new segments_1.TreeNode(urlSegment, []);
        }
        return new segments_1.TreeNode(urlSegment, _updateMany(collection_1.ListWrapper.clone(node.children), rest));
    }
}
function _updateMany(nodes, changes) {
    var outlet = _outlet(changes);
    var nodesInRightOutlet = nodes.filter(function (c) { return c.value.outlet == outlet; });
    if (nodesInRightOutlet.length > 0) {
        var nodeRightOutlet = nodesInRightOutlet[0]; // there can be only one
        nodes[nodes.indexOf(nodeRightOutlet)] = _update(nodeRightOutlet, changes);
    }
    else {
        nodes.push(_update(null, changes));
    }
    return nodes;
}
function _segment(changes) {
    if (!lang_1.isString(changes[0]))
        return changes[0];
    var parts = changes[0].toString().split(":");
    return parts.length > 1 ? parts[1] : changes[0];
}
function _outlet(changes) {
    if (!lang_1.isString(changes[0]))
        return null;
    var parts = changes[0].toString().split(":");
    return parts.length > 1 ? parts[0] : null;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtRDN0RWJYOVgudG1wL2FuZ3VsYXIyL3NyYy9hbHRfcm91dGVyL2xpbmsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHlCQUFpRSxZQUFZLENBQUMsQ0FBQTtBQUM5RSxxQkFBd0QsMEJBQTBCLENBQUMsQ0FBQTtBQUNuRiwyQkFBMEIsZ0NBQWdDLENBQUMsQ0FBQTtBQUUzRCxjQUFxQixPQUFxQixFQUFFLFNBQTZCLEVBQ3BELE9BQXlCLEVBQUUsTUFBYTtJQUMzRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFFeEMsSUFBSSxZQUFZLENBQUM7SUFDakIsSUFBSSxnQkFBZ0IsQ0FBQztJQUVyQixFQUFFLENBQUMsQ0FBQyxlQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEQsZ0JBQWdCLEdBQUcsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekUsWUFBWSxHQUFHLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLEVBQUUsbUJBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBRTNGLENBQUM7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsZUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxDQUFD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LE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3QyxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2xELENBQUM7QUFFRCxpQkFBaUIsT0FBYztJQUM3QixFQUFFLENBQUMsQ0FBQyxDQUFDLGVBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDdkMsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3QyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztBQUM1QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtUcmVlLCBUcmVlTm9kZSwgVXJsU2VnbWVudCwgUm91dGVTZWdtZW50LCByb290Tm9kZX0gZnJvbSAnLi9zZWdtZW50cyc7XG5pbXBvcnQge2lzQmxhbmssIGlzUHJlc2VudCwgaXNTdHJpbmcsIGlzU3RyaW5nTWFwfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtMaXN0V3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcblxuZXhwb3J0IGZ1bmN0aW9uIGxpbmsoc2VnbWVudDogUm91dGVTZWdtZW50LCByb3V0ZVRyZWU6IFRyZWU8Um91dGVTZWdtZW50PixcbiAgICAgICAgICAgICAgICAgICAgIHVybFRyZWU6IFRyZWU8VXJsU2VnbWVudD4sIGNoYW5nZTogYW55W10pOiBUcmVlPFVybFNlZ21lbnQ+IHtcbiAgaWYgKGNoYW5nZS5sZW5ndGggPT09IDApIHJldHVybiB1cmxUcmVlO1xuXG4gIGxldCBzdGFydGluZ05vZGU7XG4gIGxldCBub3JtYWxpemVkQ2hhbmdlO1xuXG4gIGlmIChpc1N0cmluZyhjaGFuZ2VbMF0pICYmIGNoYW5nZVswXS5zdGFydHNXaXRoKFwiLi9cIikpIHtcbiAgICBub3JtYWxpemVkQ2hhbmdlID0gW1wiL1wiLCBjaGFuZ2VbMF0uc3Vic3RyaW5nKDIpXS5jb25jYXQoY2hhbmdlLnNsaWNlKDEpKTtcbiAgICBzdGFydGluZ05vZGUgPSBfZmluZFN0YXJ0aW5nTm9kZShfZmluZFVybFNlZ21lbnQoc2VnbWVudCwgcm91dGVUcmVlKSwgcm9vdE5vZGUodXJsVHJlZSkpO1xuXG4gIH0gZWxzZSBpZiAoaXNTdHJpbmcoY2hhbmdlWzBdKSAmJiBjaGFuZ2UubGVuZ3RoID09PSAxICYmIGNoYW5nZVswXSA9PSBcIi9cIikge1xuICAgIG5vcm1hbGl6ZWRDaGFuZ2UgPSBjaGFuZ2U7XG4gICAgc3RhcnRpbmdOb2RlID0gcm9vdE5vZGUodXJsVHJlZSk7XG5cbiAgfSBlbHNlIGlmIChpc1N0cmluZyhjaGFuZ2VbMF0pICYmICFjaGFuZ2VbMF0uc3RhcnRzV2l0aChcIi9cIikpIHtcbiAgICBub3JtYWxpemVkQ2hhbmdlID0gW1wiL1wiXS5jb25jYXQoY2hhbmdlKTtcbiAgICBzdGFydGluZ05vZGUgPSBfZmluZFN0YXJ0aW5nTm9kZShfZmluZFVybFNlZ21lbnQoc2VnbWVudCwgcm91dGVUcmVlKSwgcm9vdE5vZGUodXJsVHJlZSkpO1xuXG4gIH0gZWxzZSB7XG4gICAgbm9ybWFsaXplZENoYW5nZSA9IFtcIi9cIl0uY29uY2F0KGNoYW5nZSk7XG4gICAgc3RhcnRpbmdOb2RlID0gcm9vdE5vZGUodXJsVHJlZSk7XG4gIH1cblxuICBsZXQgdXBkYXRlZCA9IF91cGRhdGUoc3RhcnRpbmdOb2RlLCBub3JtYWxpemVkQ2hhbmdlKTtcbiAgbGV0IG5ld1Jvb3QgPSBfY29uc3RydWN0TmV3VHJlZShyb290Tm9kZSh1cmxUcmVlKSwgc3RhcnRpbmdOb2RlLCB1cGRhdGVkKTtcblxuICByZXR1cm4gbmV3IFRyZWU8VXJsU2VnbWVudD4obmV3Um9vdCk7XG59XG5cbmZ1bmN0aW9uIF9maW5kVXJsU2VnbWVudChzZWdtZW50OiBSb3V0ZVNlZ21lbnQsIHJvdXRlVHJlZTogVHJlZTxSb3V0ZVNlZ21lbnQ+KTogVXJsU2VnbWVudCB7XG4gIGxldCBzID0gc2VnbWVudDtcbiAgbGV0IHJlcyA9IG51bGw7XG4gIHdoaWxlIChpc0JsYW5rKHJlcykpIHtcbiAgICByZXMgPSBMaXN0V3JhcHBlci5sYXN0KHMudXJsU2VnbWVudHMpO1xuICAgIHMgPSByb3V0ZVRyZWUucGFyZW50KHMpO1xuICB9XG4gIHJldHVybiByZXM7XG59XG5cbmZ1bmN0aW9uIF9maW5kU3RhcnRpbmdOb2RlKHNlZ21lbnQ6IFVybFNlZ21lbnQsIG5vZGU6IFRyZWVOb2RlPFVybFNlZ21lbnQ+KTogVHJlZU5vZGU8VXJsU2VnbWVudD4ge1xuICBpZiAobm9kZS52YWx1ZSA9PT0gc2VnbWVudCkgcmV0dXJuIG5vZGU7XG4gIGZvciAodmFyIGMgb2Ygbm9kZS5jaGlsZHJlbikge1xuICAgIGxldCByID0gX2ZpbmRTdGFydGluZ05vZGUoc2VnbWVudCwgYyk7XG4gICAgaWYgKGlzUHJlc2VudChyKSkgcmV0dXJuIHI7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIF9jb25zdHJ1Y3ROZXdUcmVlKG5vZGU6IFRyZWVOb2RlPFVybFNlZ21lbnQ+LCBvcmlnaW5hbDogVHJlZU5vZGU8VXJsU2VnbWVudD4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVkOiBUcmVlTm9kZTxVcmxTZWdtZW50Pik6IFRyZWVOb2RlPFVybFNlZ21lbnQ+IHtcbiAgaWYgKG5vZGUgPT09IG9yaWdpbmFsKSB7XG4gICAgcmV0dXJuIG5ldyBUcmVlTm9kZTxVcmxTZWdtZW50Pihub2RlLnZhbHVlLCB1cGRhdGVkLmNoaWxkcmVuKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IFRyZWVOb2RlPFVybFNlZ21lbnQ+KFxuICAgICAgICBub2RlLnZhbHVlLCBub2RlLmNoaWxkcmVuLm1hcChjID0+IF9jb25zdHJ1Y3ROZXdUcmVlKGMsIG9yaWdpbmFsLCB1cGRhdGVkKSkpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF91cGRhdGUobm9kZTogVHJlZU5vZGU8VXJsU2VnbWVudD4sIGNoYW5nZXM6IGFueVtdKTogVHJlZU5vZGU8VXJsU2VnbWVudD4ge1xuICBsZXQgcmVzdCA9IGNoYW5nZXMuc2xpY2UoMSk7XG4gIGxldCBvdXRsZXQgPSBfb3V0bGV0KGNoYW5nZXMpO1xuICBsZXQgc2VnbWVudCA9IF9zZWdtZW50KGNoYW5nZXMpO1xuICBpZiAoaXNTdHJpbmcoc2VnbWVudCkgJiYgc2VnbWVudFswXSA9PSBcIi9cIikgc2VnbWVudCA9IHNlZ21lbnQuc3Vic3RyaW5nKDEpO1xuXG4gIC8vIHJlYWNoIHRoZSBlbmQgb2YgdGhlIHRyZWUgPT4gY3JlYXRlIG5ldyB0cmVlIG5vZGVzLlxuICBpZiAoaXNCbGFuayhub2RlKSkge1xuICAgIGxldCB1cmxTZWdtZW50ID0gbmV3IFVybFNlZ21lbnQoc2VnbWVudCwgbnVsbCwgb3V0bGV0KTtcbiAgICBsZXQgY2hpbGRyZW4gPSByZXN0Lmxlbmd0aCA9PT0gMCA/IFtdIDogW191cGRhdGUobnVsbCwgcmVzdCldO1xuICAgIHJldHVybiBuZXcgVHJlZU5vZGU8VXJsU2VnbWVudD4odXJsU2VnbWVudCwgY2hpbGRyZW4pO1xuXG4gICAgLy8gZGlmZmVyZW50IG91dGxldCA9PiBwcmVzZXJ2ZSB0aGUgc3VidHJlZVxuICB9IGVsc2UgaWYgKG91dGxldCAhPSBub2RlLnZhbHVlLm91dGxldCkge1xuICAgIHJldHVybiBub2RlO1xuXG4gICAgLy8gc2FtZSBvdXRsZXQgPT4gbW9kaWZ5IHRoZSBzdWJ0cmVlXG4gIH0gZWxzZSB7XG4gICAgbGV0IHVybFNlZ21lbnQgPSBpc1N0cmluZ01hcChzZWdtZW50KSA/IG5ldyBVcmxTZWdtZW50KG51bGwsIHNlZ21lbnQsIG51bGwpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFVybFNlZ21lbnQoc2VnbWVudCwgbnVsbCwgb3V0bGV0KTtcbiAgICBpZiAocmVzdC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBuZXcgVHJlZU5vZGU8VXJsU2VnbWVudD4odXJsU2VnbWVudCwgW10pO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgVHJlZU5vZGU8VXJsU2VnbWVudD4odXJsU2VnbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF91cGRhdGVNYW55KExpc3RXcmFwcGVyLmNsb25lKG5vZGUuY2hpbGRyZW4pLCByZXN0KSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX3VwZGF0ZU1hbnkobm9kZXM6IFRyZWVOb2RlPFVybFNlZ21lbnQ+W10sIGNoYW5nZXM6IGFueVtdKTogVHJlZU5vZGU8VXJsU2VnbWVudD5bXSB7XG4gIGxldCBvdXRsZXQgPSBfb3V0bGV0KGNoYW5nZXMpO1xuICBsZXQgbm9kZXNJblJpZ2h0T3V0bGV0ID0gbm9kZXMuZmlsdGVyKGMgPT4gYy52YWx1ZS5vdXRsZXQgPT0gb3V0bGV0KTtcbiAgaWYgKG5vZGVzSW5SaWdodE91dGxldC5sZW5ndGggPiAwKSB7XG4gICAgbGV0IG5vZGVSaWdodE91dGxldCA9IG5vZGVzSW5SaWdodE91dGxldFswXTsgIC8vIHRoZXJlIGNhbiBiZSBvbmx5IG9uZVxuICAgIG5vZGVzW25vZGVzLmluZGV4T2Yobm9kZVJpZ2h0T3V0bGV0KV0gPSBfdXBkYXRlKG5vZGVSaWdodE91dGxldCwgY2hhbmdlcyk7XG4gIH0gZWxzZSB7XG4gICAgbm9kZXMucHVzaChfdXBkYXRlKG51bGwsIGNoYW5nZXMpKTtcbiAgfVxuXG4gIHJldHVybiBub2Rlcztcbn1cblxuZnVuY3Rpb24gX3NlZ21lbnQoY2hhbmdlczogYW55W10pOiBhbnkge1xuICBpZiAoIWlzU3RyaW5nKGNoYW5nZXNbMF0pKSByZXR1cm4gY2hhbmdlc1swXTtcbiAgbGV0IHBhcnRzID0gY2hhbmdlc1swXS50b1N0cmluZygpLnNwbGl0KFwiOlwiKTtcbiAgcmV0dXJuIHBhcnRzLmxlbmd0aCA+IDEgPyBwYXJ0c1sxXSA6IGNoYW5nZXNbMF07XG59XG5cbmZ1bmN0aW9uIF9vdXRsZXQoY2hhbmdlczogYW55W10pOiBzdHJpbmcge1xuICBpZiAoIWlzU3RyaW5nKGNoYW5nZXNbMF0pKSByZXR1cm4gbnVsbDtcbiAgbGV0IHBhcnRzID0gY2hhbmdlc1swXS50b1N0cmluZygpLnNwbGl0KFwiOlwiKTtcbiAgcmV0dXJuIHBhcnRzLmxlbmd0aCA+IDEgPyBwYXJ0c1swXSA6IG51bGw7XG59XG4iXX0=