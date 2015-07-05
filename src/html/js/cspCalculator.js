/*
$Revision$

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA

(c) Tim Brown, 2013
<mailto:timb@nth-dimension.org.uk>
<http://www.nth-dimension.org.uk/> / <http://www.machine.org.uk/>
*/

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
	"sandbox" ];
//report-uri

cspCalculator.appendIfNeeded = function(_directiveinput, _directiveaddition) {
	if (-1 === _directiveinput.value.indexOf(_directiveaddition)) {
		_directiveinput.value += _directiveaddition;
	}
}

cspCalculator.getRedirect = function(_url) {
	// will we be redirected
	// TODO unlikely - requires response analysis
	return _url;
}

// Firefox is gash and won't accept a full URL for a policy
cspCalculator.getProtocolDomain = function(_url) {
	matches = _url.match(/(.*?):\/\/(.*?)\//);
	if (null !== matches) {
		if ((matches[1] + "://" + matches[2]) === (document.location.protocol + "//" + document.domain)) {
			return "'self'";
		} else {
			return matches[1] + "://" + matches[2];
		}
	} else {
		return "'self'";
	}
}

cspCalculator.getDirectiveValue = function(_directivename) {
	cookies = document.cookie.split(";");
	for (cookieCounter = 0; cookieCounter < cookies.length; cookieCounter ++) {
		cookie = cookies[cookieCounter].trim().split("=");
		if (cookie[0] === _directivename) {
			return decodeURIComponent(cookie[1]);
		}
	}
}

cspCalculator.calculate = function(_event, _this) {
	switch (_this.id) {
		case "cspCalculatorCalculateButton-default-src":
			// all of the below
			break;
		case "cspCalculatorCalculateButton-connect-src":
			// script referenced XML HTTP request
			// TODO unlikely - requires script analysis
			// script referenced web socket
			// TODO unlikely - requires script analysis
			// script referenced event source
			// TODO unlikely - requires script analysis
			break;
		case "cspCalculatorCalculateButton-font-src":
			// CSS referenced font
			// TODO unlikely - requires style analysis
			break;
		case "cspCalculatorCalculateButton-frame-src":
			cspCalculatorDirectiveInput = document.getElementById("cspCalculatorDirectiveInput-frame-src");
			cspCalculatorDirectiveInput.value = "";
			frames = document.getElementsByTagName("frame");
			for (frameCounter = 0; frameCounter < frames.length; frameCounter ++) {
				cspCalculator.appendIfNeeded(cspCalculatorDirectiveInput, cspCalculator.getRedirect(cspCalculator.getProtocolDomain(frames[frameCounter].src)) + " ");
			}
			frames = document.getElementsByTagName("iframe");
			for (frameCounter = 0; frameCounter < frames.length; frameCounter ++) {
				cspCalculator.appendIfNeeded(cspCalculatorDirectiveInput, cspCalculator.getRedirect(cspCalculator.getProtocolDomain(frames[frameCounter].src)) + " ");
			}
			break;
		case "cspCalculatorCalculateButton-img-src":
			cspCalculatorDirectiveInput = document.getElementById("cspCalculatorDirectiveInput-img-src");
			cspCalculatorDirectiveInput.value = "";
			// img
			images = document.getElementsByTagName("img");
			for (imageCounter = 0; imageCounter < images.length; imageCounter ++) {
				cspCalculator.appendIfNeeded(cspCalculatorDirectiveInput, cspCalculator.getRedirect(cspCalculator.getProtocolDomain(images[imageCounter].src)) + " ");
			}
			// link
			links = document.getElementsByTagName("link");
			for (linkCounter = 0; linkCounter < links.length; linkCounter ++) {
				// TODO check it's an image
				cspCalculator.appendIfNeeded(cspCalculatorDirectiveInput, cspCalculator.getRedirect(cspCalculator.getProtocolDomain(links[linkCounter].href)) + " ");
			}
			// css referenced img
			// TODO unlikely - requires style analysis
			break;
		case "cspCalculatorCalculateButton-media-src":
			cspCalculatorDirectiveInput = document.getElementById("cspCalculatorDirectiveInput-media-src");
			cspCalculatorDirectiveInput.value = "";
			// video
			videos = document.getElementsByTagName("img");
			for (videoCounter = 0; videoCounter < videos.length; videoCounter ++) {
				cspCalculator.appendIfNeeded(cspCalculatorDirectiveInput, cspCalculator.getRedirect(cspCalculator.getProtocolDomain(videos[videoCounter].src)) + " ");
			}
			// audio
			audios = document.getElementsByTagName("audio");
			for (imageCounter = 0; imageCounter < audio.length; imageCounter ++) {
				cspCalculator.appendIfNeeded(cspCalculatorDirectiveInput, cspCalculator.getRedirect(cspCalculator.getProtocolDomain(audios[imageCounter].src)) + " ");
			}
			// source
			sources = document.getElementsByTagName("source");
			for (sourceCounter = 0; sourceCounter < sources.length; sourceCounter ++) {
				cspCalculator.appendIfNeeded(cspCalculatorDirectiveInput, cspCalculator.getRedirect(cspCalculator.getProtocolDomain(sources[sourceCounter].src)) + " ");
			}
			// track
			tracks = document.getElementsByTagName("track");
			for (trackCounter = 0; trackCounter < tracks.length; trackCounter ++) {
				cspCalculator.appendIfNeeded(cspCalculatorDirectiveInput, cspCalculator.getRedirect(cspCalculator.getProtocolDomain(tracks[trackCounter].src)) + " ");
			}
			break;
		case "cspCalculatorCalculateButton-object-src":
			cspCalculatorDirectiveInput = document.getElementById("cspCalculatorDirectiveInput-object-src");
			cspCalculatorDirectiveInput.value = "";
			// object
			objects = document.getElementsByTagName("object");
			for (objectCounter = 0; objectCounter < objects.length; objectCounter ++) {
				cspCalculator.appendIfNeeded(cspCalculatorDirectiveInput, cspCalculator.getRedirect(cspCalculator.getProtocolDomain(objects[objectCounter].data)) + " ");
			}
			// embed
			embeds = document.getElementsByTagName("embed");
			for (embedCounter = 0; embedCounter < embeds.length; embedCounter ++) {
				cspCalculator.appendIfNeeded(cspCalculatorDirectiveInput, cspCalculator.getRedirect(cspCalculator.getProtocolDomain(embeds[embedCounter].src)) + " ");
			}
			// applet
			applets = document.getElementsByTagName("applet");
			for (appletCounter = 0; appletCounter < applets.length; appletCounter ++) {
				cspCalculator.appendIfNeeded(cspCalculatorDirectiveInput, cspCalculator.getRedirect(cspCalculator.getProtocolDomain(applets[appletCounter].archive)) + " ");
			}
			break;
		case "cspCalculatorCalculateButton-script-src":
			cspCalculatorDirectiveInput = document.getElementById("cspCalculatorDirectiveInput-script-src");
			cspCalculatorDirectiveInput.value = "";
			// script
			scripts = document.getElementsByTagName("script");
			for (scriptCounter = 0; scriptCounter < scripts.length; scriptCounter ++) {
				if ("" === scripts[scriptCounter].src) {
					cspCalculator.appendIfNeeded(cspCalculatorDirectiveInput, "'unsafe-inline' ");
				} else {
					cspCalculator.appendIfNeeded(cspCalculatorDirectiveInput, cspCalculator.getRedirect(cspCalculator.getProtocolDomain(scripts[scriptCounter].src)) + " ");
				}
			}
			// xsl:include
			xslincludes = document.getElementsByTagName("xsl:include");
			for (xslincludeCounter = 0; xslincludeCounter < xslincludes.length; xslincludeCounter ++) {
				cspCalculator.appendIfNeeded(cspCalculatorDirectiveInput, cspCalculator.getRedirect(cspCalculator.getProtocolDomain(xslincludes[xslincludeCounter].href)) + " ");
			}
			// xsl:import
			xslimports = document.getElementsByTagName("xsl:import");
			for (xslimportCounter = 0; xslimportCounter < xslimports.length; xslimportCounter ++) {
				cspCalculator.appendIfNeeded(cspCalculatorDirectiveInput, cspCalculator.getRedirect(cspCalculator.getProtocolDomain(xslimports[xslimportCounter].href)) + " ");
			}
			// unsafe-eval
			// TODO unlikely - requires script analysis
			// script hashes
			// TODO unlikely - requires crypto in the browser
			break;
		case "cspCalculatorCalculateButton-style-src":
			cspCalculatorDirectiveInput = document.getElementById("cspCalculatorDirectiveInput-style-src");
			cspCalculatorDirectiveInput.value = "";
			// link
			links = document.getElementsByTagName("link");
			for (linkCounter = 0; linkCounter < links.length; linkCounter ++) {
				// TODO check it's a style sheet
				if ("" === links[linkCounter].href) {
					cspCalculator.appendIfNeeded(cspCalculatorDirectiveInput, "'unsafe-inline' ");
				} else {
					cspCalculator.appendIfNeeded(cspCalculatorDirectiveInput, cspCalculator.getRedirect(cspCalculator.getProtocolDomain(links[linkCounter].href)) + " ");
				}
			}
			// import
			// TODO unlikely - requires style analysis
			break;
	}
}

cspCalculator.apply = function(_event, _this) {
	for (directiveCounter = 0; directiveCounter < cspCalculator.directives.length; directiveCounter ++) {
		cspCalculatorDirectiveInput = document.getElementById("cspCalculatorDirectiveInput-" + cspCalculator.directives[directiveCounter]);
		document.cookie = cspCalculator.directives[directiveCounter] + "=" + escape(cspCalculatorDirectiveInput.value);
	}
}

cspCalculator.reset = function(_event, _this) {
	for (directiveCounter = 0; directiveCounter < cspCalculator.directives.length; directiveCounter ++) {
		document.cookie = cspCalculator.directives[directiveCounter] + "=";
	}
}

cspCalculator.show = function(_event, _this) {
	_this.style.height = "auto";
	_this.childNodes.item("cspCalculatorHeader").textContent = "cspCalculator <<";
}

cspCalculator.hide = function(_event, _this) {
	_this.style.height = "50px";
	_this.childNodes.item("cspCalculatorHeader").textContent = "cspCalculator >>";
}

cspCalculator.render = function() {
	cspCalculatorDiv = document.createElement("div");
	cspCalculatorDiv.id = "cspCalculatorDiv";
	cspCalculatorDiv.addEventListener("mouseenter", function(_event) { cspCalculator.show(_event, this); });
	cspCalculatorDiv.addEventListener("mouseleave", function(_event) { cspCalculator.hide(_event, this); });
	cspCalculatorHeader = document.createElement("h1");
	cspCalculatorHeader.id = "cspCalculatorHeader";
	cspCalculatorHeader.textContent = "cspCalculator >>";
	cspCalculatorDiv.appendChild(cspCalculatorHeader);
	cspCalculatorDisclaimer = document.createElement("p");
	cspCalculatorDisclaimer.textContent = "Automatically calculated policies may be incomplete as referenced resources are not themselves analysed - this includes any redirects that might occur when referenced resources are fetched. The best way to ensure you have a complete set of content security policies defined is to use the application, and ensure it functions as expected. As a guide, the *sandbox* and *script-src* *'self'* policies are only likely to be needed for cspCalculator itself to operate (assuming no other Javascript is in use on this page).";
	cspCalculatorDiv.appendChild(cspCalculatorDisclaimer);
	cspCalculatorForm = document.createElement("form");
	cspCalculatorForm.method = "POST";
	for (directiveCounter = 0; directiveCounter < cspCalculator.directives.length; directiveCounter ++) {
		cspCalculatorDirectiveLabel = document.createElement("p");
		cspCalculatorDirectiveLabel.textContent = cspCalculator.directives[directiveCounter];
		cspCalculatorForm.appendChild(cspCalculatorDirectiveLabel);
		cspCalculatorDirectiveInput = document.createElement("input");
		cspCalculatorDirectiveInput.id = "cspCalculatorDirectiveInput-" +cspCalculator.directives[directiveCounter];
		cspCalculatorDirectiveInput.type = "text";
		cspCalculatorDirectiveInput.value = cspCalculator.getDirectiveValue(cspCalculator.directives[directiveCounter]);
		cspCalculatorForm.appendChild(cspCalculatorDirectiveInput);
		cspCalculatorCalculateButton = document.createElement("button");
		cspCalculatorCalculateButton.id = "cspCalculatorCalculateButton-" + cspCalculator.directives[directiveCounter];
		cspCalculatorCalculateButton.type = "button";
		cspCalculatorCalculateButton.textContent = "Calculate";
		cspCalculatorCalculateButton.addEventListener("click", function(_event) { cspCalculator.calculate(_event, this); });
		cspCalculatorForm.appendChild(cspCalculatorCalculateButton);
	}
	cspCalculatorSubmitLabel = document.createElement("p");
	cspCalculatorSubmitLabel.textContent = "CSP";
	cspCalculatorForm.appendChild(cspCalculatorSubmitLabel);
	cspCalculatorApplySubmit = document.createElement("input");
	cspCalculatorApplySubmit.type = "submit";
	cspCalculatorApplySubmit.value = "Apply";
	cspCalculatorApplySubmit.addEventListener("click", function(_event) { cspCalculator.apply(_event, this); });
	cspCalculatorForm.appendChild(cspCalculatorApplySubmit);
	cspCalculatorResetSubmit = document.createElement("input");
	cspCalculatorResetSubmit.type = "submit";
	cspCalculatorResetSubmit.value = "Reset";
	cspCalculatorResetSubmit.addEventListener("click", function(_event) { cspCalculator.reset(_event, this); });
	cspCalculatorForm.appendChild(cspCalculatorResetSubmit);
	cspCalculatorDiv.appendChild(cspCalculatorForm);
	document.getElementsByTagName("body")[0].appendChild(cspCalculatorDiv);
}

cspCalculator.render();
