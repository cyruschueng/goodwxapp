package com.visualbusiness.pano.news.dao;

import com.visualbusiness.pano.news.model.OperationRecord;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Copyright (C) 2015 - 2017 MICROSCENE Inc., All Rights Reserved.
 *
 * @author: ray@visualbusiness.com
 * @date: 2017-03-10
 */
public interface OperationRecordDao extends JpaRepository<OperationRecord, String> {

}
