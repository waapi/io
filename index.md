---
layout: article

---
<article class="index">
	<header class="landmark">
		<h1 class="title">
			<span class="type">reference</span>
			<span class="name">
				WAAPI.io
				<svg class="underline"><rect fill="url('#wall')" width="100%" height="100%"/></svg>
			</span>
		</h1>
	</header>
	<p>
		This is the technical reference for the Web Animations API.
	</p>
	<p>
		The site uses automatic document generation from the WebIDL in the specification.
	</p>
	<p>
		The git repository for this site is located at: <a class="inline" href="https://github.com/waapi/io">https://github.com/waapi/io</a>
	</p>
	<p>
		Part of the <A href="http://waapi.org">WAAPI.org</a> network of sites.
	</p>
	
	
	{% for cat in site.articles %}
	<h2>{{ cat }} definitions</h2>
	<ul class="index {{ cat }}">
		{% for page in site.pages
			%}{% if page.article == true
				%}{% for pc in page.categories
					%}{% if pc == cat
		%}<li><a class="inline" href="{{ page.url }}">{{ page.title }}</a></li>{%
					endif
				%}{% endfor
			%}{% endif
		%}{% endfor %}
	</ul>
	{% endfor %}
</article>
