<?php
namespace App\Http\Controllers\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests;
use DB;
//use Illuminate\Validation\Validator;
use Log;
use Config;
use App\Services\Response;
use Session;
use Illuminate\Support\Facades\Input;
use Validator;
use App\User;
use Illuminate\Support\Facades\Crypt;
use App\Http\Controllers\Auth\SmsController as sms;
use App\Models\Acount;
use Redirect;
use App\Validator\ValidatorData;
use Cache;
class userController extends Controller
{
    private $usertable;
    private $model;
    public function __construct()
    {
        $this->usertable='users';
        $this->model=new Acount();
    }

    /**
     * 用户登录
     * @param type 登录类型 1：普通登录；2：快捷登录
     * @param phone 手机号码
     * @param code 手机验证码
     * @param password 用户密码
     */
    public function getLogin(Request $request)
    {
        //ZH
        //SSS
        $data=$request->all();
        $type=Input::get('type');
        if($type=='1')
        {
            $rus=[
                'phone'=>'required | numeric',
                'password'=>'required',
                'type'=>'required',
            ];
            $mes=[
                'phone.required'=>'101100',
                'type.required'=>'101101',
                'password.required'=>'101102',

            ];
        }
        else
        {
            $rus=[
                'phone'=>'required | numeric',
                'type'=>'required',
                'code'=>'required',
            ];
            $mes=[
                'phone.required'=>'101100',
                'type.required'=>'101101',
                'code.required'=>'101103',
            ];
        }
        $validator=Validator::make($data,$rus,$mes);
        if($validator->fails()){
            return Response::getInstance()->response(['code'=>$validator->messages()->first()]);
        }
        $info=$this->model->getUser($data['phone']);
        if(!empty($info[0]))
        {
            if($info[0]->is_delete=='0')
            {
                return Response::getInstance()->response(['code'=>'101001']);
            }
            if($info[0]->is_display=='0' || $info[0]->is_display==null)
            {
                return Response::getInstance()->response(['code'=>'101003']);
            }
            if(!empty($data['token']) && $info[0]->_token!=$data['token'])
            {
                return Response::getInstance()->response(['code'=>'110008']);
            }
            if($type=='2')
            {
                $code=$data['code'];
                if(Cache::has($data['phone']))
                {
                    if($code!=Cache::get($data['phone']))
                    {
                        return Response::getInstance()->response(['code'=>'101004']);
                    }
                }
                else
                {
                    return Response::getInstance()->response(['code'=>'101004','msg'=>'验证码已过期，请重新发送']);
                }
            }
            else
            {
                if(empty($info[0]->password))
                {
                    return Response::getInstance()->response(['code'=>'101002','msg'=>'请使用快捷登录或重置密码']);
                }
                if(decrypt($info[0]->password)!=$data['password'])
                {
                    return Response::getInstance()->response(['code'=>'101002']);
                }
            }
            $user=[
                'id'=>strval($info[0]->id),
                'nickname'=>$info[0]->nickname,
                'logo'=>$info[0]->logo,
                'sex'=>$info[0]->sex,
                'birth'=>$info[0]->birth,
                'city'=>$info[0]->city,
                'follow'=>$this->getFollow($info[0]->id),
                'lastPhone'=>$this->getPhone($info[0]->id),
                'notice'=>$this->getNotice($info[0]->id),
//                '_token'=>$info[0]->_token,
            ];
            if($type==2 && empty($info[0]->password))
            {
                $user['registerType']='kj';
            }
        }
        else
        {
            if($type=='2')
            {
                $code=$data['code'];
                if(Cache::has($data['phone']))
                {
                    if($code!=Cache::get($data['phone']))
                    {
                        return Response::getInstance()->response(['code'=>'101004']);
                    }
                    else
                    {
                        $res=$this->model->insertUser([
                            'telephone'=>$data['phone'],
                            'created_at'=>date('Y-m-n H:i:s',time()),
                            'last_login'=>date('Y-m-n H:i:s',time()),
                            'nickname'=>$data['phone'],
                        ]);
                        if(!$res)
                        {
                            return Response::getInstance()->response(['code'=>'101008']);
                        }
                        Cache::forget($data['phone']);//注销验证码
                        $arr=[
                            'module_id'=>3,
                            'list_id'=>$res,
                            'status'=>'2',
                            'publish_at'=>date('Y-m-d H:i:s',time()),
                            'created_at'=>date('Y-m-d H:i:s',time()),
                        ];
                        $c=DB::table('publish_info')->insertGetId($arr);
                    }
                }
                else
                {
                    return Response::getInstance()->response(['code'=>'101004','msg'=>'验证码已过期，请重新发送']);
                }
            }
            else
            {
                return Response::getInstance()->response(['code'=>'101001']);
            }
            $user=[
                'id'=>strval($res),
                'nickname'=>$data['phone'],
                'logo'=>'',
                'sex'=>'',
                'birth'=>'',
                'city'=>'',
                'follow'=>$this->getFollow($res),
                'lastPhone'=>$this->getPhone($res),
                'notice'=>$this->getNotice($res),
            ];
            if($type==2)
            {
                $user['registerType']='kj';
            }
        }

        $token=substr(md5(time().rand(1000,9999)),-16);//登陆成功后生成token值
        $user['token']=strval($token);
        $d=DB::table($this->usertable)->where('telephone',$data['phone'])->update(['_token'=>$token,'last_login'=>date('Y-m-d H:i:s',time())]);
        return Response::getInstance()->response(['code'=>'101000','data'=>$user]);
    }

