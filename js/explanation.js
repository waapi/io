document.addEventListener('DOMContentLoaded', function() {
	Array.prototype.forEach.call(document.querySelectorAll('code.block, script.block'), CodeHighlight);
	Array.prototype.forEach.call(document.querySelectorAll('.expandable'), Expandable);
	Highlighter.init();
});


/// Single-use Expandable area
function Expandable(block) {
	function expand(event) {
		block.removeEventListener('click', expand);
		this.setAttribute('open', '');
	}
	
	if(location.hash && location.hash.replace('#', '') === block.id)
	{
		block.setAttribute('open', '');
	}
	else
	{
		block.addEventListener('click', expand);
	}
}


/// Syntax Highlighting
function CodeHighlight(block) {
	// Try to preserve the original HTML-ified sourcecode,
	// which may contain highlighting (<high-light>) and typographic syntax (<b>/<i>)
	// We replace all the text nodes with syntax highlighted code
	var pseudo = {
		nodes: [],
		length: 0,
		
		walk: function (node) {
			var index = 0;
			if(node.nodeType === document.TEXT_NODE)
			{
				var length = node.nodeValue.length;
				var start = pseudo.length;
				var end = start + length;
				pseudo.length += length;
				pseudo.nodes.push({ start: start, end: end, dom: node, diff: [] });
			}
			else if(node.nodeType === document.ELEMENT_NODE) Array.prototype.forEach.call(node.childNodes, pseudo.walk);
		},
		
		replace: function(target, by) {
			if(!by.length) return target.parentNode.removeChild(target);
			var parent = target.parentNode;
			var newer = by.shift();
			parent.replaceChild(newer, target);
			var current = newer;
			var iter = by.length;
			while(iter-->0)
			{
				newer = by.shift();
				parent.insertBefore(newer, current.nextSibling);
				current = newer;
			}
		},
		
		get text () { return pseudo.nodes.map(function(node) { return node.dom.nodeValue }).join('') },
		
		
		tokenize: function(start, end, token) {
			var nodes = this.nodes.filter(function(node) { return start < node.end && end > node.start });
			
			nodes.forEach(function(node, index) {
				var piece = node.dom.nodeValue.slice(Math.max(start, node.start) - node.start, Math.min(end, node.end) - node.start);
				var nodus;
				if(typeof token === 'string')
				{
					nodus = document.createElement('span');
					nodus.className = token;
					nodus.textContent = piece;
					node.diff.push(nodus);
				}
				
				else if(typeof token === 'function')
				{
					token(piece, node);
				}
				
				else
				{
					nodus = document.createTextNode(piece);
					node.diff.push(nodus);
				}
			});
		},
		
		render: function() {
			for(var iter = 0, total = this.nodes.length; iter < total; ++iter)
			{
				var node = this.nodes[iter];
				this.replace(node.dom, node.diff);
			}
		}
	};
	
	
	var offset = '';
	
	function offsetWalk (node) {
		var index = 0;
		if(node.nodeType === document.TEXT_NODE)
		{
			if(offset) node.nodeValue = node.nodeValue.replace(offset, '');
		}
		else if(node.nodeType === document.ELEMENT_NODE) Array.prototype.forEach.call(node.childNodes, offsetWalk);
	};
	
	if(block.firstChild.nodeType === document.TEXT_NODE)
	{
		block.firstChild.nodeValue = block.firstChild.nodeValue.replace(/\n/, '');
		offset = block.firstChild.nodeValue.match(/[\t ]+/);
		offset = new RegExp('^' + offset, 'mg');
	}
	
	if(block.lastChild.nodeType === document.TEXT_NODE) block.lastChild.nodeValue = block.lastChild.nodeValue.trimRight();
	
	offsetWalk(block);
	
// 	if(block.classList.contains('json'))
// 	{
// 		if(block.firstChild.nodeType === document.TEXT_NODE)
// 			block.firstChild.nodeValue = 'var blah = ' + block.firstChild.nodeValue;
// 	}
	
	if(block.matches('style')) {
		block.contentEditable = true;
		block.spellcheck = false;
		return;
	}
	if(block.matches('script') && block.hasAttribute('type')? block.getAttribute('type') !== 'text/javascript' : false) return;
	
	var preview = document.createElement('div');
	preview.classList.add('render');
	while(block.firstChild) preview.appendChild(block.firstChild);
	pseudo.walk(preview);
	
	block.appendChild(preview);
	
	function render() {
		function onWhitespace(start, end) {
			pseudo.tokenize(start, end, function(piece, node) {
				var threads = piece.split(/(\t)/);
				for(var iter = 0, total = threads.length; iter < total; ++iter)
				{
					var thread = threads[iter];
					
					if(iter&1)
					{
						var tab = document.createElement('span');
						tab.className = 'tab';
						tab.innerHTML = '&#9;';// = '\t';
						node.diff.push(tab);
					}
					
					else node.diff.push(document.createTextNode(thread));
				}
			});
		}
		
		
		var last = 0;
		try {
		var ast = acorn.parse(pseudo.text, {
			ecmaVersion: 6,
			onToken: function(token) {
				if(last !== token.start) onWhitespace(last, token.start);
				last = token.end;
				
				if(token.type.label === 'eof') return;
				
				if(token.type === acorn.tokTypes.num)
					pseudo.tokenize(token.start, token.end, 'numeric');
				
				else if(token.type === acorn.tokTypes.string)
					pseudo.tokenize(token.start, token.end, 'string');
				
				else if(token.type === acorn.tokTypes.template)
					pseudo.tokenize(token.start, token.end, 'template');
				
				else if(token.type === acorn.tokTypes.name)
				{
					if(token.value in window) // && isNative(window[token.value]) )
						pseudo.tokenize(token.start, token.end, 'native');
					else
						pseudo.tokenize(token.start, token.end, 'name');
				}
				
				else if(token.type === acorn.tokTypes._break ||
						token.type === acorn.tokTypes._case ||
						token.type === acorn.tokTypes._catch ||
						token.type === acorn.tokTypes._class ||
						token.type === acorn.tokTypes._const ||
						token.type === acorn.tokTypes._continue ||
						token.type === acorn.tokTypes._debugger ||
						token.type === acorn.tokTypes._default ||
						token.type === acorn.tokTypes._delete ||
						token.type === acorn.tokTypes._do ||
						token.type === acorn.tokTypes._else ||
						token.type === acorn.tokTypes._export ||
						token.type === acorn.tokTypes._extends ||
						token.type === acorn.tokTypes._false ||
						token.type === acorn.tokTypes._finally ||
						token.type === acorn.tokTypes._for ||
						token.type === acorn.tokTypes._function ||
						token.type === acorn.tokTypes._if ||
						token.type === acorn.tokTypes._import ||
						token.type === acorn.tokTypes._in ||
						token.type === acorn.tokTypes._instanceof ||
						token.type === acorn.tokTypes._let ||
						token.type === acorn.tokTypes._new ||
						token.type === acorn.tokTypes._null ||
						token.type === acorn.tokTypes._return ||
						token.type === acorn.tokTypes._super ||
						token.type === acorn.tokTypes._switch ||
						token.type === acorn.tokTypes._this ||
						token.type === acorn.tokTypes._throw ||
						token.type === acorn.tokTypes._true ||
						token.type === acorn.tokTypes._try ||
						token.type === acorn.tokTypes._typeof ||
						token.type === acorn.tokTypes._var ||
						token.type === acorn.tokTypes._void ||
						token.type === acorn.tokTypes._while ||
						token.type === acorn.tokTypes._with ||
						token.type === acorn.tokTypes._yield)
					pseudo.tokenize(token.start, token.end, 'keyword');
				
				else if(token.type === acorn.tokTypes.arrow ||
						token.type === acorn.tokTypes.assign ||
						token.type === acorn.tokTypes.backQuote ||
						token.type === acorn.tokTypes.braceL ||
						token.type === acorn.tokTypes.braceR ||
						token.type === acorn.tokTypes.bracketL ||
						token.type === acorn.tokTypes.bracketR ||
						token.type === acorn.tokTypes.colon ||
						token.type === acorn.tokTypes.comma ||
						token.type === acorn.tokTypes.dollarBraceL ||
						token.type === acorn.tokTypes.dot ||
						token.type === acorn.tokTypes.ellipsis ||
						token.type === acorn.tokTypes.parenL ||
						token.type === acorn.tokTypes.parenR ||
						token.type === acorn.tokTypes.prefix ||
						token.type === acorn.tokTypes.question ||
						token.type === acorn.tokTypes.regexep ||
						token.type === acorn.tokTypes.relational ||
						token.type === acorn.tokTypes.semi ||
						token.type === acorn.tokTypes.slash ||
						token.type === acorn.tokTypes.star)
					pseudo.tokenize(token.start, token.end, 'syntax');
				
				else if(token.type === acorn.tokTypes.eq ||
						token.type === acorn.tokTypes.equality ||
						token.type === acorn.tokTypes.incDec ||
						token.type === acorn.tokTypes.logicalAND ||
						token.type === acorn.tokTypes.logicalOR ||
						token.type === acorn.tokTypes.modulo ||
						token.type === acorn.tokTypes.plusMin ||
						token.type === acorn.tokTypes.bitShift ||
						token.type === acorn.tokTypes.bitwiseAND ||
						token.type === acorn.tokTypes.bitwiseOR ||
						token.type === acorn.tokTypes.bitwiseXOR)
					pseudo.tokenize(token.start, token.end, 'operator');
				
				else
				{
					pseudo.tokenize(token.start, token.end);
				}
			},
			
			onComment: function(isBlock, text, start, end) {
				if(last !== start) onWhitespace(last, start);
				last = end;
				
				pseudo.tokenize(start, end, 'comment');
			}
		});
		pseudo.render();
		
		}
		catch(e) {
			pseudo.render();
			var visual = document.createElement('div');
			visual.classList.add('error');
			
			var row = e.loc.line - 1;
			var text = pseudo.text.split('\n')[row];
			var column = text.substr(0, e.loc.column).replace('\t', '    ').length;
			visual.style.top = row*1.2 + 'em';
			visual.style.width = (column*0.5) + 'em';
			visual.setAttribute('title', e.message);
			preview.appendChild(visual);
			preview.style.minHeight = (row*1.2 + 3.6) + 'em';
		}
		
	}
	
	render();
	
// 	if(block.classList.contains('json'))
// 	{
// 		var iter = 6;
// 		while(iter-->0) block.removeChild(block.firstChild);
// 	}
}



