<?php
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
	if (!preg_match("/.*'self.'*/", urldecode($_COOKIE["script-src"]))) {
		$_COOKIE["script-src"] .= " 'self'";
	}
	if ($_COOKIE["sandbox"] == "") {
		$_COOKIE["sandbox"] = " allow-forms";
		$_COOKIE["sandbox"] .= " allow-same-origin";
		$_COOKIE["sandbox"] .= " allow-scripts";
		$_COOKIE["sandbox"] .= " allow-top-navigation";
	}
	foreach ($directiveslist as $directivename) {
		header("Set-Cookie: " . $directivename . "=" . $_COOKIE[$directivename], false);
	}
	foreach ($headerslist as $headername) {
		$headervalue = "";
		foreach ($directiveslist as $directivename) {
			$headervalue .= "; " . $directivename . " " . $_COOKIE[$directivename];
		}
		header($headername . ": " . $headervalue);
	}
?>
<html>
<body>
<script src="../../js/cspCalculator.js"></script>
<img src="http://www.machine.org.uk/images/thug.jpeg">
<iframe src="http://sarpedon.local/"></iframe>
<img src="/icons/alert.red.png">
<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" id="http://www.welcometointernet.org/Jesus%20Cat.swf">
	<param name="movie" value="http://www.welcometointernet.org/Jesus%20Cat.swf">
	<embed src="http://www.welcometointernet.org/Jesus%20Cat.swf" name="http://www.welcometointernet.org/Jesus%20Cat.swf" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer">
	</embed>
</object>
</body>
</html>
