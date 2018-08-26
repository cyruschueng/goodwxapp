# -*- encoding:utf-8 -*-
from server.qacnn import QACNN
from server.InputCheck import Check
from server.medSQL import qaSQL
import tensorflow as tf
import numpy as np
import re
import os
import time
import datetime
import operator
from server import insurance_qa_data_helpers
from gensim import corpora, models, similarities
import jieba
from server.WXBizDataCrypt import WXBizDataCrypt

# Config函数
class Config(object):
    def __init__(self, vocab_size):
        # 输入序列(句子)长度
        self.sequence_length = 200
        # 循环数
        self.num_epochs = 100000
        # batch大小
        self.batch_size = 128
        # 词表大小
        self.vocab_size = vocab_size
        # 词向量大小
        self.embedding_size = 100
        # 不同类型的filter,相当于1-gram,2-gram,3-gram和5-gram
        self.filter_sizes = [1, 2, 3, 5]
        # 隐层大小
        self.hidden_size = 80
        # 每种filter的数量
        self.num_filters = 512
        # L2正则化,未用,没啥效果
        # 论文里给的是0.0001
        self.l2_reg_lambda = 0.
        # 弃权,未用,没啥效果
        self.keep_prob = 1.0
        # 学习率
        # 论文里给的是0.01
        self.lr = 0.005
        # margin
        # 论文里给的是0.009
        self.m = 0.009
        # 设定GPU的性质,允许将不能在GPU上处理的部分放到CPU
        # 设置log打印
        self.cf = tf.ConfigProto(allow_soft_placement=True, log_device_placement=False)
        # 只占用20%的GPU内存
        self.cf.gpu_options.per_process_gpu_memory_fraction = 0.2
        


