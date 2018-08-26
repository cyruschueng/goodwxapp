using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Collections;

namespace SfSoft.web.common
{
    public class WXSession
    {
        /// <summary>
        /// 缓存hashtable
        /// </summary>
        private static Hashtable mDic = new Hashtable();
        /// <summary>
        /// 添加
        /// </summary>
        /// <param name="key">key</param>
        /// <param name="value">value</param>
        public static void Add(string key, object value)
        {
            mDic[key] = value;
            
        }
        /// <summary>
        /// 移除
        /// </summary>
        /// <param name="key">key</param>
        public static void Remove(string key)
        {
            if (Contains(key))
            {
                mDic.Remove(key);
            }
        }
        /// <summary>
        /// 设置值
        /// </summary>
        /// <param name="key"></param>
        /// <param name="value"></param>
        public static void Set(string key, object value)
        {
            mDic[key] = value;
        }
        /// <summary>
        /// 获取值
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public static object Get(string key)
        {
            return mDic[key];
        }
        /// <summary>
        /// 是否含有
        /// </summary>
        /// <param name="key">key</param>
        /// <returns>bool</returns>
        public static bool Contains(string key)
        {
            return mDic.ContainsKey(key);
        }
        /// <summary>
        /// 清空所有项
        /// </summary>
        public static void Clear()
        {
            mDic.Clear();
        }
    }
    /// <summary>
    /// 操作类型
    /// </summary>
    public enum Operation
    {
        /// <summary>
        /// 认证
        /// </summary>
        Auth,
        /// <summary>
        /// 添加用户
        /// </summary>
        CreateUser,
        /// <summary>
        /// 关键字
        /// </summary>
        KeyWord
    }
}