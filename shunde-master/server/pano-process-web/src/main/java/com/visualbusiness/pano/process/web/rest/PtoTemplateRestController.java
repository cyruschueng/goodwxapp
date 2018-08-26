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
import org.springframework.web.bind.annotation.*;

import com.visualbusiness.common.web.rest.RestResult;
import com.visualbusiness.pano.process.model.PtoTemplate;
import com.visualbusiness.pano.process.service.PtoTemplateService;

@RestController
@RequestMapping("/pto")
public class PtoTemplateRestController {
    private static Logger logger = LogManager.getLogger(PtoTemplateRestController.class);

    public static final String PTO_TYPE_LAST = "last";
    public static final String PTO_TYPE_INDOOR = "indoor";
    public static final String PTO_TYPE_OUTDOOR = "outdoor";

    @Autowired
    private PtoTemplateService ptoTemplateService;

    @CrossOrigin
    @RequestMapping(value = "/create", method = {RequestMethod.POST, RequestMethod.GET}) //TODO GET只是测试时用的
    public RestResult<Map<String, String>> create(
            @RequestParam String deviceId,
            @RequestParam String template,
            @RequestParam String ptoType
    ) {

        deviceId = deviceId.trim();
        if (StringUtils.isEmpty(deviceId)) {
            return RestResult.errorResult("deviceId参数未指定");
        }

        template = template.trim();
        if (StringUtils.isEmpty(template)) {
            return RestResult.errorResult("template参数未指定");
        }

        ptoType = ptoType.trim();
        if (StringUtils.isEmpty(ptoType)) {
            return RestResult.errorResult("ptoType参数未指定");
        }

//		PtoTemplate ptoTemplate = ptoTemplateService.findByDeviceId(deviceId);
//
//		if(ptoTemplate != null) {
//			logger.info(deviceId + "的PTO模板已经存在，进行更新处理。");
//		} else {
//			ptoTemplate = new PtoTemplate();
//			ptoTemplate.setDeviceId(deviceId);;
//		}
        PtoTemplate ptoTemplate = new PtoTemplate();
        ptoTemplate.setDeviceId(deviceId);
        ptoTemplate.setTemplate(template);
        ptoTemplate.setPtoType(ptoType);

        ptoTemplate = ptoTemplateService.saveOrUpdate(ptoTemplate);

        Map<String, String> data = new HashMap<String, String>();
//        data.put("ptoTemplateId", String.valueOf(ptoTemplate.getPtoTemplateId()));
        data.put("deviceId", String.valueOf(ptoTemplate.getDeviceId()));
        data.put("ptoType", String.valueOf(ptoTemplate.getPtoType()));

        logger.info("PTO模板创建成功:" + deviceId);

        return RestResult.successResult(data);
    }

    @CrossOrigin
    @RequestMapping(value = "/getCreated", method = {RequestMethod.POST, RequestMethod.GET})
    public RestResult<Map<String, String>> getCreated(
            @RequestParam String deviceId,
            @RequestParam(required= false) String ptoType
    ) {
        deviceId = deviceId.trim();
        if (StringUtils.isEmpty(deviceId)) {
            return RestResult.errorResult("deviceId参数未指定");
        }

        List<String> ptoTypeList = new ArrayList<String>();
        ptoType = ptoType.trim();
        if(StringUtils.isEmpty(ptoType)) {
            ptoTypeList.add(PTO_TYPE_LAST);
            ptoTypeList.add(PTO_TYPE_INDOOR);
            ptoTypeList.add(PTO_TYPE_OUTDOOR);
        } else {
            ptoTypeList.add(ptoType);
        }

        Map<String, String> data = new HashMap<String, String>();

        for(String ptoTypeItem : ptoTypeList) {
            String content = ptoTemplateService.get(deviceId, ptoTypeItem);
            data.put(ptoTypeItem, content);
        }
        return RestResult.successResult(data);
    }
}
