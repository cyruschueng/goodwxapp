import Details from './components/details.vue' ; 
import Introduce from './components/introduce.vue' ; 
import Topic from './components/topic.vue' ; 
 
Vue.config.debug = false ;

var App = {};
var router = new VueRouter();

router.map({
    '/': { 			
    	//课程详情
        component: Details
    } ,
    '/introduce': { 
    	//课程介绍
        component: Introduce
    } ,
    '/topic': { 
    	//购买及未购买
        component: Topic
    }
})

//重定向
router.redirect({
  '*': '/'
});

router.start(App, '#app');
