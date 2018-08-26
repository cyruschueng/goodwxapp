import http from '@/utils/http';

// 获取闯关列表
export function getHourglass(params = {}) {
  return http.getRequest({
    url: '/api/index.php?r=chuang-guan/get-chuang-guan-list',
    params,
  });
}

// 获取具体的闯关试题
export function getHourglassSubject(params = {}) {
  return http.getRequest({
    url: '/api/index.php?r=chuang-guan/get-question',
    params,
  });
}

// 获取闯关试题某道题目答案
export function getHourglassSubjectAnswer(params = {}) {
  return http.postRequest({
    url: '/api/index.php?r=chuang-guan/answer',
    params,
  });
}

export default {};
