import { BASE_URL, ENTRY, API_VERSION, INDEX_SKY_ID, INDEX_SKY_TYPE } from '../config'
const apiPerfix = `https://${ BASE_URL }/`
export default {
    getTestList: (classifyId) => `${apiPerfix}evaluation/${ENTRY}/${API_VERSION}/${classifyId}/evaluations`,
    getBannerList: () => `${apiPerfix}sky-light/${ENTRY}/${API_VERSION}/skylight/${INDEX_SKY_ID}/${INDEX_SKY_TYPE}`
}