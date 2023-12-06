import React from 'react'
import { Outlet } from 'react-router-dom'
import AuthHeader from '../Shared/AuthHeader/AuthHeader'
import AuthFooter from '../Shared/AuthFooter/AuthFooter'

const AuthLayout = () => {
  return (
    <div className=''>
        <AuthHeader></AuthHeader>
      <Outlet>
      </Outlet>
       <AuthFooter></AuthFooter>

    </div>
  )
}

export default AuthLayout
