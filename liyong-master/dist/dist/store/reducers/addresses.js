import { arrayRemoveItem } from '../../utils'

const initialState = {
  defaultId: null,
  map: {},
  ids: [],
  tagIds: [],
  tagMap: {},

  provinceMap: {},
  cityMap: {},
  districtMap: {},
  provinceIds: [],
  cityIdsMap: {},
  districtIdsMap: {},

  validDefaultIdMap: {}, // merchId => Boolean
  validIdsMap: {}, // merchId => valid Address ids
}

let id, address, addressList
let provinceMap, cityMap, districtMap
let merchId
const addresses = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_ADDRESS_TAG_LIST':
      const { addressTagList } = action.payload
      addressTagList.map(tag => {
        const { categoryId: id } = tag
        state.tagIds.push(id)
        state.tagMap[id] = tag
      })
      return { ...state }
    case 'SET_ADDRESS_LIST':
      addressList = action.payload.addressList
      addressList.map(address => {
        const { addressId: id } = address
        // add `_pcdName` property
        address._pcdName = state.provinceMap[address.province] + state.cityMap[address.city] + state.districtMap[address.district]
        address.address = address.address.replace(address._pcdName, '')
        state.ids.push(id)
        state.map[id] = address
        if (address.defaultAddress) state.defaultId = id
      })
      return { ...state }
    case 'SET_ADDRESS_DEFAULT':
      id = action.payload.id
      state.defaultId = id
      return { ...state }
    case 'DELETE_ADDRESS_SUCCESS':
      id = action.payload.id
      delete state.map[id]
      state.ids = arrayRemoveItem(state.ids, id)
      state.defaultId = state.ids.length && state.ids[0]
      return { ...state }
    case 'SET_PCD':
      const { PCD } = action.payload
      state.provinceIds = Object.keys(PCD)
      state.provinceIds.map(pid => {
        const name = PCD[pid].t
        state.provinceMap[pid] = name
        const cids = Object.keys(PCD[pid].s).map(id => id)
        cids.map(cid => {
          state.cityIdsMap[pid] = state.cityIdsMap[pid] || []
          state.cityIdsMap[pid].push(cid)
          state.cityMap[cid] = PCD[pid].s[cid].t
          const dids = Object.keys(PCD[pid].s[cid].s)
          dids.map(did => {
            state.districtIdsMap[cid] = state.districtIdsMap[cid] || []
            state.districtIdsMap[cid].push(did)
            state.districtMap[did] = PCD[pid].s[cid].s[did].t
          })
        })
      })
      return { ...state }
    case 'POST_ADDRESS_SUCCESS':
      // @TODO: unshift instead of simiple clear
      state.ids = []
      state.map = {}
      return { ...state }
    case 'FETCH_ADDRESS_SUCCESS':
      id = action.payload.id
      address = action.payload.address
      address._pcdName = state.provinceMap[address.province] + state.cityMap[address.city] + state.districtMap[address.district]
      return {
        ...state,
        map: {
          ...state.map,
          [id]: address
        }
      }
    case 'PUT_ADDRESS_SUCCESS':
      id = action.payload.id
      address = action.payload.address
      address._pcdName = state.provinceMap[address.province] + state.cityMap[address.city] + state.districtMap[address.district]
      return {
        ...state,
        map: {
          ...state.map,
          [id]: address
        }
      }
    case 'FETCH_DEFAULT_ADDRESS_BY_MERCH_ID_SUCCESS':
      address = action.payload.address
      merchId = action.payload.merchId
      id = address.addressId
      state.validDefaultIdMap[merchId] = true
      if (!state.defaultId) {
        state.defaultId = id
        // add `_pcdName` property
        address._pcdName = state.provinceMap[address.province] + state.cityMap[address.city] + state.districtMap[address.district]
        state.map[id] = address
        // state.ids.push(id)
      }
      return { ...state }
    case 'FETCH_ADDRESS_IDS_BY_MERCH_ID_SUCCESS':
      merchId = action.payload.merchId
      addressList = action.payload.addressList
      state.validIdsMap[merchId] = state.validIdsMap[merchId] || []
      state.validIdsMap[merchId] = [...state.validIdsMap[merchId], ...(addressList.map(address => address.addressId))]
      return { ...state }
    default:
      return { ...state }
  }
}

export default addresses