    //验证码验证
    public function getCodeverify()
    {
        $id=Input::get('id');
        $phone=Input::get('phone');
        $code=Input::get('code');
        $count=DB::table('radioreserve')->where('id',$id)->count();
        if($count<=0)
        {
            return Response::getInstance()->response(['code'=>'000008']);
        }
        try
        {
            if(Input::get('type')!='1')
            {
                if(Cache::has($phone))
                {
                    if($code!=Cache::get($phone))
                    {
                        return Response::getInstance()->response(['code'=>'101004']);
                    }
                }
                else
                {
                    return Response::getInstance()->response(['code'=>'101004','msg'=>'验证码已过期，请重新发送']);
                }
                Cache::forget($phone);
            }
            DB::table('radioreserve')->where('id',$id)->update(['phone'=>$phone]);
            return Response::getInstance()->response(['code'=>'000002','msg'=>'预约提醒绑定成功']);

        }
        catch (\Exception $e)
        {
            return Response::getInstance()->response(['code'=>'000005','msg'=>'预约提醒绑定失败']);
        }
    }

    public function getRegister(Request $request)
    {
        $rus=[
            'phone'=>'required | numeric',
            'password'=>'required',
            'nickname'=>'required',
            'code'=>'required',
        ];
        $mes=[
            'phone.required'=>'101100',
            'password.required'=>'101102',
            'nickname.required'=>'101104',
            'code.required'=>'101004',

        ];
        $data=$request->all();
        $validator=Validator::make($data,$rus,$mes);
        if($validator->fails()){
            return Response::getInstance()->response(['code'=>$validator->messages()->first()]);
        }
        $code=$data['code'];
        if(Cache::has($data['phone']))
        {
            if($code!=Cache::get($data['phone']))
            {
                return Response::getInstance()->response(['code'=>'101004']);
            }
        }
        else
        {
            return Response::getInstance()->response(['code'=>'101004','msg'=>'验证码已过期，请重新发送']);
        }
        $_token=substr(md5(time().rand(1000,9999)),-16);
        $arr=[
            'telephone'=>$data['phone'],
            'password'=>encrypt($data['password']),
            'nickname'=>$data['nickname'],
            'created_at'=>date('Y-m-n H:i:s',time()),
            'last_login'=>date('Y-m-n H:i:s',time()),
            '_token'=>$_token,
        ];
        $info=$this->model->insertUser($arr);
        $user=[
            'id'=>strval($info),
            'nickname'=>$data['phone'],
            'logo'=>'',
            'token'=>strval($_token),
        ];
        if($info)
        {
            Cache::forget($data['phone']);
            //写入publish_info表中
            $this->model->insertPublish([
                'module_id'=>3,
                'list_id'=>$info,
                'status'=>'2',
                'publish_at'=>date('Y-m-d H:i:s',time()),
                'created_at'=>date('Y-m-d H:i:s',time()),
            ]);
            return Response::getInstance()->response(['code'=>'000001','data'=>$user]);
        }
        else
        {
            return Response::getInstance()->response(['code'=>'000005']);
        }
    }

    /**
     * 短信验证码
     * @param type 1：注册时发送验证码 2：忘记密码时发生验证码,3:快速登陆发验证码  4：第三登陆绑定手机号码
     */

