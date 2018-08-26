package com.vizen;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;
import java.io.Serializable;
import java.util.concurrent.TimeUnit;

/**
 * Unit test for simple App.
 */

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class RedisTest {

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    private String key = "mykey:mark";

    @Before
    public void setUp() {
        User user = new User();
        user.setName("mark");
        user.setAge(18);

        redisTemplate.opsForValue().set(key, JSON.toJSONString(user), 5, TimeUnit.MINUTES);
    }

    @After
    public void tearDown() {
        redisTemplate.opsForValue().getOperations().delete(key);
    }

    @Test
    public void test_N1() {
        String value = redisTemplate.opsForValue().get(key);
        System.out.println(value);
        JSONObject jsonObject = JSON.parseObject(value);
        System.out.println(jsonObject.toJSONString());
    }

    class User implements Serializable {

        private String name;
        private int age;

        public String getName() {
            return name;
        }

        public User setName(String name) {
            this.name = name;
            return this;
        }

        public int getAge() {
            return age;
        }

        public User setAge(int age) {
            this.age = age;
            return this;
        }

        @Override
        public String toString() {
            return "User{" +
                    "name='" + name + '\'' +
                    ", age=" + age +
                    '}';
        }
    }

}
