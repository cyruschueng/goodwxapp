<?php
class Domain_Ad extends Domain_Common {
    public function __construct() {
        parent::__construct();
    }

   public function getAd() {
       $model_ad = new Model_Ad();
       $ad = $model_ad->getList();
       return $ad;
   }



}