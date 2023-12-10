import Head from 'next/head'
import React, { useEffect } from 'react'
import AuthGuard from '../auth/AuthGuard'
import Login from '../components/login/Login'

const LoginPage = () => {
  return (
    <>
      <Head>
        <title> Login </title>
      </Head>
      <Login />
    </>
  )
}

export default LoginPage
