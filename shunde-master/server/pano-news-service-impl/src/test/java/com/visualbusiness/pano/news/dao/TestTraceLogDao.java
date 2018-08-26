//package com.visualbusiness.pano.news.dao;
//
//import com.visualbusiness.pano.news.common.BaseBeanContext;
//import com.visualbusiness.pano.news.model.OperationRecord;
//import org.junit.Before;
//import org.junit.Test;
//
///**
// * Created by marui on 2017/3/10.
// */
//
//public class TestTraceLogDao extends BaseBeanContext{
//
//    private OperationRecordDao operationRecordDao;
//    @Before
//    public void setUp() {
//        super.setUp();
//        operationRecordDao = (OperationRecordDao) context.getBean("operationRecordDao");
//    }
//
//    @Test
//    public void testSave(){
//        OperationRecord operationRecord = new OperationRecord("test01", 0,
//                null, 0, "test", "marui");
////        OperationRecord operationRecord = new OperationRecord();
////        operationRecord.setCreateUser("test");
////        operationRecord.setStatus("delete");
////        operationRecord.setContent("content");
////        operationRecord.setModelId("test031312");
////        operationRecord.setModelType(0);
//
//        operationRecordDao.save(operationRecord);
//
//    }
//
//
//}
