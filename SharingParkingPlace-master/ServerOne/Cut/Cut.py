import cv2
import numpy as np

class Cut(object):
    def __init__(self,img):
        self.__img=img
        self.__img=cv2.resize(self.__img,(440,140))
        self.__img=cv2.split(self.__img)
        self.__img=self.__img[2]
        self.__img=cv2.GaussianBlur(self.__img,(5,5),0)
        ret,self.__img=cv2.threshold(self.__img,self.__img.max()*0.7,255,0)

    def __caculateHigh(self,img, threshold=200, shape=(440, 140)):
        img = cv2.resize(img, shape)
        img = self.__skeleton(img)
        cv2.imwrite("./plate.jpg", img)
        result = []
        for i in range(img.shape[1]):
            count = 0
            for j in range(img.shape[0]):
                count += img[j][i]
            result.append(count)
        return result

    def __skeleton(self,img):
        size = np.size(img)
        skel = np.zeros(img.shape, np.uint8)
        img = cv2.medianBlur(img, 3)
        element = cv2.getStructuringElement(cv2.MORPH_CROSS, (3, 3))
        done = False
        while(not done):
            eroded = cv2.erode(img, element)
            temp = cv2.dilate(eroded, element)
            temp = cv2.subtract(img, temp)
            skel = cv2.bitwise_or(skel, temp)
            img = eroded.copy()
            zeros = size - cv2.countNonZero(img)
            if(zeros == size):
                done = True
        cv2.imwrite("skel.jpg",skel)
        return skel

    def __bestCutLine(self,point, k=1, threshold=3):
        nozero = []
        for i in range(len(point)):
            if ( point[i] >threshold):
                nozero.append(i)
        between = []
        for i in range(k, len(nozero)):
            if (abs(nozero[i - k] - nozero[i]) > 10):
                between.append([nozero[i - k], nozero[i]])
        line = []
        for i in between:
            line.append(int(i[0] + (i[1] - i[0]) / 2))
        return line

    def Cut(self):
        result=self.__bestCutLine(self.__caculateHigh(self.__img))
        print(result)
        img=[]
        
        #img1=self.__img[0:140,0:result[0]]
        img1=self.__img[0:140,0:70]
        img.append(img1)

        #img2=self.__img[0:140,result[0]:result[1]]
        img2=self.__img[0:140,70:120]
        img.append(img2)

        #img3=self.__img[0:140,result[1]:result[2]]
        img3=self.__img[0:140,140:200]
        img.append(img3)

        #img4=self.__img[0:140,result[2]:result[3]]
        img4=self.__img[0:140,200:260]
        img.append(img4)

        #img5=self.__img[0:140,result[3]:result[4]]
        img5=self.__img[0:140,260:320]
        img.append(img5)

        #img6=self.__img[0:140,result[4]:result[5]]
        img6=self.__img[0:140,320:380]
        img.append(img6)

        #img7=self.__img[0:140,result[5]:result[6]]
        img7=self.__img[0:140,380:440]
        img.append(img7)

        #img8=self.__img[0:140,result[6]:440]
        #img.append(img8)

        ##########Write in Disk###########
        cv2.imwrite("./Cut/1.jpg",img1) 
        cv2.imwrite("./Cut/2.jpg",img2)
        cv2.imwrite("./Cut/3.jpg",img3)
        cv2.imwrite("./Cut/4.jpg",img4)
        cv2.imwrite("./Cut/5.jpg",img5)
        cv2.imwrite("./Cut/6.jpg",img6)
        cv2.imwrite("./Cut/7.jpg",img7)      
        #cv2.imwrite("./Cut/8.jpg",img8)
 
        return img

if __name__ == '__main__':
    test=Cut()
    test.Cut()
