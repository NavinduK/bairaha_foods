import React, { useEffect, useState } from 'react'
import FormProvider from '../hook-form/FormProvider'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Button from '../button/Button'
import InputText from '../hook-form/InputText'
import InputSelect from '../hook-form/InputSelect'
import { useDispatch, useSelector } from '../../redux/store'
import { useRouter } from 'next/router'
import { getAllRoles } from '../../redux/slices/role'
import { createUser } from '../../redux/slices/user'
import { toast } from 'react-toastify'

type FormValuesProps = {
  firstName: string
  lastName: string
  role: number
  email: string
  telephone: string
}

const CreateUserForm = () => {
  const { push } = useRouter()
  const router = useRouter()
  const dispatch = useDispatch()
  const { roles } = useSelector((state) => state.role)

  useEffect(() => {
    dispatch(getAllRoles())
  }, [])

  const UserSchema = Yup.object().shape({
    firstName: Yup.string()
      .required('First Name is required')
      .matches(
        /^[A-Za-z]+$/,
        'Invalid Name! You can insert only alphabet characters'
      )
      .min(4, 'Must be more than 4 characters!')
      .max(30, 'Must be less than 30 characters!'),
    lastName: Yup.string()
      .required('Last Name is required')
      .matches(
        /^[A-Za-z]+$/,
        'Invalid Name! You can only insert alphabet characters'
      )
      .min(4, 'Must be more than 4 characters!')
      .max(30, 'Must be less than 30 characters!'),
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    telephone: Yup.string()
      .required('Telephone Number is required')
      .min(9, 'Must be more than 9 characters')
      .max(10, 'Must be less than 10 characters')
      .matches(/^\d+$/, 'Invalid Number! Insert only numeric values'),
    role: Yup.number().required('Role is required'),
  })

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UserSchema),
  })

  const { handleSubmit, control } = methods

  const onSubmit = (data: FormValuesProps) => {
    if (!(router.query && router.query.update)) {
      const obJ = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        mobileNumber: data.telephone,
        role: { id: data.role },
      }
      dispatch(createUser(obJ)).then((res) => {
        if (res.status === 200 || res.status === 201) push('/admin/user/list')
        toast.success('User created succesfully')
      })
    }
  }

  return (
    <div className="overflow-hidden shadow sm:rounded-xl">
      <FormProvider
        className="space-y-6"
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="bg-white px-4 py-5 sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <InputText
                type="text"
                label="First name"
                name="firstName"
                control={control}
                required
                fullWidth
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <InputText
                type="text"
                label="Last name"
                name="lastName"
                control={control}
                required
                fullWidth
              />
            </div>

            <div className="col-span-6">
              <InputText
                type="text"
                label="Email adress"
                name="email"
                control={control}
                required
                fullWidth
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <InputText
                type="text"
                label="Telephone"
                name="telephone"
                control={control}
                required
                fullWidth
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              {roles.length && (
                <InputSelect
                  label="Role"
                  name="role"
                  control={control}
                  options={roles
                    .filter((item: any) => item.name == 'ADMIN')
                    .map((item: any) => ({
                      value: item.id,
                      label: item.name.replace('_', ' '),
                    }))}
                  required
                  fullWidth
                />
              )}
            </div>
          </div>

          <div className="flex justify-end mt-5">
            <Button
              variant="primary"
              text={`${
                !(router.query && router.query.update)
                  ? 'Create User'
                  : 'Update User'
              }`}
              type="submit"
            />
          </div>
        </div>
      </FormProvider>
    </div>
  )
}

export default CreateUserForm