    public function getSendcode(Request $request)
    {
        $rus=[
            'phone'=>'required | numeric',
            'type'=>'required',
        ];
        $mes=[
            'phone.required'=>'101100',
            'type.required'=>'101101',

        ];
        if($request->get('type')=='4')
        {
            $rus=[
                'loginType'=>'required',
            ];
            $mes=[
                'loginType.required'=>'101100',

            ];
        }
        $data=$request->all();
        $validator=Validator::make($data,$rus,$mes);

        if($validator->fails()){
            return Response::getInstance()->response(['code'=>$validator->messages()->first()]);
        }
        $type=$data['type'];
        $info=$this->model->getUser($data['phone']);
        if($type=='1')//
        {
            if(!empty($info[0]) && $info[0]->is_delete!='0')
            {
                if($info[0]->is_display=='0')
                {
                    return Response::getInstance()->response(['code'=>'101003','msg'=>'该手机号码被禁用']);
                }
                return Response::getInstance()->response(['code'=>'101005']);
            }
        }
        elseif($type=='2')
        {
            if(empty($info[0]) || $info[0]->is_delete=='0')
            {
                return Response::getInstance()->response(['code'=>'101001']);
            }
            if($info[0]->is_display=='0' || $info[0]->is_display==null)
            {
                return Response::getInstance()->response(['code'=>'101003']);
            }
        }
        elseif($type=='4')
        {
            if(!empty($info[0]) && $info[0]->is_delete=='1' && $info[0]->is_display=='0')//手机号码禁用不能发短信
            {
                return Response::getInstance()->response(['code'=>'101003','msg'=>'该手机号码被禁用']);
            }
            $loginType=$data['loginType'];
            $re=DB::table('users as a')
                ->join('socialite_user as b','b.user_id','=','a.id')
                ->join('socialite as c','c.id','=','b.socialite_id')
                ->join('publish_info as d','d.list_id','=','a.id')
                ->select('a.id','a.telephone','d.is_display')
                ->where('c.type',$loginType)
                ->where('a.telephone',$data['phone'])
                ->where('d.module_id','3')
                ->where('d.is_delete','1')
                ->get();
            if(!empty($re[0]))
            {
                return Response::getInstance()->response(['code'=>'111000','msg'=>'该手机号码已绑定']);
            }
        }
        $sms=new sms();
        $mobile_code = $sms->random(4,1);
        Cache::put($data['phone'],$mobile_code,5);

//        Session::put(['code'=>$mobile_code]);
//        setcookie(session_id(),session_name(),time()+300);//设置有效期5分钟
        $content="您的短信验证码为".$mobile_code."，请妥善保管，如非本人操作，请不用理会。";
        $code=$sms->getCode($data['phone'],$content);
        if($code=='2')
        {
            return Response::getInstance()->response(['code'=>'101009']);
        }
        else
        {
            return Response::getInstance()->response(['code'=>$code]);
        }
    }

    //忘记密码
    public function getForgetpass(Request $request)
    {
        $rus=[
            'phone'=>'required | numeric',
            'password'=>'required',
            'code'=>'required',
        ];
        $mes=[
            'phone.required'=>'101100',
            'password.required'=>'101102',
            'code.required'=>'101103',

        ];
        $data=$request->all();
        $validator=Validator::make($data,$rus,$mes);
        if($validator->fails()){
            return Response::getInstance()->response(['code'=>$validator->messages()->first()]);
        }

        if(Cache::has($data['phone']))
        {
            if($data['code']!=Cache::get($data['phone']))
            {
                return Response::getInstance()->response(['code'=>'101004']);
            }
        }
        else
        {
            return Response::getInstance()->response(['code'=>'101004','msg'=>'验证码已过期，请重新发送']);
        }
        try
        {
            DB::table($this->usertable)->where('telephone',$data['phone'])->update(['password'=>encrypt($data['password'])]);
            Cache::forget($data['phone']);
            return Response::getInstance()->response(['code'=>'000002']);
        }
        catch(\Exception $e)
        {
            return Response::getInstance()->response(['code'=>'000006']);
        }

    }

