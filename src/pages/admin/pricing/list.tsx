import Head from 'next/head'
import React from 'react'
import CustomBreadcrumb from '../../../components/custom-breadcrumb/CustmBreadcrumb'
import PricingList from '../../../components/employee/PricingList'
import MainPageLayout from '../../../layouts/MainPageLayout'

const list = () => {
  return (
    <>
      <Head>
        <title> Pricing List</title>
      </Head>
      <MainPageLayout>
        <div className="h-full">
          <div className="p-5">
            <CustomBreadcrumb
              heading="Pricing Package List"
              links={[
                { name: 'Dashboard', path: '/' },
                { name: 'List' },
              ]}
            />
            <div className="mt-10 sm:mt-0 max-w-6xl">
              <div className="md:grid ">
                <div className="mt-6 md:col-span-2">
                  <PricingList />
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
