import Head from 'next/head'
import React from 'react'
import CustomBreadcrumb from '../../../components/custom-breadcrumb/CustmBreadcrumb'
import MainPageLayout from '../../../layouts/MainPageLayout'
import ContactUsList from '../../../components/contactus/ContactUsList'

const list = () => {
  return (
    <>
      <Head>
        <title>Contact us responses</title>
      </Head>
      <MainPageLayout>
        <div className="h-full">
          <div className="p-5">
            <CustomBreadcrumb
              heading="Contact us responses"
              links={[
                { name: 'Dashboard', path: '/' },
                { name: 'Contact us responses' },
              ]}
            />
            <div className="mt-10 sm:mt-0 max-w-6xl">
              <div className="md:grid ">
                <div className="mt-6 md:col-span-2">
                  <ContactUsList />
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