    /**
     *第三方登陆
     * @param open_id 第三方sID
     * @param acount 用户名
     * @param logo 用户图像
     * @param city 城市
     * @param sex 性别
     * @param phone 手机号码
     * @param thirdType 登陆类型0：qq，1：微信，2：微博
     * */
    public function getThirdlogin(Request $request)
    {
        $rus=[
            'phone'=>'required | numeric',
            'acount'=>'required',
            'logo'=>'required',
//            'city'=>'required',
            'sex'=>'required',
            'open_id'=>'required',
            'third_type'=>'required',
//            'birth'=>'required',
            'code'=>'required',
        ];
        $mes=[
            'phone.required'=>'101100',
            'acount.required'=>'101105',
            'logo.required'=>'101106',
//            'city.required'=>'101107',
            'sex.required'=>'101108',
            'open_id.required'=>'101109',
            'third_type.required'=>'101110',
//            'birth.required'=>'101111',
            'code.required'=>'101103',

        ];
        $data=$request->all();
        $validator=Validator::make($data,$rus,$mes);

        if($validator->fails()){
            return Response::getInstance()->response(['code'=>$validator->messages()->first()]);
        }
        if(Cache::has($data['phone']))
        {
            if($data['code']!=Cache::get($data['phone']))
            {
                return Response::getInstance()->response(['code'=>'101004']);
            }
        }
        else
        {
            return Response::getInstance()->response(['code'=>'101004','msg'=>'验证码已过期，请重新发送']);
        }

        //开启事务
        DB::beginTransaction();
        try
        {
            //判断open_id是否存在,不存在就新建
            $open_id=DB::table('socialite')->where('open_id',$data['open_id'])->pluck('id');

            if(!empty($open_id[0]))
            {
                $res=$open_id[0];
            }
            else
            {
                //插入第三方表
                $info=[
                    'account'=>$data['acount'],
                    'open_id'=>$data['open_id'],
                    'logo'=>$data['logo'],
                    'type'=>$data['third_type'],
                    'created_at'=>date('Y-m-d H:i:s',time()),
                ];
                $res=DB::table('socialite')->insertGetId($info);
            }
            $token=substr(md5(time().rand(1000,9999)),-16);
            //判断手机号码是否存在，不存在就新建
            $user_id=DB::table('users as a')
                ->join('publish_info as b','b.list_id','=','a.id')
                ->select('a.*','b.is_display','b.is_delete')
                ->where('b.module_id',3)
                ->where('telephone',$data['phone'])
                ->where('b.is_display','1')
                ->where('is_delete','1')
                ->get();
            if(empty($user_id[0]))
            {
                $arr=[
                    'nickname'=>$data['phone'],
                    'logo'=>$data['logo'],
                    'city'=>$data['city'],
                    'sex'=>$data['sex'],
                    'telephone'=>$data['phone'],
                    'birth'=>$data['birth'],
                    '_token'=>$token,
                    'created_at'=>date('Y-m-d H:i:s',time()),
                    'last_login'=>date('Y-m-d H:i:s',time()),
                ];
                $userid=DB::table($this->usertable)->insertGetId($arr);
                $this->model->insertPublish([
                    'module_id'=>'3',
                    'list_id'=>$userid,
                    'status'=>'2',
                    'publish_at'=>date('Y-m-d H:i:s',time()),
                    'created_at'=>date('Y-m-d H:i:s',time()),
                ]);
                $user=[
                    'logo'=>$data['logo'],
                    'nickname'=>$data['phone'],
                    'city'=>$data['city'],
                    'sex'=>$data['sex'],
                    'birth'=>$data['birth'],
                    'telephone'=>$data['phone'],
                    'id'=>$userid,
                    'token'=>$token,
                    'follow'=>$this->getFollow($userid),
                    'lastPhone'=>$this->getPhone($userid),
                    'notice'=>$this->getNotice($userid),
                    'registerType'=>'kj',
                ];
            }
            else
            {
                $userid=$user_id[0]->id;
                DB::table('users')->where('id',$userid)->update(['_token'=>$token,'last_login'=>date('Y-m-d H:i:s',time())]);
                $user=[
                    'logo'=>$user_id[0]->logo,
                    'nickname'=>$user_id[0]->nickname,
                    'city'=>$user_id[0]->city,
                    'sex'=>$user_id[0]->sex,
                    'birth'=>$user_id[0]->birth,
                    'telephone'=>$data['phone'],
                    'id'=>$userid,
                    'token'=>$token,
                    'follow'=>$this->getFollow($userid),
                    'lastPhone'=>$this->getPhone($userid),
                    'notice'=>$this->getNotice($userid),
                ];
            }
            //关联表是否存在
            $so=DB::table('socialite_user')->where('socialite_id',$res)->count();
            if($so[0]>0)
            {
                DB::table('socialite_user')->where('socialite_id',$res)->update(['user_id'=>$userid]);
            }
            else
            {
                DB::table('socialite_user')->insert(['user_id'=>$userid,'socialite_id'=>$res]);
            }
            DB::commit();
            Cache::forget($data['phone']);
            return Response::getInstance()->response(['code'=>'101000','data'=>$user]);
        }
        catch (\Exception $e)
        {
            DB::rollback();
            info($e->getMessage());
            return Response::getInstance()->response(['code'=>'101008']);
        }

    }