class QA_MED(object):
    def __init__(self):
        # 数据准备：所有词汇及科室问题
        self.vocab = insurance_qa_data_helpers.build_vocab()
        self.q_key, self.type_q = insurance_qa_data_helpers.read_type_question()
        # 配置文件
        self.config = Config(len(self.vocab))
        self.min_config = None
        self.key_option = None
        self.top_five = None
        self.cnn = None
        #获取输入校验
        self.vi = Check()
        #获取数据库执行
        self.dbs = qaSQL()
        self.sess = None

    def dev_step(self,test_data,sess):
        scoreList = list()
        i = 0
            
        while True:

            x_test_1, x_test_2, x_test_3 = insurance_qa_data_helpers.load_data_val_6(test_data, self.vocab, i, self.config.batch_size)
            feed_dict = {
            self.cnn.q: x_test_1,
            self.cnn.aplus: x_test_2,
            self.cnn.aminus: x_test_3,
            self.cnn.keep_prob: 1.0
            }
            
            batch_scores = self.sess.run([self.cnn.q_ap_cosine], feed_dict)
            for score in batch_scores[0]:
                scoreList.append(score)
            i += self.config.batch_size
            if i >= len(test_data):
                break
                    
        return scoreList
            
     ###返回消息类函数
     
    def welcome_msg(self,user_name):
        #第一条打招呼信息
        return '您好，'+str(user_name.encode('utf8'))+'。\n欢迎使用问诊小医生，\n任何健康问题都能问我哦！'
            
    def get_department(self):
        #获取不同科目
        reply_text = '我们提供下列科室:\n'
        for ix,txt in enumerate(self.q_key):
            reply_text += str(ix+1) + ': ' + str(txt.encode('utf8')) + '\n'
            #if (ix+1) % 2 == 0:
            #    reply_text += '\n'
            
                
        return reply_text + '请输入【序号】选择病症科室'
    
    def ask_msg(self):
        #第一条打招呼信息
        return '请输入您的健康问题，越详细越好哦'
        
    def backToFirst(self):
        #第一条打招呼信息
        return '还有同症状问题？小医生随时待命。\n需要更换科室，请输入“科室”'
        
    

    
    
    
    ###处理模型类函数
    def get_similar_qa(self, key_option, q_file, user_name,openid):
        #根据用户输入科目，获取相应问题
        #reply_text = '您是否要问:' + '\n'
        
        if not self.vi.valid_cn(q_file):
             return str(user_name.encode('utf8')) + "，问题可以更详细，不然小医生无法精确问诊哦", 400
        
        que_type = self.q_key[int(key_option)]
        que_data = self.type_q[que_type]
        
        query = re.sub('[ ]+','', q_file)#open(querypath, 'r')
        class MyCorpus(object):
            def __iter__(self):
                for line in que_data:
                    yield list(jieba.cut(line.replace('w','').replace('\n',''),HMM=False))
        Corp = MyCorpus()
        dictionary = corpora.Dictionary(Corp)
        corpus = [dictionary.doc2bow(text) for text in Corp]

        tfidf = models.TfidfModel(corpus)

        corpus_tfidf = tfidf[corpus]
            
        vec_bow = dictionary.doc2bow(list(jieba.cut(query)))
    
        vec_tfidf = tfidf[vec_bow]

        index = similarities.MatrixSimilarity(corpus_tfidf)
        sims = index[vec_tfidf]
            

        similarity = list(sims)
        top_answer = que_data[similarity.index(max(similarity))]
        #self.top_five = []
        
        #while len(self.top_five)<5:
            #self.top_five.append(que_data[similarity.index(max(similarity))])
            #similarity.remove(max(similarity))
            
        
        
        #for ix,txt in enumerate(self.top_five):
            #reply_text += str(ix+1) + ': ' + str(txt.encode('utf8')) + '\n'
    
        return self.train_similarity(top_answer,key_option,q_file,openid)
        
        
        
    def train_similarity(self,user_question,key_option,origin_question,openid):
        #key_option = raw_input("请选择病症科室：")
        #q_file = raw_input("请输入您要的问题：").replace('\n','').lower()
        #print('您是否要问：')
        #option = raw_input("请输入您的选项：")
        #user_question = self.top_five[int(option)]
        #print('您的问题是： '+str(user_question.encode('utf8')))
        print(user_question)
        test_data,_ = insurance_qa_data_helpers.load_test_and_vectors(user_question)    
        print('get test_data')
        scoreList = self.dev_step(test_data,self.sess)
        print('get scoreList')            
        max_num = float('-inf')
        for idx, p in enumerate(test_data):        
            if scoreList[idx] > max_num:
                ans = p[2]
                max_num = scoreList[idx]
           
        self.dbs.db_add_question(openid,key_option+1,origin_question,user_question,ans)
        
        return '健康小医生建议：\n'+ans.encode('utf8').rstrip('w')
        #print max_num


    def model_built(self):
        sess = tf.Session(config=self.config.cf)
        # 建立CNN网络
        self.cnn = QACNN(self.config, sess)
        sess.run(tf.global_variables_initializer())
        saver = tf.train.Saver(max_to_keep=2)
        
        #恢复之前模型
        saver.restore(sess, tf.train.latest_checkpoint('server/models/'))
        self.sess = sess
        
        
        
        
        
        
        

        
    ###数据库执行类函数
    
    def check_if_exist(self,table,col_name,val):
        #return True if existed before
        return self.dbs.if_check(table,col_name,val)
    
    def write_user_info(self,q_open_id,q_nickname,q_gender,q_city):
        
        table = 'med_user'
        col_name = 'open_id'
        if self.check_if_exist(table,col_name,q_open_id):
            self.dbs.db_add_user(q_open_id,q_nickname,q_gender,q_city)
    

    def get_send_group(self,openid,appid,appsecret,session_key,en_data,iv,share_type):
        #return True if existed before
        pc = WXBizDataCrypt(appid, session_key)

        de_data = pc.decrypt(en_data, iv)
        
        gid = de_data['openGId']
        share_type = int(share_type)
        
        
        table = 'med_group'
        col_name = 'open_gid'
        if self.check_if_exist(table,col_name,gid):
            self.dbs.db_add_share(openid,gid,share_type)
        
        
    









