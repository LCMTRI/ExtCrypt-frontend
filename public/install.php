<?php if (defined("ExtCrypt_VERSION")) {
	$checkbits = "10010";
	$sig = CONNECT($checkbits);
} else {
	die("ExtCrypt not loaded!");
}
