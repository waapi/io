if(typeof require === 'function')
{
	var YAML = require('js-yaml');
	var waapi = require('../js/waapi.js');
}
else
{
	var YAML = null;
}


function render(idl) {
	var frontmatter = YAML? `---\n${YAML.dump({
		layout: 'article',
		article: true,
		categories: [idl.type],
		title: idl.name
	})}\n---\n` : '';
	
	var content;
	if(idl.type === 'interface') content = renderInterface(idl);
	else if(idl.type === 'dictionary') content = renderDictionary(idl);
	else if(idl.type === 'enum') content = renderEnum(idl);
	else content = `<!-- UNHANDLED IDL TYPE: ${idl.type} -->`;
	
	return `${frontmatter}${content}`;
}






function renderDictionary(int) {
	var fields = int.members.filter((member) => member.type === 'field');
	
	return `<article class="dictionary">
		<header class="landmark">
			<h1 class="title">
				<span class="type">dictionary</span>
				<span class="name">
					${int.name}
					<svg class="underline"><rect fill="url('#wall')" width="100%" height="100%"/></svg>
				</span>
			</h1>
		</header>
${renderDictionary.withFields(int, fields)}
	</article>`;
}

renderDictionary.withFields = function(int, fields) {
	return `
	<ul class="dictionary">
		${fields.map((field, index) => {
			var required = field.required? `<span class="required" title="Field is required">required</span> ` : '';
			var type = renderType(field.idlType, 'span');
			return `<li class="formatted"><em class="name">${field.name}</em>: ${required}${type}</li>`;
		}).join('\n\t\t')}
	</ul>`;
}





function renderEnum(int) {
	return `<article class="enum">
		<header class="landmark">
			<h1 class="title">
				<span class="type">enum</span>
				<span class="name">
					${int.name}
					<svg class="underline"><rect fill="url('#wall')" width="100%" height="100%"/></svg>
				</span>
			</h1>
		</header>
${renderEnum.withValues(int)}
	</article>`;
}


renderEnum.withValues = function(int) {
	return `
	<ul class="enum">
		${int.values.map((value) => {
			var type = typeof value;
			return `<li class="${type}">${value}</li>`;
		}).join('\n\t\t')}
	</ul>`;
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
	
	return `<article class="interface">
	<header class="landmark">
		<h1 class="title">
			<span class="type">interface</span>
			<span class="name">
				${int.name}
				<svg class="underline"><rect fill="url('#wall')" width="100%" height="100%"/></svg>
			</span>
		</h1>
${renderInterface.withInheritance(int)}
	</header>
${renderInterface.withConstructor(int)}
${renderInterface.withAttributes(int, attributes)}
${renderInterface.withEvents(int, events)}
${renderInterface.withMethods(int, methods)}
</article>`;
// <details><summary>Code</summary><code class="block">${JSON.stringify(int, null, '  ')}</code></details>`;
}

renderInterface.withInheritance = function(int) {
	var parent = int.inheritance;
	var children = waapi.idl.filter(function(d) {
		return d.inheritance === int.name
	}).map(function(d) {
		return d.name
	});
	
	if(parent)
	{
		function recurseParents(node) {
			var idl = waapi.map[node];
			var parent;
			if(idl && idl.inheritance) parent = recurseParents(idl.inheritance);
			
			if(waapi.names.includes(node))
			{
				node = `<a class="internal" title="${int.name} extends the ${node} interface" href="/${node}/">${node}</a>`;
			}
			else
			{
				node = `<a class="mdn" title="${int.name} extends the ${node} interface" href="https://developer.mozilla.org/en-US/docs/Web/API/${node}"><svg class="icon"><use xlink:href="#mdn-icon"/></svg>${node}</a>`;
			}
			
			if(parent) return `${node} » ${parent}`;
			else return node;
		}
		
		parent = recurseParents(parent);
		
		/*if(waapi.names.includes(parent))
		{
			parent = `<a class="internal" title="${int.name} extends the ${parent} interface" href="/${parent}/">${parent}</a>`;
		}
		else
		{
			parent = `<a class="mdn" title="${int.name} extends the ${parent} interface" href="https://developer.mozilla.org/en-US/docs/Web/API/${parent}"><svg class="icon"><use xlink:href="#mdn-icon"/></svg>${parent}</a>`;
		}*/
	}
	
	if(children.length)
	{
		children = children.map(function(child) {
			if(waapi.names.includes(child))
			{
				return `<a class="internal" title="${child} extends the ${int.name} interface" href="/${child}/">${child}</a>`;
			}
			else
			{
				return `<a class="mdn" title="${child} extends the ${int.name} interface" href="https://developer.mozilla.org/en-US/docs/Web/API/${child}"><svg class="icon"><use xlink:href="#mdn-icon"/></svg>${child}</a>`;
			}
		});
	}
	
	return (parent? `
		<div class="formatted">${int.name}.prototype » ${parent}</div>
	` : '') + (children.length? children.map(function(child) {
			return `
		<div class="formatted">${child}.prototype » ${int.name}</div>
	`}).join('\n') : '')
	
	
	/*return `
	<table class="inheritance">
		${parent? `<tr>
		<td class="formatted">foo.prototype = ${parent}</td>
		</tr>` : ''}
		${children.length? `<tr>
			<th>used as prototype in</th>
			<td>${children.join('</td>\n\t\t\t<td>')}</td>
		</tr>` : ''}
	</table>`*/
};

