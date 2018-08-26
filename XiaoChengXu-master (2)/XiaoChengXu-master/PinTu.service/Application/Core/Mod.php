<?php

class Mod extends Frame_Mod{
	
	var $baseDB;
	var $partDB;
	
	function __construct(){
	    
	}
	
	static $base_table = array (
		'business','business_site','store'
	);
}