jQuery(document).ready(function() {
	function osAuthorpluginsEscapeHtml(str) {
		return String(str == null ? '' : str).replace(/[&<>"']/g, function(m) {
			return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
		});
	}

	function osAuthorpluginsSanitizeUrl(url) {
		var u = String(url == null ? '' : url).trim();
		return (/^https?:\/\//i.test(u)) ? u : '#';
	}

	jQuery("#authorplugins-start").on('click', function() {
		jQuery("#authorplugins-wrap").hide();
		jQuery.ajax({ 
			dataType: 'jsonp',
			jsonp: 'jsonp_callback',
			url: window.location.protocol + '//www.schloebe.de/api_portfolio.php?cat=wordpress',
			success: function (j) {
				if (!j || !j.plugins) { return; }
				jQuery.each(j.plugins, function(i,plugin) {
					var url = osAuthorpluginsSanitizeUrl(plugin.os_script_info_url);
					var title = osAuthorpluginsEscapeHtml(plugin.os_script_title);
					var version = osAuthorpluginsEscapeHtml(plugin.os_script_version);
					jQuery('#authorpluginsul').append( '<li><a href="' + url + '" target="_blank" rel="noopener noreferrer"><span class="post">' + title + '</span><span class="hidden"> - </span><cite>version ' + version + '</cite></a></li>' ).css("display", "none").fadeIn("slow");
				});
			}
		});
	});
});