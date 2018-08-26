# -*- encoding:utf-8 -*-
from __future__ import print_function
import numpy as np
import random
import re

empty_vector = []
for i in range(0, 100):
    empty_vector.append(float(0.0))
onevector = []
for i in range(0, 10):
    onevector.append(float(1))
zerovector = []
for i in range(0, 10):
    zerovector.append(float(0))

def cleanMessage(message):
    # Remove new lines within message
    cleanedMessage = message.replace('\n',' ').lower()
    # Deal with some weird tokens
    #cleanedMessage = cleanedMessage.replace("\xc2\xa0", "")
    # Remove punctuation
    #cleanedMessage = re.sub('([！？.,?!:]*)','', cleanedMessage)
    # Remove multiple spaces in message
    cleanedMessage = re.sub(' +',' ', cleanedMessage)
    return cleanedMessage

def build_vocab():
    code = int(0)
    vocab = {}
    vocab[u'UNKNOWN'] = code
    code += 1
    openedFile = open('data/train.txt', 'r')
    allLines = openedFile.readlines()
    for ln in allLines:
        comms = ln.split('|||')
        question = cleanMessage(comms[0].decode('utf8'))
        ans = cleanMessage(comms[1].decode('utf8'))
        for word in question:
            if word not in vocab:
                
                vocab[word] =code
                code += 1
        for word in ans:
            if word not in vocab:
                vocab[word] =code
                code += 1
    vocab[u'FUCK'] = code+1                
    openedFile.close()
    #openedFile = open('data/test.txt', 'r')
    #allLines = openedFile.readlines()
    #for ln in allLines:
    #    comms = ln.split('|||')
    #    question = cleanMessage(comms[0].decode('utf8'))
    #    ans = cleanMessage(comms[1].decode('utf8'))
    #    for word in question:
    #        if word not in vocab:
    #            vocab[word] =code
    #            code += 1
    #    for word in ans:
    #        if word not in vocab:
    #            vocab[word] =code
    #            code += 1
    #openedFile.close()
    print("总字数: ",code)
    return vocab

def rand_qa(qalist):
    index = random.randint(0, len(qalist) - 1)
    return qalist[index]


def read_alist():
    alist = []
    openedFile = open('data/train.txt', 'r')
    allLines = openedFile.readlines()
    for line in allLines:
        comms = line.decode('utf8').split('|||')
        ans = comms[1].replace('\n','')
        alist.append(ans)
    print('read_alist done ......')
    return alist


def vocab_plus_overlap(vectors, sent, over, size):
    global onevector
    global zerovector
    oldict = {}
    words = over.split('_')
    if len(words) < size:
        size = len(words)
    for i in range(0, size):
        if words[i] == '<a>':
            continue
        oldict[words[i]] = '#'
    matrix = []
    words = sent.split('_')
    if len(words) < size:
        size = len(words)
    for i in range(0, size):
        vec = read_vector(vectors, words[i])
        newvec = vec.copy()
        #if words[i] in oldict:
        #    newvec += onevector
        #else:
        #    newvec += zerovector
        matrix.append(newvec)
    return matrix

def load_vectors():
    vectors = {}
    for line in open('data/vectors.nobin'):
        items = line.strip().split(' ')
        if (len(items) < 101):
            continue
        vec = []
        for i in range(1, 101):
            vec.append(float(items[i]))
        vectors[items[0]] = vec
    return vectors

def read_vector(vectors, word):
    global empty_vector
    if word in vectors:
        return vectors[word]
    else:
        return empty_vector
        #return vectors['</s>']


def load_train_and_vectors():
    trainList = []
    openedFile = open('data/train.txt', 'r')
    allLines = openedFile.readlines()
    for line in allLines:
        #print(line)
        comms = line.decode('utf8').replace('\n','').split('|||')
        trainList.append(comms[1])
    print('fininsh load train and vectors')
    openedFile.close()
    return trainList

def load_test_and_vectors(index):
    testList = []
    
    trainList = load_train_and_vectors()
    openedFile = open('data/train.txt', 'r')
    
    allLines = openedFile.readlines()
    for line in allLines:
        alist = []
        #获得真实test回答
        comms = line.decode('utf8').replace('\n','').split('|||')
        testList.append(['1',comms[0],comms[1]])
    openedFile.close()
    
    #选一个来做预测, 制造虚假回答
    finalList = []
    print('make a predicton') 
    for id in testList:
        
        if id[1].rstrip('w').strip().lower() == index.strip().lower():
            finalList = [id]
            break
    
    #choice = rand_qa(test_List)
    #finalList = [choice]
    print('get the testList') 	
    for num in range(15):
        finalList.append(['0',finalList[0][1],rand_qa(trainList)])
    
    vectors = load_vectors()
    print('get the load_vectors finish')
    return finalList, vectors


def read_raw():
    raw = []
    openedFile = open('data/train.txt', 'r')
    allLines = openedFile.readlines()
    for line in allLines:
        comms = line.decode('utf8').replace('\n','').split('|||')
        raw.append(comms)

    return raw


def read_type_question():
    type_q = {}
    q_key = []
    openedFile = open('data/answer.txt', 'r')
    allLines = openedFile.readlines()
    for line in allLines:
        comms = line.decode('utf8').replace('\n','').split('|||')
        illness = comms[0].split('-')[0] #只选一级科室
        if illness not in type_q:
            q_key.append(illness)
            type_q[illness] = [comms[1]]
        else:
            type_q[illness].append(comms[1])
    return q_key, type_q
    
def encode_sent(vocab, string, size):
    x = []
    words = string
    str_len = len(words)
    if str_len < size:
        words += u'w'*(size-str_len)
    for i in range(0, size):
        if words[i] in vocab:
            x.append(vocab[words[i]])
        else:
            x.append(vocab[u'UNKNOWN'])
    return x

def load_data_6(vocab, alist, raw, size, seq_size=200):
    x_train_1 = []
    x_train_2 = []
    x_train_3 = []
    for i in range(0, size):
        items = raw[random.randint(0, len(raw) - 1)]
        nega = rand_qa(alist)
        x_train_1.append(encode_sent(vocab, items[0], seq_size))
        x_train_2.append(encode_sent(vocab, items[1], seq_size))
        x_train_3.append(encode_sent(vocab, nega, seq_size))
    return np.array(x_train_1), np.array(x_train_2), np.array(x_train_3)

def load_data_val_6(testList, vocab, index, batch, seq_size=200):
    x_train_1 = []
    x_train_2 = []
    x_train_3 = []
    for i in range(0, batch):
        true_index = index + i
        if (true_index >= len(testList)):
            true_index = len(testList) - 1
        
        items = testList[true_index]
        x_train_1.append(encode_sent(vocab, items[1], seq_size))
        x_train_2.append(encode_sent(vocab, items[2], seq_size))
        x_train_3.append(encode_sent(vocab, items[2], seq_size))
    return np.array(x_train_1), np.array(x_train_2), np.array(x_train_3)


def batch_iter(data, batch_size, num_epochs, shuffle=True):
    data = np.array(data)
    data_size = len(data)
    num_batches_per_epoch = int(len(data)/batch_size) + 1
    for epoch in range(num_epochs):
        # Shuffle the data at each epoch
        if shuffle:
            shuffle_indices = np.random.permutation(np.arange(data_size))
            shuffled_data = data[shuffle_indices]
        else:
            shuffled_data = data
        for batch_num in range(num_batches_per_epoch):
            start_index = batch_num * batch_size
            end_index = min((batch_num + 1) * batch_size, data_size)
            yield shuffled_data[start_index:end_index]
    

