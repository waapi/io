/// Dependencies
require('colors');
require('./poly.js');
var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');
var waapi = require('../js/waapi.js');
var render = require('./render.js');




/// Global Paths
var paths = {
	converter: __dirname + '/',
	build: __dirname + '/../'
};




/// Write out a JSON for debuggage and other tools & w/e
var json = JSON.stringify(waapi.idl, null, '\t');
fs.writeFileSync(paths.converter + 'webanimations.json', json);
fs.writeFileSync(paths.build + 'js/webanimations.json.js', `var waapi = {}; waapi.idl = ${json};`);







/// Clean up old build folder if exists
// try {
// 	rimraf.sync(paths.build);
// 	console.log('Build folder already exists, cleaning up!');
// }
// catch(e) {
// 	console.log('No build folder exists', e);
// }

/// Create new clean build folder
// console.log(`Creating new build folder: ${paths.build}`);
// fs.mkdirSync(paths.build);



/// Loop through all objects
console.log('Rendering WebIDL to Jekyll pages');
waapi.idl.forEach((idl) => {
	
	/// Does it have name to go by?
	if(!('name' in idl && typeof idl.name === 'string' && idl.name))
		return; // skip
	
	/// For each IDL object create its' own folder (if it doesn't exist already)
	console.log('• '.green, idl.name.bold);
	var folder = path.join(paths.build, idl.name);
	try {
		fs.mkdirSync(folder);
	} catch(e) {
		// Already exists
	}
	
	/// Render out an article
	var article = render(idl);
	var index = path.join(folder, 'index.html');
	fs.writeFileSync(index, article);
});
































