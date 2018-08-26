# -*- encoding:utf-8 -*-
from flask import Flask
from flask import request,jsonify
from server import train_med
import re
import requests  

appid = 'wx327191602fbc33e4'
appsecret = '2d046c1459e92b15609cbc7c748a5d59'

app = Flask(__name__)
global tfmodel
	
tfmodel = train_med.QA_MED()
tfmodel.model_built()


@app.route('/hello', methods=['POST'])
def hello():
	global tfmodel
	datax = request.form.to_dict()
	return tfmodel.welcome_msg(datax['user_name'])
	
@app.route('/ask')
def ask():
	global tfmodel
	return tfmodel.ask_msg()
	

	
@app.route('/type')
def choose_type():
	global tfmodel
	return tfmodel.get_department()

@app.route('/get_qa',methods=['POST'])
def get_question():
	global tfmodel
	datax = request.form.to_dict()
	openid = datax['openid']
	key_option = int(datax['key_option'])-1
	q_file = datax['q_file']
	user = datax['user_name']
	return tfmodel.get_similar_qa(key_option,q_file,user,openid)

@app.route('/return')
def back():
	global tfmodel
	return tfmodel.backToFirst()
	
@app.route('/error')
def error_msg():
	return "说话太高深，健康小医生看不懂您的话，请重新输入"



@app.route('/user/getuserinfo',methods=['POST'])
def getuserinfo():
    datax = request.form.to_dict()
    
    code = datax['code'].encode('utf8')
    
    url = 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code' % (appid, appsecret, code)
    r = requests.get(url)
    result = r.text
    openid = re.sub('([{}"]*)','', result.split(':')[-1].encode('utf8'))
    
    nickname = datax['nickname'].encode('utf8')
    gender = datax['gender'].encode('utf8')
    city = datax['city'].encode('utf8')
    
    tfmodel.write_user_info(openid,nickname,gender,city)
    
    return result

@app.route('/user/getgroup',methods=['POST'])
def getgroupinfo():
    datax = request.form.to_dict()
    
    openid = datax['openid'].encode('utf8')
    session_key = datax['session_key'].encode('utf8')
    en_data = datax['encryptedData'].encode('utf8')
    iv = datax['iv'].encode('utf8')
    share_type = datax['share_type'].encode('utf8')
    
    tfmodel.get_send_group(openid,appid,appsecret,session_key,en_data,iv,share_type)
    return 'ok'
    
    
    
if __name__ == '__main__':
	#global tfmodel
	app.run('0.0.0.0',port=5000)
