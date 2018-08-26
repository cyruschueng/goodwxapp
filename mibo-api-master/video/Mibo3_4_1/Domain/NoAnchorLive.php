<?php
class Domain_NoAnchorLive extends Domain_Common {
    public function __construct() {
        parent::__construct();
        $this->model_no_anchor_live = new Model_NoAnchorLive();
    }

    public function getConfig($live_id) {
        return $this->model_no_anchor_live->getConfig($live_id);
    }



}