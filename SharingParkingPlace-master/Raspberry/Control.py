import RPi.GPIO as GPIO   
import requests
import hashlib
import atexit   
import base64
import json
import time

class Control(object):
    def __init__(self,pin=21):
        atexit.register(GPIO.cleanup)    
        self.__servopin = pin
        GPIO.setmode(GPIO.BCM)  
        GPIO.setup(self.__servopin, GPIO.OUT, initial=False)  
        self.__p = GPIO.PWM(self.__servopin,50)
        self.__p.start(0)  
        time.sleep(2)  

    def __motor(self,angle):
        if(angle==90): 
            for i in range(0,91,10):  
                self.__p.ChangeDutyCycle(2.5 + 10 * i / 180) #设置转动角度  
                time.sleep(0.02)                      #等该20ms周期结束  
                self.__p.ChangeDutyCycle(0)                  #归零信号  
                time.sleep(0.2)  
        else:     
            for i in range(91,0,-10):  
                self.__p.ChangeDutyCycle(2.5 + 10 * i / 180)  
                time.sleep(0.02)  
                self.__p.ChangeDutyCycle(0)  
                time.sleep(0.2) 

    def __communicateServer(self):
        url="http://47.93.255.118"
        hardwareSN="hardwareSN="+"ABCDE12345"
        with open("./car.jpg","rb") as f:
            baseFile=base64.b64encode(f.readlines())
        file="picture="+baseFile
        result=requests.post(url+"/"+hardwareSN+"/"+file)
        return result.text.encode('utf-8')

    def __caculateHash(self,filepath):
        with open(filepath,'rb') as f:
            sha1obj = hashlib.sha1()
            sha1obj.update(f.read())
            hash = sha1obj.hexdigest()
            return hash

    def __checkHash(self,file="./car.jpg"):
        temp_hash=self.__caculateHash(file)
        while(True):
            midHash=self.__caculateHash(file)
            if(temp_hash!=midHash):
                temp_hash=midHash
                if(1==self.__communicateServer()):
                    self.__motor(90)
                    time.sleep(10)
                    self.__motor(-90)
                

if __name__=="__main__":
    test=Control()
