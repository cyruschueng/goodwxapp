package com.visualbusiness.pano.process.web.rest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.visualbusiness.common.web.rest.RestResult;

@RestController
@RequestMapping("/status")
public class StatusRestController {
	private static Logger logger = LogManager.getLogger(StatusRestController.class);
	
	/**
	 * 查询服务器状态。
	 * @return
	 */
	@RequestMapping(value="")
	public RestResult<?> status() {
		return RestResult.successResult(); //TODO 需要COS、Storm状态的数据吗？
    }
}
