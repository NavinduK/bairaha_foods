import Head from 'next/head'
import React from 'react'
import CustomBreadcrumb from '../../../components/custom-breadcrumb/CustmBreadcrumb'
import MainPageLayout from '../../../layouts/MainPageLayout'
import ReviewsList from '../../../components/reviews/ReviewsList'

const list = () => {
  return (
    <>
      <Head>
        <title>Review Management</title>
      </Head>
      <MainPageLayout>
        <div className="h-full">
          <div className="p-5">
            <CustomBreadcrumb
              heading="Review Management"
              links={[
                { name: 'Dashboard', path: '/' },
                { name: 'Reviews' },
              ]}
            />
            <div className="mt-10 sm:mt-0 max-w-6xl">
              <div className="md:grid ">
                <div className="mt-6 md:col-span-2">
                  <ReviewsList />
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
