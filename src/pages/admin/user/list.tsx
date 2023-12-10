import Head from 'next/head'
import React from 'react'
import CustomBreadcrumb from '../../../components/custom-breadcrumb/CustmBreadcrumb'
import UserList from '../../../components/user/UserList'
import MainPageLayout from '../../../layouts/MainPageLayout'

const list = () => {
  return (
    <>
      <Head>
        <title> User List</title>
      </Head>
      <MainPageLayout>
        <div className="h-full">
          <div className="p-5">
            <CustomBreadcrumb
              heading="User List"
              links={[
                { name: 'Dashboard', path: '/' },
                { name: 'User List' },
              ]}
            />
            <div className="mt-10 sm:mt-0 max-w-6xl">
              <div className="md:grid ">
                <div className="mt-6 md:col-span-2">
                  <UserList />
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainPageLayout>
    </>
  )
}

export default list
