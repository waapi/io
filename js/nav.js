var sitemap = {
	'Core': [
		{
			label: 'Animation',
// 			href: '/animation/',
			icon: 'playlist_play' // Trying to make the metaphor of a video player kinda
		},
		{
			label: 'Timeline',
// 			href: '/timeline/',
			icon: 'timeline'
		}
	],
	
	'Effects': [
		{
			label: 'KeyframeEffect',
			href: '/effects/keyframe/',
			icon: 'linear_scale'
		},
		{
			label: 'GroupEffect',
// 			href: '/effects/group/',
			icon: 'format_list_bulleted'
		},
		{
			label: 'SequenceEffect',
// 			href: '/effects/sequence/',
			icon: 'format_list_numbered'
		}
	],
	
	'Extensions': [
		{
			label: 'document.timeline',
// 			href: '/document/timeline/',
			icon: 'access_time' // Imply a 'global clock'
		},
		{
			label: 'element.animate',
// 			href: '/element/animate/',
			icon: 'gesture' // Closest I could find implying motion/dynamic; screen_rotation also?
		},
		{
			label: 'element.getAnimations',
// 			href: '/element/getAnimations/',
			icon: ''
		}
	]
};

document.addEventListener('DOMContentLoaded', function() {
	var nav = document.querySelector('nav.global');
	nav.innerHTML = '<h1><a href="/">API Index</a></h1>' + Object.keys(sitemap).map(function(heading) {
		var column = sitemap[heading];
		return '<div class="column"><h2>' + heading + '</h2><ul>' +
			Object.keys(column).map(function(name) {
				var item = column[name];
				var html = ['<li><a'];
				if(item.href)
				{
					if(item.href === location.pathname)
						html.push(' class="current"');
					
					html.push(' href="', item.href, '"');
				}
				if(item.icon) html.push(' data-icon="', item.icon, '"');
				html.push('>', item.label, '</a>');
				return html.join('');
			}).join('') +
		'</ul></div>';
	}).join('');
});
