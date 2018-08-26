export const fetching = _ => ({
  type: 'FETCHING'
})

export const fetchend = _ => ({
  type: 'FETCHEND'
})

export const displayError = error => ({
  type: 'DISPLAY_ERROR',
  payload: error
})

export const alertError = error => ({
  type: 'ALERT_ERROR',
  payload: error
})

export const clearError = _ => ({
  type: 'CLEAR_ERROR'
})
