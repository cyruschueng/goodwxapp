package com.visualbusiness.pano.process.web.rest;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.visualbusiness.common.web.rest.RestResult;
import com.visualbusiness.pano.process.model.PanoGroup;
import com.visualbusiness.pano.process.service.PanoGroupService;

@RestController
@RequestMapping("/group")
public class GroupRestController {
	private static Logger logger = LogManager.getLogger(GroupRestController.class);
	
	private static DateFormat DATE_FORMAT = new SimpleDateFormat("yyyy/MM/dd");
	
	@Autowired
	private PanoGroupService panoGroupService;
	
	@RequestMapping(value="/search", method = {RequestMethod.POST, RequestMethod.GET})
	public RestResult<List<Map<String, String>>> search(
			@RequestParam(required = false) String keyword) {
		
		if(keyword == null) {
			keyword = "";
		}
		List<PanoGroup> panoGroups = panoGroupService.findByGroupNameLike(keyword);
		
		List<Map<String, String>> data = new ArrayList<Map<String, String>>();
		
		for (PanoGroup panoGroup : panoGroups) {
			Map<String, String> item = new HashMap<String, String>();
			item.put("groupId", String.valueOf(panoGroup.getPanoGroupId()));
			item.put("groupName", String.valueOf(panoGroup.getGroupName()));
			item.put("createdBy", "testuser"); //TODO
			item.put("createTime", DATE_FORMAT.format(new Date(panoGroup.getCreateTimeMillis())));
			data.add(item);
		}
		
		return RestResult.successResult(data);
    }
	
	@RequestMapping(value="/create", method = {RequestMethod.POST, RequestMethod.GET}) //TODO GET只是测试时用的
	public RestResult<Map<String, String>> create(
			@RequestParam String groupName) {

		groupName = groupName.trim();
		if (StringUtils.isEmpty(groupName)) {
			return RestResult.errorResult("groupName参数未指定");
		}
		
		PanoGroup panoGroup = panoGroupService.findByGroupName(groupName);
		
		if(panoGroup != null) {
			return RestResult.errorResult("专题已经存在");
		}
		
		panoGroup = new PanoGroup();
		panoGroup.setGroupName(groupName);
		
		panoGroup = panoGroupService.saveOrUpdate(panoGroup);

		Map<String, String> data = new HashMap<String, String>();
		data.put("groupId", String.valueOf(panoGroup.getPanoGroupId()));
		data.put("groupName", String.valueOf(panoGroup.getGroupName()));
		data.put("createdBy", "testuser"); //TODO
		data.put("createTime", DATE_FORMAT.format(new Date(panoGroup.getCreateTimeMillis())));
		
		logger.info("专题创建成功:" + groupName);
		
		return RestResult.successResult(data);
    }
}
