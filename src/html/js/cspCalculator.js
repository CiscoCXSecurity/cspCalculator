cspCalculator = {};

cspCalculator.directives = [ "default-src",
"connect-src",
"font-src",
"frame-src",
"img-src",
"media-src",
"object-src",
"script-src",
"style-src",
"sandbox"];
//report-uri

cspCalculator.getDirectiveValue = function(_directivename) {
	cookies = document.cookie.split(";");
	for (cookieCounter = 0; cookieCounter < cookies.length; cookieCounter ++) {
		cookie = cookies[cookieCounter].trim().split("=");
		if (cookie[0] == _directivename) {
			return unescape(cookie[1]);
		}
	}
}

// Firefox is gash and won't accept a full URL for a policy
cspCalculator.getProtocolDomain = function(_url) {
	var matches = _url.match(/(.*?):\/\/(.*?)\//);
	if (matches) {
		if ((matches[1] + "://" + matches[2]) == (document.location.protocol + "//" + document.domain)) {
			return "'self'";
		} else {
			return matches[1] + "://" + matches[2];
		}
	} else {
		return "'self'";
	}
}

cspCalculator.calculate = function(event) {
	switch (event.target.id) {
		case "calculate-default-src":
			// all of the below
			break;
		case "calculate-connect-src":
			// script referenced XML HTTP request
			// TODO unlikely - requires script analysis
			// script referenced web socket
			// TODO unlikely - requires script analysis
			// script referenced event source
			// TODO unlikely - requires script analysis
			break;
		case "calculate-font-src":
			// css referenced font
			// TODO unlikely - requires style analysis
			break;
		case "calculate-frame-src":
			directiveInput = document.getElementById("frame-src");
			directiveInput.value = "";
			frames = document.getElementsByTagName("frame");
			for (frameCounter = 0; frameCounter < frames.length; frameCounter ++) {
				directiveInput.value += cspCalculator.getProtocolDomain(frames[frameCounter].src) + " ";
			}
			frames = document.getElementsByTagName("iframe");
			directiveInput = document.getElementById("frame-src");
			for (frameCounter = 0; frameCounter < frames.length; frameCounter ++) {
				directiveInput.value += cspCalculator.getProtocolDomain(frames[frameCounter].src) + " ";
			}
			break;
		case "calculate-img-src":
			directiveInput = document.getElementById("img-src");
			directiveInput.value = "";
			// img
			images = document.getElementsByTagName("img");
			for (imageCounter = 0; imageCounter < images.length; imageCounter ++) {
				directiveInput.value += cspCalculator.getProtocolDomain(images[imageCounter].src) + " ";
			}
			// link
			links = document.getElementsByTagName("link");
			for (linkCounter = 0; linkCounter < links.length; linkCounter ++) {
				// TODO check it's an image
				directiveInput.value += cspCalculator.getProtocolDomain(links[linkCounter].href) + " ";
			}
			// css referenced img
			// TODO unlikely - requires style analysis
			break;
		case "calculate-media-src":
			// video
			videos = document.getElementsByTagName("img");
			for (videoCounter = 0; videoCounter < videos.length; videoCounter ++) {
				directiveInput.value += cspCalculator.getProtocolDomain(videos[videoCounter].src) + " ";
			}
			// audio
			audios = document.getElementsByTagName("audio");
			for (imageCounter = 0; imageCounter < audio.length; imageCounter ++) {
				directiveInput.value += cspCalculator.getProtocolDomain(audios[imageCounter].src) + " ";
			}
			// source
			sources = document.getElementsByTagName("sorce");
			for (sourceCounter = 0; sourceCounter < sources.length; sourceCounter ++) {
				directiveInput.value += cspCalculator.getProtocolDomain(sources[sourceCounter].src) + " ";
			}
			// track
			tracks = document.getElementsByTagName("track");
			for (trackCounter = 0; trackCounter < tracks.length; trackCounter ++) {
				directiveInput.value += cspCalculator.getProtocolDomain(tracks[trackCounter].src) + " ";
			}
			break;
		case "calculate-object-src":
			directiveInput = document.getElementById("object-src");
			directiveInput.value = "";
			// object
			objects = document.getElementsByTagName("object");
			for (objectCounter = 0; objectCounter < objects.length; objectCounter ++) {
				directiveInput.value += cspCalculator.getProtocolDomain(objects[objectCounter].data) + " ";
			}
			// embed
			embeds = document.getElementsByTagName("embed");
			for (embedCounter = 0; embedCounter < embeds.length; embedCounter ++) {
				directiveInput.value += cspCalculator.getProtocolDomain(embeds[embedCounter].src) + " ";
			}
			// applet
			applets = document.getElementsByTagName("applet");
			for (appletCounter = 0; appletCounter < applets.length; appletCounter ++) {
				directiveInput.value += cspCalculator.getProtocolDomain(applets[appletCounter].archive) + " ";
			}
			break;
		case "calculate-script-src":
			directiveInput = document.getElementById("script-src");
			directiveInput.value = "";
			// script
			scripts = document.getElementsByTagName("script");
			for (scriptCounter = 0; scriptCounter < scripts.length; scriptCounter ++) {
				directiveInput.value += cspCalculator.getProtocolDomain(scripts[scriptCounter].src) + " ";
			}
			// xsl:include
			xslincludes = document.getElementsByTagName("xsl:include");
			for (xslincludeCounter = 0; xslincludeCounter < xslincludes.length; xslincludeCounter ++) {
				directiveInput.value += cspCalculator.getProtocolDomain(xslincludes[xslincludeCounter].href) + " ";
			}
			// xsl:import
			xslimports = document.getElementsByTagName("xsl:import");
			for (xslimportCounter = 0; xslimportCounter < xslimports.length; xslimportCounter ++) {
				directiveInput.value += cspCalculator.getProtocolDomain(xslimports[xslimportCounter].href) + " ";
			}
			// unsafe-eval
			// TODO unlikely - requires script analysis
			// unsafe-inline
			// TODO unlikely - requires script analysis
			break;
		case "calculate-style-src":
			// link
			links = document.getElementsByTagName("link");
			directiveInput = document.getElementById("style-src");
			directiveInput.value = "";
			for (linkCounter = 0; linkCounter < links.length; linkCounter ++) {
				// TODO check it's a style sheet
				directiveInput.value += cspCalculator.getProtocolDomain(links[linkCounter].href) + " ";
			}
			// import
			// TODO unlikely - requires style analysis
			break;
	}
}

cspCalculator.submit = function() {
	for (directiveCounter = 0; directiveCounter < cspCalculator.directives.length; directiveCounter ++) {
		directiveInput = document.getElementById(cspCalculator.directives[directiveCounter]);
		document.cookie = cspCalculator.directives[directiveCounter] + "=" + escape(directiveInput.value);
	}
}

cspCalculator.render = function() {
	cspCalculatorDiv = document.createElement("div");
	cspCalculatorDiv.setAttribute("id", "cspCalculator");
	disclaimer = document.createElement("p");
	disclaimerLabel = document.createTextNode("Automatically calculated policies may be incomplete as referenced resources are not themselves analysed. The best way to ensure you have a complete set of content security policies defined is to use the application, and ensure it functions as expected. As a guide, the *sandbox* and *script-src* *'self'* policies are only likely to be needed for cspCalculator itself to operate (assuming no other Javascript is in use on this page).");
	disclaimer.appendChild(disclaimerLabel);
	form = document.createElement("form");
	form.setAttribute("method", "POST");
	for (directiveCounter = 0; directiveCounter < cspCalculator.directives.length; directiveCounter ++) {
		directive = document.createElement("p");
		directiveLabel = document.createTextNode(cspCalculator.directives[directiveCounter]);
		directive.appendChild(directiveLabel);
		directiveInput = document.createElement("input");
		directiveInput.setAttribute("type", "text");
		directiveInput.setAttribute("id", cspCalculator.directives[directiveCounter]);
		directiveInput.setAttribute("value", cspCalculator.getDirectiveValue(cspCalculator.directives[directiveCounter]));
		directive.appendChild(directiveInput);
		calculateButton = document.createElement("button");
		calculateButton.addEventListener("click", function(event) { cspCalculator.calculate(event); }, true);
		calculateButton.setAttribute("type", "button");
		calculateButton.setAttribute("id", "calculate-" + cspCalculator.directives[directiveCounter]);
		calculateLabel = document.createTextNode("Calculate");
		calculateButton.appendChild(calculateLabel);
		directive.appendChild(calculateButton);
		form.appendChild(directive);
	}
	submit = document.createElement("p");
	submitInput = document.createElement("input");
	submitInput.addEventListener("click", function() { cspCalculator.submit(); }, true);
	submitInput.setAttribute("type", "submit");
	submitInput.setAttribute("value", "Regenerate");
	submit.appendChild(submitInput);
	form.appendChild(submit);
	cspCalculatorDiv.appendChild(disclaimer);
	cspCalculatorDiv.appendChild(form);
	document.getElementsByTagName("body")[0].appendChild(cspCalculatorDiv);
}

cspCalculator.render();
