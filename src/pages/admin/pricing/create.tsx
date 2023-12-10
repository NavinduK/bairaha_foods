import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import CustomBreadcrumb from '../../../components/custom-breadcrumb/CustmBreadcrumb'
import CreatePricingForm from '../../../components/employee/CreatePricingForm'
import MainPageLayout from '../../../layouts/MainPageLayout'

const create = () => {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>
          {!(router.query && router.query.update)
            ? 'Create Employee'
            : 'Update Employee'}
        </title>
      </Head>
      <MainPageLayout>
        <div className="h-full">
          <div className="p-5">
            <CustomBreadcrumb
              heading={`${
                !(router.query && router.query.update)
                  ? 'Create Pricing Package'
                  : 'Update Pricing Package'
              }`}
              links={[
                { name: 'Dashboard', path: '/' },
                {
                  name: !(router.query && router.query.update)
                    ? 'Create Pricing'
                    : 'Update Pricing',
                },
              ]}
            />
            <div className="mt-10 sm:mt-0 max-w-4xl">
              <div className="md:grid ">
                <div className="mt-6 md:col-span-2">
                  <div className="overflow-hidden shadow sm:rounded-xl">
                    <CreatePricingForm />
                  </div>
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
