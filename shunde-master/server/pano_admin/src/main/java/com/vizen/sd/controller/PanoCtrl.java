package com.vizen.sd.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vizen.framework.util.MyJsonUtil;
import com.vizen.sd.model.LoginUser;
import com.vizen.sd.repository.mysql.domain.PanoStitch;
import com.vizen.sd.service.PanoManageService;

@RestController
@RequestMapping("/pano")
public class PanoCtrl {
	@Autowired
	private PanoManageService panoManageService;
	
	/**
	 * 获取单个全景
	 * @param searchWord
	 * @param panoStatus
	 * @param pageSize
	 * @param pageNum
	 * @return
	 */
	@RequestMapping("getPanoStitch")
	public String getPanoStitch(@RequestParam("panoId") String panoId){
		PanoStitch panoStitch = panoManageService.getPanoStitch(panoId);
		return MyJsonUtil.success(panoStitch).toJSONString();
	}
	
	/**
	 * 
	 * @param searchWord 
	 * @param panoStatus 已入库  待入库..
	 * @param pageSize
	 * @param pageNum
	 * @return
	 */
	@RequestMapping("getPanoStitchList")
	public String getPanoStitchList(
								@RequestParam(name = "searchWord", required = false) String searchWord,
								@RequestParam("panoStatus") Integer panoStatus,
								@RequestParam("pageSize") Integer pageSize,
								@RequestParam("pageNum") Integer pageNum){
		List<PanoStitch> list = new ArrayList<PanoStitch>();//panoManageService.getPanoStitchList(searchWord,);
		return MyJsonUtil.success(list).toJSONString();
	}
	
	/**
	 * 单个删除
	 * @param panoId
	 * @return
	 */
    @RequestMapping("deletePano/{panoId}")
    public String deletePano(@PathVariable(value = "panoId") String panoId) {
//        VizenUserSession user = SessionHelper.getUser(request.getSession(false));
    		
        return MyJsonUtil.success("").toJSONString();
    }
    
    /**
     * 批量删除
     * @param panoIds
     * @return
     */
    @RequestMapping("deletePanoBatch")
    public String deletePanoBatch(@RequestParam(name = "panoIds") String panoIds) {
        return MyJsonUtil.success("").toJSONString();
    }
    
    /**
     * 创建全景
     * @param panoIds
     * @return
     */
    @RequestMapping("ceatePano")
    public String ceatePano(HttpServletRequest request,
    						@RequestParam(name = "panoName") String panoName) {
    	//TODO 
    	HttpSession session = request.getSession();
    	LoginUser loginUser = new LoginUser();//(LoginUser) session.getAttribute("");
    	loginUser.setUserId(123L);
    	loginUser.setName("测试");
    	panoManageService.ceatePano(panoName ,loginUser);
    	return MyJsonUtil.success("").toJSONString();
	}
    
    /**
     * 更新全景名称
     * @param panoId
     * @param panoName
     * @return
     */
    @RequestMapping("updatePanoName")
    public String updatePanoName(HttpServletRequest request,
    						@RequestParam(name = "panoId") String panoId,
    						@RequestParam(name = "panoName") String panoName) {
    	//TODO
    	HttpSession session = request.getSession();
    	LoginUser loginUser = new LoginUser();//(LoginUser) session.getAttribute("");
    	loginUser.setUserId(123L);
    	loginUser.setName("测试");
    	panoManageService.updatePanoName(panoId,panoName ,loginUser);
    	return MyJsonUtil.success("").toJSONString();
	}
    
    /**
     * 上传多个全景后拼接
     * @param panoId
     * @param picMap
     * @return
     */
    @RequestMapping(value = "/submitAllPanoAutoStitch")
    public String submitAllPanoAutoStitch(HttpServletRequest request,
                                              @RequestParam(name = "panoId") String panoId,
                                              @RequestParam(name = "picMap") String picMap) {
    	//TODO
    	HttpSession session = request.getSession();
    	LoginUser loginUser = new LoginUser();//(LoginUser) session.getAttribute("");
    	loginUser.setUserId(123L);
    	loginUser.setName("测试");
    	panoManageService.submitAllPanoAutoStitch(panoId , picMap ,loginUser);
    	return MyJsonUtil.success("").toJSONString();
    }
    
    /**
     * 批量发起全景拼接
     * @param panoIds
     * @return
     */
    public String stitchBatch(@RequestParam(name = "panoIds") String panoIds){
    	return MyJsonUtil.success("").toJSONString();
    }
    
}