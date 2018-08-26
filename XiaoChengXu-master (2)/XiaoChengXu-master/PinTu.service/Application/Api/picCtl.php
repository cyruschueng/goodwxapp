<?php

class Pic extends Ctl{
	
    public function upload(){


	$content = json_encode($_FILES);
        addLog([
            'content'=>$content,
            'file_name'=>'apple',
        ]);


        
        if(empty($_FILES['file'])){
            die('we need file!');
        }
        
        $file = $_FILES['file'];//得到传输的数据
        //得到文件名称
        $name = $file['name'];
        $type = strtolower(substr($name,strrpos($name,'.')+1)); //得到文件类型，并且都转化成小写
        $allow_type = array('jpg','jpeg','gif','png'); //定义允许上传的类型
        //判断文件类型是否被允许上传
        if(!in_array($type, $allow_type)){
            //如果不被允许，则直接停止程序运行
            return ;
        }
        //判断是否是通过HTTP POST上传的
        if(!is_uploaded_file($file['tmp_name'])){
            //如果不是通过HTTP POST上传的
            return ;
        }
        if($type){
            
        }
        $upload_path = $this->input['path'].'/'; //上传图片的存放路径  
        //开始移动文件到相应的文件夹
        if(move_uploaded_file($file['tmp_name'],PIC_PATH.$upload_path.$file['name'])){
            
            $this->load->MysqlDB('mysql0');
            
            $this->mysql0->update([
                'table'=>'t_user',
                'data'=>['logo'=>$upload_path.$file['name']],
                'where'=>"AND openid = '".$this->input['openid']."'",
            ]);
            
            $return = [
                'info'=> ['pic'=>$upload_path.$file['name']],
            ];
            $out = [
                'code'=>'200',
                'msg'=>'success',
                'data'=>$return,
            ];
            
            ajaxJson($out);
            
        }else{
            echo "Failed!";
        }
    }
    
}
