'use client'
import { Provider } from "react-redux"
import store from '@/store/store'
import { ReactNode } from "react"

const ReduxProvider: React.FC<{children: ReactNode}>= ({children}) => {
  return (
    <Provider store={store}>
        {children}
    </Provider>
  )
}

export default ReduxProvider