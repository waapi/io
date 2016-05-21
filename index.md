---
layout: article

---
<article class="index">
	<header class="landmark">
		<h1 class="title">
			<span class="type">reference</span>
			<span class="name">
				WAAPI.io
				<svg class="underline"><rect/></svg>
			</span>
		</h1>
	</header>
	<p>
		This is the technical reference for the Web Animations API
	</p>
	<p>
		The github repo is located at: <a class="inline" href="https://github.com/waapi/io">https://github.com/waapi/io</a>
	</p>
	<p>
		The site uses automatic document generation from the WebIDL in the specification, <a class="inline" href="/converter/webidl.html">sneak peek of the internals available here</a>
	</p>
	
	
	{% for cat in site.articles %}
	<h2>{{ cat }} definitions</h2>
	<ul class="index {{ cat }}">
		{% for page in site.pages
			%}{% if page.article == true
				%}{% for pc in page.categories
					%}{% if pc == cat
		%}<li><a href="{{ page.url }}">{{ page.title }}</a></li>{%
					endif
				%}{% endfor
			%}{% endif
		%}{% endfor %}
	</ul>
	{% endfor %}
</article>
