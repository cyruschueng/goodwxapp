import RPi.GPIO as GPIO   
import atexit  
import serial  
import time
import os

class Detect(object):
    def __init__(self,pin=21):
        pass

    def __detect(self):
        ser = serial.Serial("/dev/ttyAMA0", 9600)  
        while(True):  
            count = ser.inWaiting()  
            if(count!= 0):  
                recv = ser.read(count)  
                if("1" in recv):
                    return 1
            ser.flushInput()  


    def __takePhoto(self):
        os.system("raspistill -t 0 -o ./car.jpg -q 5 -cfx 128:128") 

    def run(self):
        while(True):
            self.__detect()
            self.__takePhoto()
            time.sleep(0.5)


if __name__=="__main__":
    test=Detect()
