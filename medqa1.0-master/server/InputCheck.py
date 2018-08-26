# -*- encoding:utf-8 -*-
import string
import re

# 有效性检查函数
class Check(object):
    def __init__(self):
        # 有效长度
        self.alphas = string.letters
        self.nums = nums = string.digits
        self.zhPattern = re.compile(u'[\u4e00-\u9fa5]+')
        
    def valid_input(self,str,str_length=5,max_str=100,include_num = True,include_eng=True,include_chn = True):
        if len(str) < str_length or len(str) > max_str:
            return False
        
        if not include_num:
            for num in self.nums:
                if num in str:
                    return False
                   
        if not include_eng:
            for e in self.alphas:
                if e in str:
                    return False
        
        if not include_chn:
            match = self.zhPattern.search(str)
            if match:
                return False
        return True
        
    def valid_cn(self,str,str_length=5,max_str=100):
        match = self.zhPattern.search(str)
        return match and len(str)>=str_length and len(str) <= max_str










