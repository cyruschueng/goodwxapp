package com.vizen.sd.service.impl;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.vizen.framework.exception.base.MyBaseException;
import com.vizen.sd.model.LoginUser;
import com.vizen.sd.repository.mysql.domain.PanoStitch;
import com.vizen.sd.repository.mysql.mapper.PanoStitchMapper;
import com.vizen.sd.service.PanoManageService;
import com.vizen.sd.utils.UUIDUtil;
import com.vizen.sd.utils.ValidateUtil;
@Service
public class PanoManageServiceImpl implements PanoManageService {
	@Autowired
	private PanoStitchMapper panoStitchMapper;
	
	
	@Override
	public void ceatePano(String panoName ,LoginUser loginUser) {
		PanoStitch panoStitch = new PanoStitch();
		panoStitch.setId(UUIDUtil.getUUIDStr());
		panoStitch.setName(panoName);
		panoStitch.setCreatorId(loginUser.getUserId());
		panoStitch.setCreateTime(new Date());
		panoStitch.setIsValid(1);
		panoStitch.setIsSuccess(0);
		panoStitchMapper.insert(panoStitch);
	}


	@Override
	public void updatePanoName(String panoId, String panoName,
			LoginUser loginUser) {
		ValidateUtil.notNull(panoId,"更新时id不能为空！");
		PanoStitch panoStitch = panoStitchMapper.selectByPrimaryKey(panoId);
		if(panoStitch==null||panoStitch.getIsValid()==0){
			throw new MyBaseException("全景不存在！");
		}
		//更新全景信息
		panoStitch.setName(panoName);
		panoStitch.setUpdaterId(loginUser.getUserId());
		panoStitch.setUpdateTime(new Date());
		panoStitchMapper.updateByPrimaryKey(panoStitch);
	}


	@Override
	public PanoStitch getPanoStitch(String panoId) {
		ValidateUtil.notNull(panoId,"查询id不能为空！");
		PanoStitch panoStitch = panoStitchMapper.selectByPrimaryKey(panoId);
		if(panoStitch==null||panoStitch.getIsValid()==0){
			throw new MyBaseException("全景不存在！");
		}
		return panoStitch;
	}


	@Override
	public void submitAllPanoAutoStitch(String panoId, String picMap, LoginUser loginUser) {
		ValidateUtil.notNull(panoId,"id不能为空！");
		PanoStitch panoStitch = panoStitchMapper.selectByPrimaryKey(panoId);
		if(panoStitch==null||panoStitch.getIsValid()==0){
			throw new MyBaseException("全景不存在！");
		}
		/*
		 * picMap JSON字符串  key为图片位置下标,共9张 value为{'url':'', 'name':''} 
		 * {
                    "1": {
                        "focal": 15,
                        "name": "01.JPG",
                        "width": 5472,
                        "model": "Canon EOS 6D",
                        "url": "http://panoresourcestest.oss-cn-beijing.aliyuncs.com/vizen/59c1e6e7e5b51374376d6b45/01.JPG",
                        "md5": "8a19328c404dee383a2b9b38ce7d8e07",
                        "height": 3648
                    }...
           }
		 */
		try {
			JSONObject stitch = JSONObject.parseObject(picMap); 
		} catch (Exception e) {
			throw new MyBaseException("请传入正确的图片的数据");
		}
		panoStitch.setStitch(picMap);
		panoStitch.setIsSuccess(0);
		panoStitch.setUpdaterId(loginUser.getUserId());
		panoStitch.setUpdateTime(new Date());
		panoStitchMapper.updateByPrimaryKey(panoStitch);
		//TODO  后续调用服务
	}

}
