/*
$Header: /var/lib/cvsd/var/lib/cvsd/cspCalculator/src/html/js/copyright.js,v 1.1 2013-11-28 23:36:40 timb Exp $

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

copyright = {};

copyright.show = function(_event, _this) {
        _this.style.height = "auto";
        _this.childNodes.item("copyrightHeader").textContent = "Copyright <<";
}

copyright.hide = function(_event, _this) {
        _this.style.height = "50px";
        _this.childNodes.item("copyrightHeader").textContent = "Copyright >>";
}

copyright.render = function() {
	copyrightDiv = document.createElement("div");
	copyrightDiv.id = "copyrightDiv";
        copyrightDiv.addEventListener("mouseenter", function(_event) { copyright.show(_event, this); });
        copyrightDiv.addEventListener("mouseleave", function(_event) { copyright.hide(_event, this); });
	copyrightHeader = document.createElement("h1");
	copyrightHeader.id = "copyrightHeader";
	copyrightHeader.textContent = "Copyright >>";
	copyrightDiv.appendChild(copyrightHeader);
	copyrightContent = document.createElement("pre");
	copyrightContent.textContent = "This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 2 of the License, or (at your option) any later version.\n\nThis program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.\n\nYou should have received a copy of the GNU General Public License along with this program; if not, write to the Free Software Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA\n\n(c) Tim Brown, 2013\n<mailto:timb@nth-dimension.org.uk>\n<http://www.nth-dimension.org.uk/> / <http://www.machine.org.uk/>\n";
	copyrightDiv.appendChild(copyrightContent);
	document.getElementsByTagName("body")[0].appendChild(copyrightDiv);
}

copyright.render();
