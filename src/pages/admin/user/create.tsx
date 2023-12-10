import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import CustomBreadcrumb from '../../../components/custom-breadcrumb/CustmBreadcrumb'
import CreateUserForm from '../../../components/user/CreateUserForm'
import MainPageLayout from '../../../layouts/MainPageLayout'

const create = () => {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>
          {!(router.query && router.query.update)
            ? 'Create User'
            : 'Update User'}
        </title>
      </Head>
      <MainPageLayout>
        <div className="h-full">
          <div className="p-5">
            <CustomBreadcrumb
              heading={`${
                !(router.query && router.query.update)
                  ? 'Create User'
                  : 'Update User'
              }`}
              links={[
                { name: 'Dashboard', path: '/' },
                { name: 'Create User' },
              ]}
            />
            <div className="mt-10 sm:mt-0 max-w-4xl">
              <div className="md:grid ">
                <div className="mt-6 md:col-span-2">
                  <CreateUserForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainPageLayout>
    </>
  )
}

export default create
