import { useRouter } from 'next/router'
import React from 'react'
import { useAuthContext } from '../auth/useAuthContext'
import MainPageLayout from '../layouts/MainPageLayout'

const index = () => {
  const router = useRouter()
  const { user } = useAuthContext()

  return (
    <div>
      <MainPageLayout>
        <div className="w-full flex justify-center">
          <div className="w-full">
          <h4 className="ml-7 text-2xl font-bold">
              Welcome {user?.firstName} {user?.lastName}!
            </h4>
            <div className="w-full flex justify-center">
              <img
                className="w-1/2 mt-24"
                src="/svg/navIcon.svg"
                alt="dashboard"
              />
            </div>
            
          </div>
        </div>
      </MainPageLayout>
    </div>
  )
}

export default index
