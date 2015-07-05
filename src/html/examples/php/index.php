<?php
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

	$directiveslist = array("default-src", "connect-src", "font-src", "frame-src", "img-src", "media-src", "object-src", "script-src", "style-src", "sandbox");
	// report-ui
	$headerslist =  array("Content-Security-Policy", "X-Content-Security-Policy", "X-WebKit-CSP");
	foreach ($directiveslist as $directivename) {
		if (!isset($_COOKIE[$directivename])) {
			$_COOKIE[$directivename] = "";
		}
	}
	$protocol = "http";
	if ($_SERVER["HTTPS"] != "") {
		$protocol = "https";
	}
	// not needed as we can use 'self'
	//if (!preg_match("/.*" . $protocol . "\:\/\/" . $_SERVER["SERVER_NAME"] . ":" . $_SERVER["SERVER_PORT"], urldecode($_COOKIE["script-src"]))) {
	//	$_COOKIE["script-src"] .= " " . $protocol . "://" . $_SERVER["SERVER_NAME"] . ":" . $_SERVER["SERVER_PORT"];
	//}
	if (!preg_match("/.*'self'.*/", urldecode($_COOKIE["script-src"]))) {
		$_COOKIE["script-src"] .= " 'self'";
	}
	if (!preg_match("/.*'self'.*/", urldecode($_COOKIE["style-src"]))) {
		$_COOKIE["style-src"] .= " 'self'";
	}
	if (!preg_match("/.*allow-forms.*/", urldecode($_COOKIE["sandbox"]))) {
		$_COOKIE["sandbox"] = " allow-forms";
	}
	if (!preg_match("/.*allow-same-origin.*/", urldecode($_COOKIE["sandbox"]))) {
		$_COOKIE["sandbox"] .= " allow-same-origin";
	}
	if (!preg_match("/.*allow-scripts.*/", urldecode($_COOKIE["sandbox"]))) {
		$_COOKIE["sandbox"] .= " allow-scripts";
	}
	if (!preg_match("/.*allow-top-navigation.*/", urldecode($_COOKIE["sandbox"]))) {
		$_COOKIE["sandbox"] .= " allow-top-navigation";
	}
	if ((!preg_match("/.*cspCalculator\.js.*/", urldecode($_COOKIE["contents"]))) || (!preg_match("/.*htmlEditor\.js.*/", urldecode($_COOKIE["contents"])))) {
		$_COOKIE["contents"] = rawurlencode("<html>
	<head>
		<title>cspCalculator</title>
		<link rel=\"stylesheet\" href=\"styles/about.css\" type=\"text/css\"/>
		<link rel=\"stylesheet\" href=\"styles/copyright.css\" type=\"text/css\"/>
		<link rel=\"stylesheet\" href=\"styles/cspCalculator.css\" type=\"text/css\"/>
		<link rel=\"stylesheet\" href=\"styles/htmlEditor.css\" type=\"text/css\"/>
	</head>
	<body>
		<script src=\"js/about.js\"></script>
		<script src=\"js/copyright.js\"></script>
		<script src=\"js/cspCalculator.js\"></script>
		<script src=\"js/htmlEditor.js\"></script>
		<img src=\"http://www.machine.org.uk/images/thug.jpeg\">
		<iframe src=\"http://comodosslstore.com/checksslcertificate.aspx\"></iframe>
		<img src=\"/icons/alert.red.png\">
		<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0\" id=\"http://www.welcometointernet.org/Jesus%20Cat.swf\">
			<param name=\"movie\" value=\"http://www.welcometointernet.org/Jesus%20Cat.swf\">
			<embed src=\"http://www.welcometointernet.org/Jesus%20Cat.swf\" name=\"http://www.welcometointernet.org/Jesus%20Cat.swf\" type=\"application/x-shockwave-flash\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\"></embed>
		</object>
	</body>
</html>");
	}
	foreach ($directiveslist as $directivename) {
		header("Set-Cookie: " . $directivename . "=" . $_COOKIE[$directivename], false);
	}
	header("Set-Cookie: contents=" . $_COOKIE["contents"], false);
	foreach ($headerslist as $headername) {
		$headervalue = "";
		foreach ($directiveslist as $directivename) {
			$headervalue .= "; " . $directivename . " " . $_COOKIE[$directivename];
		}
		header($headername . ": " . $headervalue);
	}
	echo urldecode($_COOKIE["contents"]);
?>
