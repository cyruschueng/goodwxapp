package com.vizen.user.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.vizen.util.Md5Util;
import com.vizen.util.MyJsonUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.yaml.snakeyaml.Yaml;

import javax.annotation.Resource;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

/**
 * 用户适配器
 *
 * @author: mark@vizen.cn
 * @date: 2017-12-04
 */
@RestController
@RequestMapping(value = "/access-token")
public class UserAdapter {

    private static Logger logger = LoggerFactory.getLogger(UserAdapter.class);

    @Value("${vizen-module-user.userfile}")
    private String userfile;

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    private static final String PREFIX = "vizen:module-user:";

    private static final int DEFAULT_TIME_OUT = 5;

    /**
     * 验证用户
     */
    @CrossOrigin
    @RequestMapping(value = "/apply", produces = "application/json;charset=UTF-8", method = {RequestMethod.GET})
    public Object genAccessToken(@RequestParam(name = "unique_id") String uniqueId,
                                 @RequestParam(name = "random") String random,
                                 @RequestParam(name = "sign") String sign) {
        Map<String, JSONObject> map = loadSettings();

        JSONObject data = map.get(uniqueId);
        if (data == null) {
            return MyJsonUtil.error("非法的用户名!");
        }
        String secret = data.getString("secret");
        StringBuilder sb = new StringBuilder("random=")
                .append(random)
                .append("&secret=")
                .append(secret)
                .append("&unique_id=")
                .append(uniqueId);
        String calcSign = Md5Util.genStandardMD5Str(sb.toString());

        System.out.println("calcSign=" + calcSign);
        if (!calcSign.equals(sign)) {
            return MyJsonUtil.error(-1, "签名错误!");
        }
        String accessToken = uniqueId+"-"+UUID.randomUUID().toString().replace("-","");
        JSONObject redisData = new JSONObject();
        redisData.putAll(data);
        redisData.remove("secret");
        redisData.put("uniqueId", uniqueId);

        redisTemplate.opsForValue().set(PREFIX + accessToken,
                redisData.toJSONString(), DEFAULT_TIME_OUT, TimeUnit.MINUTES);

        JSONObject retData = new JSONObject();
        retData.put("token", accessToken);
        retData.put("unique_id", uniqueId);
        return MyJsonUtil.success(retData);
    }

    private Map<String, JSONObject> loadSettings() {
        Yaml yaml = new Yaml();
        boolean found = false;
        Object o = null;

        try (InputStream is = new FileInputStream(new File(userfile))){
            o = yaml.load(is);
            found = true;
        } catch (FileNotFoundException e) {
            // do nothing
        } catch (IOException e) {
            // do nothing
        }

        if (!found) {
            try (InputStream is = new ClassPathResource(userfile).getInputStream()) {
                o = yaml.load(is);
                found = true;
            } catch (IOException e) {
                // do nothing
            }
        }
        if (!found) {
            String msg = "FileNotFound: " + userfile + " was not found";
            logger.error(msg);
            throw new RuntimeException(msg);
        }

        Map<String, JSONObject> map = new HashMap<>();
        JSONArray array = (JSONArray) JSONArray.toJSON(o);
        for (int i = 0; i < array.size(); i++) {
            JSONObject user = array.getJSONObject(i);
            String uniqueId = user.getString("unique_id");
            map.put(uniqueId, user.getJSONObject("data"));
        }
        return map;
    }

    /**
     * token换取用户信息
     */
    @RequestMapping(value = "/user-info", produces = "application/json;charset=UTF-8")
    public Object genAccessToken(@RequestParam(name = "uniqueId", required = false) String uniqueId,
                                 @RequestParam(name = "token") String accessToken) {
        String redisKey = PREFIX + accessToken;

        String value = redisTemplate.opsForValue().get(PREFIX + accessToken);

        if (value != null) {
            logger.info(String.format("成功获取用户信息：token=%s, value=%s", accessToken, value));

            redisTemplate.opsForValue().getOperations().delete(redisKey);

            JSONObject data = JSON.parseObject(value);
            return MyJsonUtil.success(data);
        }
        return MyJsonUtil.error(String.format("token[%s]错误或者不存在", accessToken));
    }
}
