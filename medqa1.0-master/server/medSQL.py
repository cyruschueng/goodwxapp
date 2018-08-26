# -*- encoding:utf-8 -*-
import MySQLdb
import datetime

def get_time():
    return datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    
class qaSQL(object):
    def __init__(self):
        # 有效长度
        self.address = '127.0.0.1'
        self.user = 'root'
        self.pwd = 'wangye@123'
        self.db = 'MedQA'
        
        
    def db_connect(self):    
        return MySQLdb.connect(self.address, self.user, self.pwd, self.db,charset='utf8')
        
    def db_add_user(self,q_open_id,q_nickname,q_gender,q_city):
        conn = self.db_connect()
        cursor = conn.cursor()
        conn.ping(True)
        time = get_time()
        try:
            cursor.execute("INSERT INTO med_user(open_id,nickname,gender,city,add_time) \
         VALUES ('%s','%s','%s','%s','%s')" %(q_open_id, q_nickname, q_gender, q_city, time))
            conn.commit()
        except:
            conn.rollback()
            print "mysql error:新增用户信息失败"
        
        conn.close()
        
        
    def db_add_share(self, open_id,open_gid,share_type):
        if len(open_id)>0 and len(open_gid) > 0:
            conn = self.db_connect()
            cursor = conn.cursor()
            conn.ping(True)
            
            try:
            #先放入med_group
                time = get_time()
                
                cursor.execute("INSERT INTO med_group(open_gid,add_time) \
         VALUES ('%s','%s')" %(open_gid,time))
                conn.commit()
            #查询med_group和med_user的id
                cursor.execute("Select u_id from med_user where open_id = '%s'" %(open_id))
                results = cursor.fetchall()
                if len(results) < 0:
                    return "u_id not found in med_user"
                else:
                    uid = int(results[0][0])
                    
                    
                cursor.execute("Select g_id from med_group where open_gid = '%s'" %(open_gid))
                results = cursor.fetchall()
                if len(results) < 0:
                    return "g_id not found in med_group"
                else:
                    gid = int(results[0][0])
                    
                #发出去的share类型是1，受到邀请是2
                cursor.execute("INSERT INTO med_share(u_id,g_id,type) \
         VALUES ('%d','%d','%d')" %(uid, gid, share_type))
                conn.commit()
                
            except:
                conn.rollback()
                print "mysql error:记录发送群信息和群关系错误！！"
        
            conn.close()
        
    def db_add_question(self,openid,ill_type,question,m_question,m_answer):
        conn = self.db_connect()
        cursor = conn.cursor()
        conn.ping(True)
        time = get_time()
        
        try:
            cursor.execute("Select u_id from med_user where open_id = '%s'" %(openid))
            results = cursor.fetchall()
            print(results)
            if len(results) < 0:
                return "u_id not found in med_user"
            else:
                uid = int(results[0][0])
            
            cursor.execute("INSERT INTO med_qa(u_id,ill_type,question,m_question,m_answer,add_time) \
         VALUES ('%d','%d','%s','%s','%s','%s')" %(uid, ill_type, question.encode('utf8'), m_question.encode('utf8'), m_answer.encode('utf8').rstrip('w'),time))
            conn.commit()
        except:
            conn.rollback()
            print "mysql error:新增用户问答消息失败"
        
        conn.close()
        
        
        
    def if_check(self,table,col_name,val):
        boo = True
        conn = self.db_connect()
        cursor = conn.cursor()
        conn.ping(True)
        
        try:
            cursor.execute("Select * from %s where %s = '%s'" %(table,col_name,val))
            results = cursor.fetchall()
            #print(len(results))
            if len(results) > 0:
                boo = False
        except:
            conn.rollback()
            print "mysql error:查询是否存在记录错误"
        
        conn.close()
        return boo
