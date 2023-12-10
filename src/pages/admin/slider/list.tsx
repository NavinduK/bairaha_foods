import Head from 'next/head'
import React from 'react'
import CustomBreadcrumb from '../../../components/custom-breadcrumb/CustmBreadcrumb'
import MainPageLayout from '../../../layouts/MainPageLayout'
import SliderList from '../../../components/slider/SliderList'

const list = () => {
  return (
    <>
      <Head>
        <title>Slider Management</title>
      </Head>
      <MainPageLayout>
        <div className="h-full">
          <div className="p-5">
            <CustomBreadcrumb
              heading="Slider Management"
              links={[
                { name: 'Dashboard', path: '/' },
                { name: 'Slider' },
              ]}
            />
            <div className="mt-10 sm:mt-0 max-w-6xl">
              <div className="md:grid ">
                <div className="mt-6 md:col-span-2">
                  <SliderList />
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