    //app修改密码
    public function modifyPassword(Request $request)
    {
        $data=$request->all();
        $data['route']=$request->url();
        $host=env('SERVER_HOST');
        if(starts_with($data['route'],$host)){
            $route=substr($data['route'],strlen($host));
        }else{
            return Response::getInstance()->response(['code'=>'100004']);
        }

        $validator=ValidatorData::getInstance()->singleValidator($data);

        if($validator->fails()){
            return Response::getInstance()->response(['code'=>$validator->messages()->first()]);
        }
        $_token=Response::getInstance()->_token($route,$data['nonce']);
        if($data['_token']!=$_token)
        {
            return Response::getInstance()->response(['code'=>'110006']);
        }
        $userDate=DB::table('users')->join('publish_info as a','a.list_id','=','users.id')->select('users.id','users.password','a.is_display','a.is_delete')->where(['users.id'=>$data['user_id'],'a.module_id'=>'3','a.is_delete'=>'1'])->first();
        if(empty($userDate) || $userDate->is_delete=='0')
        {
            return Response::getInstance()->response(['code'=>'101001']);
        }
        elseif($userDate->is_display=='0' ||$userDate->is_display==null)
        {
            return Response::getInstance()->response(['code'=>'101003']);
        }
        if(!empty($data['newPass']))
        {
            $strlen=strlen($data['newPass']);
            if($strlen>20 || $strlen<6)
            {
                return Response::getInstance()->response(['code'=>'100003','msg'=>'密码长度控制在6-20个字符']);
            }
            if($data['newPass']==$data['oldPass'])
            {
                return Response::getInstance()->response(['code'=>'100003','msg'=>'原密码和新密码相同']);
            }
            if(!empty($userDate))
            {
                if(!empty($userDate->password))//当用户通过快捷登陆时密码为空
                {
                    if($data['oldPass']!=decrypt($userDate->password))
                    {
                        return Response::getInstance()->response(['code'=>'101002','msg'=>'原密码错误']);
                    }
                }
                else
                {
                    return Response::getInstance()->response(['code'=>'100003','msg'=>'快捷登陆的账号不能修改密码']);
                }
            }
            //修改原密码
            $res=DB::table('users')->where('id',$data['user_id'])->update(['password'=>encrypt($data['newPass'])]);
            if($res)
            {
                return Response::getInstance()->response(['code'=>'000002']);
            }
            else
            {
                return Response::getInstance()->response(['code'=>'000006']);
            }
        }
        else
        {
            return Response::getInstance()->response(['code'=>'100002','msg'=>'密码不能为空']);
        }
    }


    public function getThirdtoken(Request $request)//验证第三方是否绑定
    {
        $rus=[
            'open_id'=>'required',
        ];
        $mes=[
            'open_id.required'=>'101109',

        ];
        $data=$request->all();
        $validator=Validator::make($data,$rus,$mes);
        if($validator->fails()){
            return Response::getInstance()->response(['code'=>$validator->messages()->first()]);
        }
        $res=$this->model->getThirdData($data['open_id']);
        if(!empty($res[0]))
        {
            if($res[0]->is_display=='0')
            {
                return Response::getInstance()->response(['code'=>'101003']);
            }
            $res[0]->follow=$this->getFollow($res[0]->id);
            $res[0]->lastPhone=$this->getPhone($res[0]->id);
            $token=substr(md5(time().rand(1000,9999)),-16);//登陆成功后生成token值
            $res[0]->token=$token;
            DB::table($this->usertable)->where('telephone',$res[0]->telephone)->update(['_token'=>$token,'last_login'=>date('Y-m-d H:i:s',time())]);
            $pas=DB::table($this->usertable)->where('id',$res[0]->id)->pluck('password');
            if(empty($pas[0]))//如果绑定的手机号码是快捷登陆就返回该值
            {
                $res[0]->registerType='kj';
            }
            return Response::getInstance()->response(['code'=>'101000','data'=>$res[0]]);
//            return json_encode(array('code'=>'101000','msg'=>'登陆成功'));
        }
        else
        {
            return Response::getInstance()->response(['code'=>'101012']);
        }
    }

