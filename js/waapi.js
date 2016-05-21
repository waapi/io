if(typeof require === 'function')
{
	var fs = require('fs');
	var WebIDL2 = require('../converter/webidl2.js');
	var idl = fs.readFileSync(__dirname + '/../converter/webanimations.idl', { encoding: 'utf8'});
}

if(typeof idl !== 'undefined' && WebIDL2)
{
	/// Parse WebIDL of the Web Animations spec
	var tree = WebIDL2.parse(idl);
}


/// Create our own abstract tree
if(typeof waapi === 'undefined')
{
	var waapi = {};
	waapi.idl = tree;
}

waapi.names = waapi.idl.filter(function(d) { return d.name }).map(function(d) { return d.name });
waapi.map = waapi.idl.reduce(function(p, c) {
	if(c.name) p[c.name] = c;
	return p;
}, {});

waapi.index = waapi.idl.reduce(function(p, int) {
	if(int.type === 'interface')
	{
		var simple = { name: int.name, type: int.type };
		int.members.forEach(function(member) {
			if(member.type === 'attribute')
			{
				if(member.idlType.idlType === 'EventHandler' || member.idlType.generic === 'Promise')
				{
					if(!('events' in simple)) simple.events = [];
					simple.events.push(member.name);
				}
				else
				{
					if(!('attributes' in simple)) simple.attributes = [];
					simple.attributes.push(member.name);
				}
			}
			
			else if(member.type === 'operation')
			{
				if(!('methods' in simple)) simple.methods = [];
				simple.methods.push(member.name);
			}
		});
		p.push(simple);
	}
	
	else if(int.type === 'dictionary')
	{
		var simple = { name: int.name, type: int.type, fields: [] };
		simple.fields = int.members.filter(function(member) { return member.type === 'field' }).map(function(member) { return member.name });
		p.push(simple);
	}
	
	else if(int.type === 'enum')
	{
		var simple = { name: int.name, type: int.type, values: int.values };
		p.push(simple);
	}
	
	return p;
}, []);



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

waapi.idl.forEach(function(d) {
	if(d.inheritance)
		inherit(d);
});



if(typeof module !== 'undefined')
{
	module.exports = waapi;
}
