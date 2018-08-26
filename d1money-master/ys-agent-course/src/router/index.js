import Vue from 'vue'
import Router from 'vue-router'
import Course from '@/pages/Course'
import CourseDetail from '@/pages/CourseDetail'
import CourseCatalog from '@/pages/CourseCatalog'

Vue.use(Router)

export default new Router({
    base: '/',
    routes: [
        {
            path: '/',
            redirect: '/course'
        },
        {
            path: '/course',
            name: 'Course',
            component: Course,
            meta: {
                title: '课程'
            }
        },
        {
            path: '/course-catalog/:curriculumid',
            name: 'CourseCatalog',
            component: CourseCatalog,
            props: true
        },
        {
            path: '/course-detail/:curriculumid/:lessonid',
            name: 'CourseDetail',
            component: CourseDetail,
            props: true
        }
    ]
})
