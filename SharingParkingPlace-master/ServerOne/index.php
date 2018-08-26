<?php
    set_time_limit(0);
    $output = shell_exec("python main.py");
    sleep(10);
    //$output=shell_exec("python ./test.py");
    var_dump($output);
