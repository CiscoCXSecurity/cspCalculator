/*
$Header: /var/lib/cvsd/var/lib/cvsd/cspCalculator/src/html/js/htmlEditor.js,v 1.1 2013-11-28 23:36:40 timb Exp $

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

htmlEditor = {};

htmlEditor.getContents = function() {
	cookies = document.cookie.split(";");
	for (cookieCounter = 0; cookieCounter < cookies.length; cookieCounter ++) {
		cookie = cookies[cookieCounter].trim().split("=");
		if ("contents" === cookie[0]) {
			return decodeURIComponent(cookie[1]);
		}
	}
}

htmlEditor.modify = function(_event, _this) {
	htmlEditorContentsTextArea = document.getElementById("htmlEditorContentsTextArea");
	alert(htmlEditorContentsTextArea.textContent);
	document.cookie = "contents=" + escape(htmlEditorContentsTextArea.value);
}

htmlEditor.reset = function(_event, _this) {
	document.cookie = "contents=";
}

htmlEditor.show = function(_event, _this) {
	_this.style.height = "auto";
	_this.childNodes.item("htmlEditorHeader").textContent = "htmlEditor <<";
}

htmlEditor.hide = function(_event, _this) {
	_this.style.height = "50px";
	_this.childNodes.item("htmlEditorHeader").textContent = "htmlEditor >>";
}

htmlEditor.render = function() {
	htmlEditorDiv = document.createElement("div");
	htmlEditorDiv.id = "htmlEditorDiv";
	htmlEditorDiv.addEventListener("mouseenter", function(_event) { htmlEditor.show(_event, this); });
	htmlEditorDiv.addEventListener("mouseleave", function(_event) { htmlEditor.hide(_event, this); });
	htmlEditorHeader = document.createElement("h1");
	htmlEditorHeader.id = "htmlEditorHeader";
	htmlEditorHeader.textContent = "htmlEditor >>";
	htmlEditorDiv.appendChild(htmlEditorHeader);
	htmlEditorDisclaimer = document.createElement("p");
	htmlEditorDisclaimer.textContent = "We allow you to modify the effective body as it is returned by the web server completely. Mind not to delete the cspCalculator.js and htmlEditor.js inclusions. We are aware that this allows cross-site scripting, which is why you're on a sandboxed document.domain!";
	htmlEditorDiv.appendChild(htmlEditorDisclaimer);
	htmlEditorForm = document.createElement("form");
	htmlEditorForm.method = "POST";
	htmlEditorContentsTextArea = document.createElement("textarea");
	htmlEditorContentsTextArea.id = "htmlEditorContentsTextArea";
	htmlEditorContentsTextArea.cols = 80;
	htmlEditorContentsTextArea.rows = 20;
	htmlEditorContentsTextArea.textContent = htmlEditor.getContents();
	htmlEditorForm.appendChild(htmlEditorContentsTextArea);
	htmlEditorSubmitLabel = document.createElement("p");
	htmlEditorSubmitLabel.textContent = "DOM";
	htmlEditorForm.appendChild(htmlEditorSubmitLabel);
	htmlEditorModifySubmit = document.createElement("input");
	htmlEditorModifySubmit.type = "submit";
	htmlEditorModifySubmit.value = "Modify";
	htmlEditorModifySubmit.addEventListener("click", function(_event) { htmlEditor.modify(_event, this); });
	htmlEditorForm.appendChild(htmlEditorModifySubmit);
	htmlEditorResetSubmit = document.createElement("input");
	htmlEditorResetSubmit.type = "submit";
	htmlEditorResetSubmit.value = "Reset";
	htmlEditorResetSubmit.addEventListener("click", function(_event) { htmlEditor.reset(_event, this); });
	htmlEditorForm.appendChild(htmlEditorResetSubmit);
	htmlEditorDiv.appendChild(htmlEditorForm);
	document.getElementsByTagName("body")[0].appendChild(htmlEditorDiv);
}

htmlEditor.render();