var Highlighter = {
	init: function() {
		Highlighter.reset();
		window.addEventListener('popstate', Highlighter.reset);
	},
	
	reset: function() {
		var elements = document.querySelectorAll('high-light.on');
		var iter = elements.length;
		while(iter-->0) elements[iter].classList.remove('on');
		
		document.documentElement.classList.remove('has-highlight');
		document.removeEventListener('mouseover', Highlighter);
		Highlighter.bound.forEach(function Unbind(node) {
			node.removeEventListener('mouseleave', Highlighter);
		});
		Highlighter.bound = [];
		
		if(!location.hash)
		{
			document.addEventListener('mouseover', Highlighter);
		}
		
		else
		{
			document.documentElement.classList.add('has-highlight');
			var hash = location.hash.replace('#', '');
			var elements = document.querySelectorAll('high-light[group^="' + hash + '"]');
			var iter = elements.length;
			while(iter-->0) elements[iter].classList.add('on');
		}
	},
	
	bound: [],
	
	handleEvent: function(event) { this[event.type](event); },
	mouseover: function(event) {
		var highlight = event.target.closest('high-light');
		if(!highlight) return;
		var group = highlight.getAttribute('group');
		if(!group) return;
		
		document.documentElement.classList.add('has-highlight');
		
		var elements = document.querySelectorAll('high-light[group^="' + group + '"]');
		var iter = elements.length;
		while(iter-->0) elements[iter].classList.add('on');
		
		highlight.addEventListener('mouseleave', this);
		Highlighter.bound.push(highlight);
	},
	
	mouseleave: function(event) {
		var highlight = event.target.closest('high-light');
		var group = highlight.getAttribute('group');
		if(!group) return;
		var elements = document.querySelectorAll('high-light[group^="' + group + '"]');
		var iter = elements.length;
		while(iter-->0) elements[iter].classList.remove('on');
		
		document.documentElement.classList.remove('has-highlight');
		
		highlight.removeEventListener('mouseleave', this);
		var index = Highlighter.bound.indexOf(highlight);
		if(index != -1) Highlighter.bound.splice(index, 1);
	}
};