from Locate.Locate import *
from Cut.Cut import *
from Recognize.Recognize import *
import time

if __name__ == '__main__':
    start=time.clock()

    L=Locate()
    img=L.Cut()

    C=Cut(img)
    all_img=C.Cut()

    R=Recognize()
    result=""
    for i in range(len(all_img)):
        #if(i!=2):
        result=result+R.SimplePredict(all_img[i],i)
        
    print(result)
    print(time.clock()-start)
