import cv2
import os

class Locate(object):
    def __init__(self,imgname="./in.jpg",xmlname="./Locate/cascade.xml"):
        self.__img=cv2.imread(imgname)
        cascade=cv2.CascadeClassifier(xmlname)
        self.__location=cascade.detectMultiScale(self.__img)

    def Cut(self):
        rec=cv2.imread("./in.jpg")
        for i,j,w,h in self.__location:
            cv2.rectangle(rec, (i, j),(i+w, j+h), (0, 0, 255), 2)
            cv2.imwrite("./rec.jpg",rec)
            img=self.__img[j:j+h,i:i+w].copy()
            cv2.imwrite("./out.jpg",img)
            return img

    def return_(self):
        return self.__location

if __name__ == '__main__':
    Test=Locate("./in.jpg")
    Test.Cut()
