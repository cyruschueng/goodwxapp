const initialState = {
  group: {
    id: null
  },
  entryType: null,
  entryQuery: {},
  entryPath: null,
  scene: null,
  shareTicket: null,
  reLaunch: null,
  location: {
    province: { id: 1, name: '北京市' },
    city: { id: 41, name: '朝阳区' }
  },
  saleSupportReasonList: [],
  searchLocation:{},
  saleSupportMessage:null
}

const global = (state = initialState, action) => {
  switch (action.type) {
    case 'WEAPP_ENTRY_OPTIONS':
      const { path, query, scene, shareTicket, reLaunch } = action.payload
      return { ...state, entryPath: path, entryQuery: query, scene, shareTicket, reLaunch }
    case 'SET_ENTRY_TYPE':
      const { entryType } = action.payload
      return { ...state, entryType }
    case 'SET_GROUP':
      const { group } = action.payload
      return { ...state, group }
    case 'FETCH_LOCATION_SUCCESS':
      const { province, city } = action.payload
      if (province.name == "北京市" || province.name == "上海市" || province.name == "天津市" || province.name == "重庆市") {
        state.location = { province, city }
      }else{
        state.location = {
          province:{
            id:city.id,
            name:city.name
          },
          city:city
        }
      }
      state.searchLocation = {
        searchProvince:{
          provinceId:province.id,
          proninceName:province.name
        },
        searchCity:{
          id:city.id,
          name:city.name
        }
      }
      return { ...state }
    case 'FETCH_SALE_SUPPORT_REASON_LIST_SUCCESS':
      const { saleSupportReasonList } = action.payload
      return { ...state, saleSupportReasonList }
    case 'CHECK_SALE_SUPPORT_SUCCESS':
      const { saleSupportMessage } = action.payload
      return { ...state, saleSupportMessage}
    case 'POST_LOCATION_SUCCESS':
      const { location } = action.payload
      state.location = location
      return { ...state }
    case 'GET_SEARCH_LOCATION_SUCCESS':
      const { searchProvince, searchCity } = action.payload
      state.searchLocation = { searchProvince, searchCity }
      return { ...state }
    default:
      return state
  }
}

export default global
