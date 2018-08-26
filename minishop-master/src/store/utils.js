// 返回默认值
export function returnDefault (state = null) {
  return state
}

// 创建命名空间的reducer
export function createNamedWrapperReducer (reducerFunction, reducerName) {
  return (state, action) => {
    const { name } = action
    const isInitializationCall = state === undefined
    if (name !== reducerName && !isInitializationCall) return state

    return reducerFunction(state, action)
  }
}
