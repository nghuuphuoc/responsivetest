/**
 * ResponsiveTest
 * 
 * @author		Nguyen Huu Phuoc [http://nextcms.org]
 * @copyright	APL Solutions [http://apl.vn]
 * @link		http://responsivetest.net
 */

/**
 * Constructor
 * 
 * @param {String} id The Id of container
 * The markup have to be:
 * 
 * <div id="{{id}}">
 * 		<iframe id="{{id}}Frame"></iframe>
 * </div>
 */
function Responsive(id) {
	this._id = id;
	
	var frame = $("#" + this._id + "Frame");
	$(frame).hide();
	
	// Add loader element
	$("<div/>").attr("id", this._id + "Loader")
			   .addClass("app-loader")
			   .appendTo($("#" + this._id));
	
	// Hide the main frame
	var loader = $("#" + this._id + "Loader");
	$(frame).hide().load(function() {
		// Hide the loader
		$(loader).hide("fast");
		
		// Show the frame after loading its content
		$(frame).show();
	});
	
	// Auto detect the current device
	// TODO: Support more device agents
	this._device = "d";	
	switch (true) {
		// Tablet
		case (navigator.platform.indexOf("iPhone") != -1):
			this._device = "t";
			break;
		// Phone
		case (navigator.platform.indexOf("iPod") != -1):
			this._device = "p";
			break;
		// Desktop
		default:
			this._device = "d";
			break;
	}
	
	// Supported sizes, ordered by width
	this._supportedSizes = [
		[240, 320], [295, 515], [320, 240], [320, 480], [480, 320], [515, 295],
		[600, 1024], [768, 1024], [1024, 600],
		[1024, 768], [1280, 800], [1366, 768]
		// , [1440, 900], [1680, 1050], [1920, 1080]
	];
	
	// Get the current resolution
	var width = $(window).innerWidth(), height = $(window).innerHeight();
	
	this._width  = 1024;
	this._height = 768;
	var i = 0, n = this._supportedSizes.length;
	for (i = 0; i < n; i++) {
		if (this._supportedSizes[i][0] <= width && ((i < n - 1 && width <= this._supportedSizes[i + 1][0]) || (i == n - 1))) {
			this._width  = this._supportedSizes[i][0];
			this._height = this._supportedSizes[i][1];
		}
	}
	
	this._url = "";
	if (window.location.hash && "#u=" == window.location.hash.substr(0, 3)) {
		var query = window.location.hash.substring(3);
		if (query.indexOf("|") == -1) {
			this._url = query;
		} else {
			var array    = query.split("|");
			this._device = array[0];
			this._width  = array[1];
			this._height = array[2];
			this._url	 = array[3];
		}
	}
};

Responsive.prototype = {
	/**
	 * Sets the device
	 * 
	 * @param {String} device Can be "d" (desktop), "t" (tablet), "p" (smart phone)
	 * @returns {Responsive}
	 */
	setDevice: function(device) {
		this._device = device;
		return this;
	},
	
	/**
	 * Sets height of the iframe showing the destination website
	 * 
	 * @param {Int} height
	 * @returns {Responsive}
	 */
	setHeight: function(height) {
		this._height = height;
		return this;
	},
	
	/**
	 * Sets width of the iframe showing the destination website
	 * 
	 * @param {Int} width
	 * @returns {Responsive}
	 */
	setWidth: function(width) {
		this._width = width;
		return this;
	},
	
	/**
	 * Sets URL of the iframe showing the destination website
	 * 
	 * @param {String} url
	 * @returns {Responsive}
	 */
	setUrl: function(url) {
		this._url = this._formatUrl(url);
		return this;
	},
	
	/**
	 * Gets the URL of destination website
	 * 
	 * @returns {String}
	 */
	getUrl: function() {
		return this._url;
	},
	
	/**
	 * Browses the current site
	 * 
	 * @returns {Responsive}
	 */
	browse: function() {
		$("#" + this._id).attr("class", "app-device-wrapper app-device-" + this._device + "x" + this._width + "x" + this._height);

		var frame	   = $("#" + this._id + "Frame");
		var currentUrl = $(frame).attr("src");
		if (this._url && this._url != currentUrl) {
			// Hide the frame
			$(frame).hide();
			
			// Show the loader
			$("#" + this._id + "Loader").width($(frame).width())
										.height($(frame).height())
									    .show("fast");
			
	    	// Update the frame
			$(frame).attr("src", this._formatUrl(this._url));
		}
		return this;
	},
	
	/**
	 * Browses a site taken from given list randomly
	 * 
	 * @param {Array} urls
	 * @returns {Responsive}
	 */
	browseRandom: function(urls) {
		this._url = urls[Math.floor(Math.random() * urls.length)];
		return this.browse();
	},
	
	/**
	 * Updates hash
	 * 
	 * @returns {Responsive}
	 */
	updateHash: function() {
		var scrollV, scrollH, loc = window.location, path = [this._device, this._width, this._height, this._url].join("|");
//		if ("pushState" in history) {
//			// HTML 5
//			history.pushState("", document.title, loc.pathname + "#u=" + path);
//		} else {
			scrollV = document.body.scrollTop;
			scrollH = document.body.scrollLeft;
			loc.hash = "#u=" + path;
			document.body.scrollTop = scrollV;
			document.body.scrollLeft = scrollH;
//		}
		return this;
	},

	/**
	 * Normalizes a given URL
	 * 
	 * @param {String} url The given URL
	 * @returns {String}
	 */
	_formatUrl : function(url) {
		if ("http://" == url.substr(0, 7) || "https://" == url.substr(0, 8)) {
			return url;
		} else {
			return "http://" + url;
		}
	}
};
