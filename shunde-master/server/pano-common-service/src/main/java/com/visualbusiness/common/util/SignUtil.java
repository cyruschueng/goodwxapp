/*
 * Copyright (c)  $year - $year Microscene Inc., All Rights Reserved.
 *
 * @author: mark@vizen.cn
 * @Date: 2018.
 */

package com.visualbusiness.common.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

/**
 * 签名工具类
 *
 * @author mark@vizen.cn
 * @date 2018-02-11
 */
public class SignUtil {

    private static Logger logger = LoggerFactory.getLogger(SignUtil.class);

    public static String sign(Map<String, String> params) {
        Map<String, String> treeMap = new TreeMap<>(params);
        Set<Map.Entry<String, String>> set = treeMap.entrySet();
        StringBuilder sb = new StringBuilder();
        for (Map.Entry<String, String> entry : set) {
            String key = entry.getKey();
            String value = entry.getValue();
            if (sb.length() > 0) {
                sb.append("&");
            }
            sb.append(key).append("=").append(value);
        }
        return genStandardMD5Str(sb.toString());
    }

    /**
     * 通用 MD5 加密
     *
     * @param str 计算源
     * @return 标准MD5结果
     */
    public static String genStandardMD5Str(String str) {
        MessageDigest messageDigest;

        try {
            messageDigest = MessageDigest.getInstance("MD5");
            messageDigest.reset();
            messageDigest.update(str.getBytes("UTF-8"));
        } catch (NoSuchAlgorithmException e) {
            logger.error("NoSuchAlgorithmException caught!", e);
            return null;
        } catch (UnsupportedEncodingException e) {
            logger.error(e.getMessage(), e);
            return null;
        }

        byte[] byteArray = messageDigest.digest();

        StringBuilder md5StrBuff = new StringBuilder();

        for (byte aByteArray : byteArray) {
            if (Integer.toHexString(0xFF & aByteArray).length() == 1) {
                md5StrBuff.append("0").append(Integer.toHexString(0xFF & aByteArray));
            } else {
                md5StrBuff.append(Integer.toHexString(0xFF & aByteArray));
            }
        }

        return md5StrBuff.toString();
    }
}
