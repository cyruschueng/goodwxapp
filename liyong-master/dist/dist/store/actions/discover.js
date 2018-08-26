import regeneratorRuntime from '../../lib/regenerator-runtime'
import { fetching, fetchend, displayError, alertError } from './loader'
import { shareOrderList } from '../../api/dicover'

export const fetchShareOrderList = ({ id }) => async (dispatch, getstate) => {
  try {
    const { maxId } = await shareOrderList({ })
    dispatch(fetchShareOrderList)
  } catch (error) {
    dispath(displayError(error))
  }
}

const fetchShareLisrSuccess = ({ id }) => ({
  type: 'FETCH_SHARE_LIST_SUSSESS',
  payload: { id }
})
