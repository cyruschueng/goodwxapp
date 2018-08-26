/*
 * Copyright (C)  2017 - 2018 Microscene Inc., All Rights Reserved.
 *
 * @author: mark@vb.com.cn
 * @Date: 2017.9.21
 */
package com.vizen.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 *
 * MD5计算工具类
 * @author mark
 */
public class Md5Util {
    private static final Logger logger = LoggerFactory.getLogger(Md5Util.class);
    private Md5Util(){
    }
    /**
     * 通用 MD5 加密
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