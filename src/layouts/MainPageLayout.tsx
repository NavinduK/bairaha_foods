import React from 'react'
import { useAuthContext } from '../auth/useAuthContext'
import NavBar from '../components/navBar/NavBar'
import SideBar from '../components/sidebar/SideBar'

const MainPageLayout = ({ children }: any) => {
  const { user } = useAuthContext()
  // const isAdmin =
  //   user?.role.name === 'SUPER_ADMIN' || user?.role.name === 'ADMIN'
  return (
    <div>
      <NavBar />
      <div className="flex">
        <div className="w-fit md:w-64">
          <SideBar />
        </div>
        <div className="w-4/5 sm:w-full md:m-8 m-1">{children}</div>
      </div>
    </div>
  )
}

export default MainPageLayout
