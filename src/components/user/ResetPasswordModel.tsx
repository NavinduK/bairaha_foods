import * as Yup from 'yup'
import { useForm, UseFormReturn } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import InputText from '../hook-form/InputText'
import Button from '../button/Button'
import FormProvider from '../hook-form/FormProvider'

export default function ResetPasswordModel(props: any) {
  const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string().required('Password Required'),
    retypepassword: Yup.string()
      .required('Retype password')
      .oneOf([Yup.ref('password')], 'Passwords do not match'),
  })

  const methods: UseFormReturn = useForm({
    resolver: yupResolver(ResetPasswordSchema),
  })

  const { handleSubmit, reset, control } = methods

  const onSubmit = async (data: any) => {
    props.handleResetPassword(data.password)
    props.handleCloseModel()
    reset({ password: '', retypepassword: '' })
  }

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={props.handleCloseModel}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="w-full relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 max-w-lg">
                <FormProvider
                  methods={methods}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Dialog.Title
                    as="h3"
                    className=" px-4 pb-4 pt-5 sm:p-4 font-semibold leading-6 text-gray-900 bg-gray-50 text-center sm:text-left"
                  >
                    Reset Password
                  </Dialog.Title>
                  <div className="bg-white px-4 pb-4 pt-3 sm:pb-6">
                    <div className="sm:flex sm:items-start w-full">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                        <div className="mt-2 w-full">
                          <InputText
                            type="password"
                            label="Enter new password"
                            name="password"
                            control={control}
                            required
                            fullWidth
                          />
                          <div className="p-2"></div>
                          <InputText
                            type="password"
                            label="Re-enter new password"
                            name="retypepassword"
                            control={control}
                            required
                            fullWidth
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 flex flex-row-reverse px-6">
                    <Button text="Save" variant="primary" type="submit" />
                    <div className="p-2"></div>
                    <Button
                      type="button"
                      text="Cancel"
                      onClick={() => {
                        reset({ password: '', retypepassword: '' })
                        props.handleCloseModel()
                      }}
                    />
                  </div>
                </FormProvider>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