renderInterface.withConstructor = function(int) {
	var constructor = int.extAttrs[0] && int.extAttrs[0].name === "Constructor" && int.extAttrs[0];
	if(!constructor) return '';
	return `
	<table class="constructor">
		<caption><span>CONSTRUCTOR</span></caption>
		<td class="formatted">var foo = new <em>${int.name}</em>(\n${
			constructor.arguments.map(function(argument) { return '\t' + renderType(argument.idlType) }).join(',\n')
		}\n);</td>
	</table>`
}

renderInterface.withAttributes = function(int, attributes) {
	if(!attributes.length) return '';
	return `
	<table class="attributes">
		<caption><span>ATTRIBUTES</span></caption>${
			attributes.map(function(attribute) {
				return `
		<tr>
		<td class="readonly">${attribute.readonly? `<span class="readonly" title="Attribute is read-only; You can't set the value">read</span>` : ''}</td>
		<td class="formatted">${attribute.static? 'static ' : ''}foo.<em class="name">${attribute.name}</em> = ${renderType(attribute.idlType) + (attribute.idlType.nullable? ' || null' : '')}${attribute.inheritance? `\t<span class="inherited" title="This attribute is inherited via prototype from ${attribute.inheritance}">« ${attribute.inheritance}</span>` : ''}</td>
		</tr>`
		}).join('')}
	</table>`
}

renderInterface.withEvents = function(int, events) {
	if(!events.length) return '';
	return `
	<table class="events">
		<caption><span>EVENTS</span></caption>${
			events.map(function(event) {
			var type = event.idlType.generic === 'Promise'? event.idlType.generic : event.idlType.idlType;
			
			if(type === 'Promise')
			{
				return `
		<tr>
			<td class="formatted">foo.<em class="name">${event.name}</em>.then(function(${renderArguments(event.idlType.idlType)}) {})</td>
		</tr>`;
			}
			
			else if(type === 'EventHandler')
			{
				return `
		<tr>
			<td class="formatted">foo.<em class="name">${event.name}</em> = function(event) {}</td>
		</tr>`;
			}
			
			else
			{
				return `
		<tr>
			<td class="type">${type}</td>
			<td class="name">${event.name}</td>
		</tr>`;
			}
		}).join('')}
	</table>`
}

renderInterface.withMethods = function(int, methods) {
	if(!methods.length) return '';
	return `
	<table class="methods">
		<caption><span>METHODS</span></caption>${
			methods.map(function(method) {
			var type = (method.idlType.idlType !== 'void'? ` <span class="return">returns ${renderType(method.idlType)}</span>` : '');
			return `
		<tr>
			<td class="formatted"><span class="name">foo.<em>${method.name}</em></span><span class="arguments">(${renderArguments(method.arguments)})</span>${type}${method.inheritance? `\t<span class="inherited" title="This method is inherited via prototype from ${method.inheritance}">« ${method.inheritance}</span>` : ''}</td>
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




function renderImplements(impl) {
	return '<code class="block">' + JSON.stringify(impl, null, '  ') + '</code>';
}

function renderType(idlType, tag) {
	if(!tag) tag = 'em';
	
	if(typeof idlType === 'string')
	{
		idlType = { idlType: idlType };
	}

	if(Array.isArray(idlType.idlType))
	{
		return idlType.idlType.map((type) => renderType(type, tag)).join(' or ');
	}
	
	if(idlType.sequence)
	{
		return `<span class="sequence">[${renderType(idlType.idlType)}]</span>`;
	}
	
	switch(idlType.idlType)
	{
		case 'double':
		case 'unrestricted double':
			return `<${tag} class="idltype">Number</${tag}>`;
		break;
		case 'DOMString':
			return `<${tag} class="idltype">String</${tag}>`;
		break;
		case 'object':
			return `<${tag} class="idltype">Object</${tag}>`;
		break;
		case 'void':
			return idlType.idlType;
		break;
		default:
			if(waapi.names.includes(idlType.idlType))
				return `<a class="internal" href="/${idlType.idlType}/">${idlType.idlType}</a>`;
			else
				return `<${tag} class="idltype">${idlType.idlType}</${tag}>`;
	}
}


if(typeof module !== 'undefined')
{
	module.exports = render;
}
