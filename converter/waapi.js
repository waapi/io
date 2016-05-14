if(typeof require === 'function')
{
	var fs = require('fs');
	var WebIDL2 = require('./webidl2.js');
	var idl = fs.readFileSync('./webanimations.idl', { encoding: 'utf8'});
}


/// Parse WebIDL of the Web Animations spec
var tree = WebIDL2.parse(idl);
var json = JSON.stringify(tree, null, '    ');




/// Create our own abstract tree
var waapi = {};
waapi.idl = tree;
waapi.names = tree.filter(function(d) { return d.name }).map(function(d) { return d.name });
waapi.map = tree.reduce(function(p, c) {
	if(c.name) p[c.name] = c;
	return p;
}, {});



/// Figure out the inheritance
function inherit(node) {
	var parent = node.inheritance && waapi.map[node.inheritance];
	if(parent) inherit(parent); else return;
	
	if('members' in node && 'members' in parent)
	{
		parent.members.forEach(function(a) {
			if(node.members.some(function(b) { return a.name === b.name })) return;
			
			var clone = Object.assign({ inheritance: parent.name }, a);
			node.members.push(clone);
		});
	}
}

tree.forEach(function(d) {
	if(d.inheritance)
		inherit(d);
});



if(module && module.exports)
{
	module.exports = waapi;
}
