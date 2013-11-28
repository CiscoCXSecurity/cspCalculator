/*
$Header: /var/lib/cvsd/var/lib/cvsd/cspCalculator/src/html/js/about.js,v 1.1 2013-11-28 23:36:40 timb Exp $

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

about = {};

about.show = function(_event, _this) {
	_this.style.height = "auto";
	_this.childNodes.item("aboutHeader").textContent = "About cspCalculator <<";
}

about.hide = function(_event, _this) {
	_this.style.height = "50px";
	_this.childNodes.item("aboutHeader").textContent = "About cspCalculator >>";
}

about.render = function() {
	aboutDiv = document.createElement("div");
	aboutDiv.id = "aboutDiv";
	aboutDiv.addEventListener("mouseenter", function(_event) { about.show(_event, this); });
	aboutDiv.addEventListener("mouseleave", function(_event) { about.hide(_event, this); });
	aboutHeader = document.createElement("h1");
	aboutHeader.id = "aboutHeader";
	aboutHeader.textContent = "About cspCalculator >>";
	aboutDiv.appendChild(aboutHeader);
	aboutContent = document.createElement("p");
	aboutContent.innerHTML = "cspCalculator is a PoC implementation of a dynamic <a href=\"http://en.wikipedia.org/wiki/Content_Security_Policy\">Content Security Policy</a> creator. The aim here is to minimise the leg work for UX developers in creating web applications that both function and utilise secure devlopment practices. We do this by reducing the server side code changes down to the injection of some client side JavaScript along with a few lines of server side stub code (in this case, in PHP). Once this has been integrated into application in a staging environment, the UX developer can tweak the CSP from their own browser and see how it affects the application functionality :).";
	aboutDiv.appendChild(aboutContent);
	document.getElementsByTagName("body")[0].appendChild(aboutDiv);
}

about.render();
