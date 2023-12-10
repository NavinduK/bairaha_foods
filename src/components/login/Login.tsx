import React, { useEffect } from 'react'
import FormProvider from '../hook-form/FormProvider'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Button from '../button/Button'
import InputText from '../hook-form/InputText'
import { useAuthContext } from '../../auth/useAuthContext'
import { useRouter } from 'next/router'

type FormValuesProps = {
  email: string
  password: string
}

const Login = () => {
  const { login, isAuthenticated } = useAuthContext()
  const { push } = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      push('/')
    }
  }, [isAuthenticated])

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  })

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
  })

  const { handleSubmit, control } = methods

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await login(data.email, data.password)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex min-h-full flex-col justify-center item-center h-screen py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-36 w-auto"
          src="/svg/loginbg.svg"
          alt="Your Company"
        />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          SIGN IN
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <FormProvider
            className="space-y-6"
            methods={methods}
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputText
              type="email"
              label="Email address"
              name="email"
              control={control}
              required
              fullWidth
            />
            <InputText
              type="password"
              control={control}
              name="password"
              label="Password"
              required
              fullWidth
            />

            {/* <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-[#31736D] hover:text-[#3f9944]"
                >
                  Forgot your password?
                </a>
              </div>
            </div> */}
            <div>
              <Button
                variant="primary"
                text="Sign in"
                type="submit"
                fullWidth
              />
            </div>
          </FormProvider>
        </div>
      </div>
    </div>
  )
}

export default Login