/*

function preview() {
	document.querySelector('details.preview').innerHTML += waapi.idl.map(function(idl) {
		return idl.type === 'interface'? renderInterface(idl) : '';
	}).join('');
}

function renderInterface(int) {
	var attributes = [];
	var events = [];
	var methods = [];
	int.members.forEach(function(member) {
		if(member.type === 'attribute')
		{
			if(member.idlType.idlType === 'EventHandler' || member.idlType.generic === 'Promise')
				events.push(member);
			else
				attributes.push(member);
		}
		
		else if(member.type === 'operation')
		{
			methods.push(member);
		}
	});
	
	var inheritance = '';
	if(int.inheritance)
	{
		if(waapi.names.includes(int.inheritance))
			inheritance = `<span class="inheritance">extends <a class="internal" href="">${int.inheritance}</a></span>`;
		else
			inheritance = `<span class="inheritance">extends <a class="mdn" href="https://developer.mozilla.org/en-US/docs/Web/API/${int.inheritance}"><svg class="icon"><use xlink:href="#mdn-icon"/></svg>${int.inheritance}</a></span>`;
	}
	
	return `<article class="interface">
		<header>
			<span class="type">interface</span>
			<span class="name">
				${int.name}
				<svg class="underline"><rect/></svg>
			</span>
			${inheritance}
		</header>
		${renderInterface.withConstructor(int)}
		${renderInterface.withAttributes(int, attributes)}
		${renderInterface.withEvents(int, events)}
		${renderInterface.withMethods(int, methods)}
	</article>
	<details><summary>Code</summary><code class="block">${JSON.stringify(int, null, '  ')}</code></details>`;
}

renderInterface.withConstructor = function(int) {
	var constructor = int.extAttrs[0] && int.extAttrs[0].name === "Constructor" && int.extAttrs[0];
	if(!constructor) return '';
	return `<table class="constructor">
		<caption><span>CONSTRUCTOR</span></caption>
		<td class="formatted">var foo = new <em>${int.name}</em>(\n${
			constructor.arguments.map(function(argument) { return '\t' + renderType(argument.idlType) }).join(',\n')
		}\n);</td>
	</table>`
}

renderInterface.withAttributes = function(int, attributes) {
	if(!attributes.length) return '';
	return `<table class="attributes">
		<caption><span>ATTRIBUTES</span></caption>
		${attributes.map(function(attribute) {
			return `<tr>
				<td class="readonly">${attribute.readonly? `<span class="readonly" title="Attribute is read-only; You can't set the value">read</span>` : ''}</td>
				<td class="formatted">${attribute.static? 'static ' : ''}foo.<em class="name">${attribute.name}</em> = ${renderType(attribute.idlType) + (attribute.idlType.nullable? ' || null' : '')}${attribute.inheritance? '\t« ' + attribute.inheritance : ''}</td>
			</tr>`
		}).join('')}
	</table>`
}

renderInterface.withEvents = function(int, events) {
	if(!events.length) return '';
	return `<table class="events">
		<caption><span>EVENTS</span></caption>
		${events.map(function(event) {
			var type = event.idlType.generic === 'Promise'? event.idlType.generic : event.idlType.idlType;
			
			if(type === 'Promise')
			{
				return `<tr>
					<td class="formatted">foo.<em class="name">${event.name}</em>.then(function(${renderArguments(event.idlType.idlType)}) {})</td>
				</tr>`;
			}
			
			else if(type === 'EventHandler')
			{
				return `<tr>
					<td class="formatted">foo.<em class="name">${event.name}</em> = function() {}</td>
				</tr>`;
			}
			
			else
			{
				return `<tr>
					<td class="type">${type}</td>
					<td class="name">${event.name}</td>
				</tr>`;
			}
		}).join('')}
	</table>`
}

renderInterface.withMethods = function(int, methods) {
	if(!methods.length) return '';
	return `<table class="methods">
		<caption><span>METHODS</span></caption>
		${methods.map(function(method) {
			var type = (method.idlType.idlType !== 'void'? ` <span class="return">returns ${renderType(method.idlType)}</span>` : '');
			return `<tr>
				<td class="formatted"><span class="name">foo.<em>${method.name}</em></span><span class="arguments">(${renderArguments(method.arguments)})</span>${type}</td>
			</tr>`
		}).join('')}
	</table>`
}



function renderArguments(args) {
	if(!Array.isArray(args)) return renderArguments([args]);
	if(args.length === 0) return '';
	if(args.length === 1)
	{
		var argument = args[0];
		return (argument.optional? 'optional ' : '') + renderType(argument.idlType);
	}
	else
	{
		return '\n' + args.map(function(argument) {
			return '\t' + (argument.optional? 'optional ' : '') + renderType(argument.idlType);
		}).join(',\n') + '\n';
	}
}




function renderEnum(enume) {
	var json = JSON.stringify(enume, null, '  ');
	return `<code class="block">${json}</code>`;
}

function renderDictionary(dict) {
	return '<code class="block">' + JSON.stringify(dict, null, '  ') + '</code>';
}

function renderImplements(impl) {
	return '<code class="block">' + JSON.stringify(impl, null, '  ') + '</code>';
}

function renderType(idlType) {
	if(typeof idlType === 'string')
	{
		idlType = { idlType: idlType };
	}

	if(Array.isArray(idlType.idlType))
	{
		return idlType.idlType.map(renderType).join(' or ');
	}
	
	if(idlType.sequence)
	{
		return '<span class="sequence">[' + renderType(idlType.idlType) + ']</span>';
	}
	
	switch(idlType.idlType)
	{
		case 'double':
		case 'unrestricted double':
			return '<em class="idltype">Number</em>';
		break;
		case 'DOMString':
			return '<em class="idltype">String</em>';
		break;
		case 'object':
			return '<em class="idltype">Object</em>';
		break;
		case 'void':
			return idlType.idlType;
		break;
		default:
			if(waapi.names.includes(idlType.idlType))
				return `<a class="internal" href="/${idlType.idlType}/">${idlType.idlType}</a>`;
			else
				return '<em class="idltype">' + idlType.idlType + '</em>';
	}
}











function overview() {
	var types = waapi.idl.reduce(function(p, c) {
		if(c.type && !p.includes(c.type)) p.push(c.type);
		return p;
	}, []);
	
	var definitions = waapi.idl.filter(function(d) {
		return d.name;
	});
	var map = definitions.reduce(function(p, c) {
		p[c.name] = c;
		return p;
	}, {});
	
	document.querySelector('details.overview').innerHTML +=
	'<ul class="types">' +
		types.map(function(type) {
			return '<li>' + type + '</li>'
		}).join('') +
	'</ul>' +
	
	'<ul class="definitions">' +
		definitions.map(function(definition) {
			return '<li>' + definition.name + (function(node) {
				if(!node) return '';
				var path = [];
				while(node)
				{
					if(!(node in map))
					{
						path.push('<i style="opacity: 0.6">' + node + '</i>');
						break;
					} 
					node = map[node];
					path.push(node.name);
					node = node.inheritance;
				}
				return ' › ' + path.join(' › ');
			})(definition.inheritance) + '</li>'
		}).join('') +
	'</ul>'
}






function validation() {
	var knownInterfaces = [
		"AnimationTimeline",
		"DocumentTimeline",
		"Animation",
		"AnimationPlayState",
		"AnimationEffectReadOnly",
		"AnimationEffectTimingReadOnly",
		"AnimationEffectTiming",
		"AnimationEffectTimingProperties",
		"ComputedTimingProperties",
		"FillMode",
		"PlaybackDirection",
		"KeyframeEffectReadOnly",
		"KeyframeEffect",
		"BaseComputedKeyframe",
		"BasePropertyIndexedKeyframe",
		"BaseKeyframe",
		"KeyframeEffectOptions",
		"IterationCompositeOperation",
		"CompositeOperation",
		"SharedKeyframeList",
		"Animatable",
		"KeyframeAnimationOptions",
		"Document",
		"AnimationPlaybackEvent",
		"AnimationPlaybackEventInit"
	];
	var knownTypes = [
		"interface",
		"enum",
		"dictionary",
		"implements"
	];
	
	var interfaces = waapi.idl.reduce(function(p, c) {
		if(c.name && !p.includes(c.name)) p.push(c.name);
		return p;
	}, []);
	var types = waapi.idl.reduce(function(p, c) {
		if(c.type && !p.includes(c.type)) p.push(c.type);
		return p;
	}, []);
	
	var addedInterfaces = interfaces.filter(function(d) { return !knownInterfaces.includes(d) });
	var addedTypes = types.filter(function(d) { return !knownTypes.includes(d) });
	var removedInterfaces = knownInterfaces.filter(function(d) { return !interfaces.includes(d) });
	var removedTypes = knownTypes.filter(function(d) { return !types.includes(d) });
	
	var count = [addedInterfaces, addedTypes, removedInterfaces, removedTypes].reduce(function(p, c) { return p + c.length }, 0);
	document.querySelector('details.validator summary').innerHTML += ' ' + (count? '🔥' : '👍');
	
	document.querySelector('details.validator').innerHTML
	+=	'<ul class="interfaces">' + interfaces.map(function(int) {
			if(addedInterfaces.includes(int)) return '<li class="added">' + int + '</li>';
			else return '';// '<li>' + int + '</li>';
		}).join('') + removedInterfaces.map(function(int) {
			return '<li class="removed">' + int + '</li>';
		}).join('') + '</ul>'
	+	'<ul class="types">' + types.map(function(type) {
			if(addedTypes.includes(type)) return '<li class="added">' + type + '</li>';
			else return '';// '<li>' + type + '</li>';
		}).join('') + removedTypes.map(function(type) {
			return '<li class="removed">' + type + '</li>';
		}).join('') + '</ul>';
}



*/
