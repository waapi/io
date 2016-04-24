var waapi = {};

fetch('webanimations.idl')
.then(function(response) { return response.text() })
.then(function(idl) {
	var element = document.querySelector('code.json');
	var tree = WebIDL2.parse(idl);
	var json = JSON.stringify(tree, null, '    ');
	element.textContent = json;
	console.log(tree);
	waapi.idl = tree;
	validation();
	overview();
	preview();
});







function preview() {
	var examples = waapi.idl.reduce(function(p, c) {
		if(c.type && p.length? !p.some(function(d) { return d.type === c.type }) : true)
			p.push(c);
		return p;
	}, []);
	
	document.querySelector('details.preview').innerHTML
	+= examples.map(function(example) {
		switch(example.type) {
			case 'interface': return renderInterface(example);
			case 'enum': return renderEnum(example);
			case 'dictionary': return renderDictionary(example);
			case 'implements': return renderImplements(example);
			default: return '';
		}
	}).join('')
}

function renderInterface(int) {
	// return '<code class="block">' + JSON.stringify(int, null, '  ') + '</code>';
	return
	'<article class="interface">' +
		'<header>' + int.name + '</header>' +
		'<section class="members">' +
			
		'</section>' +
	'</article>'
}

function renderEnum(enume) {
	
	return '<code class="block">' + JSON.stringify(enume, null, '  ') + '</code>';
}

function renderDictionary(dict) {
	
	return '<code class="block">' + JSON.stringify(dict, null, '  ') + '</code>';
}

function renderImplements(impl) {
	
	return '<code class="block">' + JSON.stringify(impl, null, '  ') + '</code>';
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
