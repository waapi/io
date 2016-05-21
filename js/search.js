function Search() {
	var form = document.querySelector('form.search');
	var input = form.querySelector('input#search');
	var label = form.querySelector('label.search');
	var style = form.querySelector('style.search');
	var results = form.querySelector('ul.results');
	
	input.value = '';
	style.textContent = 'form.search ul.results li { display: none }';
	
	form.addEventListener('submit', function(event) {
		event.preventDefault();
	});
	
	if(HTMLElement.prototype.closest)
	{
		document.addEventListener('click', function(event) {
			if(!event.target.closest('form.search'))
			{
				input.value = '';
				style.textContent = 'form.search ul.results li { display: none }';
				document.documentElement.classList.remove('in-search');
			}
		});
	}
	
	document.addEventListener('keydown', function(event) {
		if(!event.defaultPrevented
		&& (event.key === 'f' || event.keyCode === 70)
		&& ((event.metaKey && !event.ctrlKey) || (event.ctrlKey && !event.metaKey))
		&& !event.shiftKey && !event.altKey) {
			event.preventDefault();
			
			input.focus();
		}
	});
	
	input.addEventListener('focus', function(event) {
		document.documentElement.classList.add('in-search');
	});
	
	input.addEventListener('blur', function(event) {
		document.documentElement.classList.remove('in-search');
	});
	
	results.addEventListener('focus', function(event) {
		results.classList.add('in-focus');
		document.documentElement.classList.add('in-search');
	}, true);
	
	results.addEventListener('blur', function(event) {
		results.classList.remove('in-focus');
		document.documentElement.classList.remove('in-search');
	}, true);
	
	
	
	
	
	input.addEventListener('input', function(event) {
		var value = input.value;
		if(!value) return style.textContent = 'form.search ul.results li { display: none }';
		
		values = value.toLowerCase().split(/(?: |\.)/);
		var primary = values[0];
		var secondary = values[1];
		
		if(typeof CSS !== 'undefined' && CSS.escape)
		{
			primary = CSS.escape(primary);
			if(secondary) secondary = CSS.escape(secondary);
		}
		
		if(primary && secondary === undefined)
			style.textContent = 'form.search ul.results li:not([data-primary*="' + primary + '"]), form.search ul.results li.secondary { display: none }';
		else if(primary && secondary === '')
			style.textContent = 'form.search ul.results li:not([data-primary*="' + primary + '"]) { display: none }';
		else if(primary && secondary)
			style.textContent = 'form.search ul.results li:not([data-primary*="' + primary + '"]), form.search ul.results li:not([data-secondary*="' + secondary + '"]) { display: none }';
	});
	
	waapi.index
	.sort(function(a, b) {
		return a.name.localeCompare(b.name, { usage: "search" });
	})
	.forEach(function(int) {
		var li = document.createElement('li');
		results.appendChild(li);
		li.className = 'primary';
		li.innerHTML = '<a href="/' + int.name + '/">'+/*<span class="type">' + int.type + '</span> */'<em class="name">' + int.name + '</em></a>';
		li.dataset.primary = int.type.toLowerCase() + ' ' + int.name.toLowerCase();
		
		if(int.type === 'interface')
		{
			var entries = [];
			if(int.attributes)
			{
				entries = entries.concat(int.attributes);
			}
			
			if(int.events)
			{
				entries = entries.concat(int.events);
			}
			
			if(int.methods)
			{
				entries = entries.concat(int.methods);
			}
			
			entries.forEach(function(entry) {
				var sli = document.createElement('li');
				results.appendChild(sli);
				sli.className = 'secondary';
				sli.innerHTML = '<a href="/' + int.name + '/#' + entry + '"><span class="name">' + int.name + '</span>.<em class="attribute">' + entry + '</em></a>';
				sli.dataset.primary = li.dataset.primary;
				sli.dataset.secondary = entry.toLowerCase();
			});
			
			li.dataset.secondary = entries.map(function(entry) { return entry.toLowerCase() }).join(' ');
		}
		
		else if(int.type === 'dictionary')
		{
			int.fields.forEach(function(field) {
				var sli = document.createElement('li');
				results.appendChild(sli);
				sli.className = 'secondary';
				sli.innerHTML = '<a href="/' + int.name + '/#' + field + '"><span class="name">' + int.name + '</span>.<em class="field">' + field + '</em></a>';
				sli.dataset.primary = li.dataset.primary;
				sli.dataset.secondary = field.toLowerCase();
			});
			
			li.dataset.secondary = int.fields.map(function(entry) { return entry.toLowerCase() }).join(' ');
		}
		
		else if(int.type === 'enum')
		{
			int.values.forEach(function(value) {
				var sli = document.createElement('li');
				results.appendChild(sli);
				sli.className = 'secondary';
				sli.innerHTML = '<a href="/' + int.name + '/#' + value + '"><span class="name">' + int.name + '</span>.<em class="value">' + value + '</em></a>';
				sli.dataset.primary = li.dataset.primary;
				sli.dataset.secondary = value.toLowerCase();
			});
			
			li.dataset.secondary = int.values.map(function(entry) { return entry.toLowerCase() }).join(' ');
		}
	});
	
	document.documentElement.classList.remove('no-search');
};

if(document.readyState === 'complete') Search();
else document.addEventListener('DOMContentLoaded', Search);