    //后台用户登录
    public function adminLogin(Request $request)
    {
        $rus=[
            'admin'=>'required',
            'password'=>'required',
            '_token'=>'required',
            'nonce'=>'required',
        ];
        $mes=[
            'admin.required'=>'101112',
            'password.required'=>'101102',
            '_token.required'=>'110005',
            'nonce.required'=>'110004',
        ];
        $data=$request->all();
        $data['route']=$request->url();
        $host=env('SERVER_HOST');
        if(starts_with($data['route'],$host)){
            $route=substr($data['route'],strlen($host));
        }else{
            return view('Admin.login')->with('msg',self::getMsg('100004'));
        }
        $validator=Validator::make($data,$rus,$mes);
        if($validator->fails()){
            return view('Admin.login')->with('msg',self::getMsg($validator->messages()->first()));
        }
        $_token=Response::getInstance()->_token($route,$data['nonce']);
        if($data['_token']!=$_token)
        {
            return Response::getInstance()->response(['code'=>'110006']);
        }
        $admin=DB::table('admins')->where(['name'=>$data['admin'],'is_display'=>'1'])->get();
        if(!empty($admin[0]))
        {
            if($data['password']===decrypt($admin[0]->password))
            {
                DB::table('admins')->where('id',$admin[0]->id)->update(['lastLogin'=>date('Y-m-d H:i:s',time()),'loginIp'=>$_SERVER['REMOTE_ADDR']]);
                Session::put([
                    'fmAdmin'=>$admin[0]->name,
                    'fmAdminId'=>$admin[0]->id,
                    'fmAdminLogo'=>$admin[0]->logo,
                ]);
                return redirect('/page/index');
            }
            else
            {
                return view('Admin.login')->with('msg',self::getMsg('101002'));
//
            }
        }
        else
        {
            return view('Admin.login')->with('msg',self::getMsg('101001'));
        }


    }

    public function loginOut(Request $request)
    {
        $request->session()->flush();
        return redirect('/Admin');
    }


    static public function getMsg($code)
    {
        $data=Response::getInstance()->response(['code'=>$code]);
        return json_decode($data->content())->msg;
    }

    public function getFollow($userid)//关注
    {
        $total=DB::table('anchor_user as a')->join('anchors','anchors.id','=','a.anchor_id')->where('a.user_id',$userid)->count();
        if(empty($total) && $total==null)
        {
            $total='0';
        }
        return $total;

    }
    public function getPhone($userId)
    {
        $phone=DB::table('radioreserve')->where('user_id',$userId)->where('phone','!=',null)->orderBy('id','desc')->take(1)->pluck('phone');
        if(empty($phone[0]))
        {
            $phone='';
        }
        else
        {
            $phone=$phone[0];
        }
        return $phone;
    }

    public function getNotice($userId)
    {
        $total=DB::table('app_leave_msg')->where('user_id',$userId)->where('repeat','!=',null)->where('is_read','0')->count();
        return $total;
    }
    public function getFollowCount(Request $request)
    {
        $data=$request->all();
        $data['route']=$request->url();
        $host=env('SERVER_HOST');
        if(starts_with($data['route'],$host)){
            $route=substr($data['route'],strlen($host));
        }else{
            return Response::getInstance()->response(['code'=>'100004']);
        }
        $validator=ValidatorData::getInstance()->singleValidator($data);

        if($validator->fails()){
            return Response::getInstance()->response(['code'=>$validator->messages()->first()]);
        }
        $_token=Response::getInstance()->_token($route,$data['nonce']);
        if($data['_token']!=$_token)
        {
            return Response::getInstance()->response(['code'=>'110006']);
        }
        $total=DB::table('anchor_user as a')->join('anchors','anchors.id','=','a.anchor_id')->where('a.user_id',$data['user_id'])->count();
        $notice=$this->getNotice($data['user_id']);
        return Response::getInstance()->response(['code'=>'000000','data'=>$total,'notice'=>$notice]);
    }

    //验证用户是否存在
    public function verifyUser(Request $request)
    {
        $user_id=$request->get('user_id');
        $count=DB::table('users as a')
            ->Join('publish_info as b','b.list_id','=','a.id')
            ->where('b.module_id',3)
            ->where('a.id',$user_id)
            ->where('b.is_delete','1')
            ->count();
        if($count>0)
        {
            return Response::getInstance()->response(['code'=>'000000']);
        }
        else
        {
            return Response::getInstance()->response(['code'=>'101001']);
        }

    }

}



?>