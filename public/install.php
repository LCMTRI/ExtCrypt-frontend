<?php

if (defined("ExtCrypt_VERSION")) {
	$checkbits = "11111";
	$sig = CONNECT($checkbits);
} else {
	die("ExtCrypt not loaded!");
}
