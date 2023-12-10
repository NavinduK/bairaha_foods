import React, { useEffect, useState } from 'react'
import FormProvider from '../hook-form/FormProvider'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Button from '../button/Button'
import InputText from '../hook-form/InputText'
import { dispatch } from '../../redux/store'
import { toast } from 'react-toastify'
import { updateReview, updateReviewImage } from '../../redux/slices/review'
import InputTextarea from '../hook-form/InputTextarea'

type Review = {
  id: number
  name: string
  feeback: string
  image: FileList
}

const CardEditForm = (props: { reviewData?: Review; afterUpdated?: any }) => {
  const { reviewData, afterUpdated } = props
  const [image, setImage] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (reviewData) {
      reset({
        name: reviewData.name,
        feeback: reviewData.feeback,
      })
    }
  }, [reviewData])

  const PricingSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required!')
      .min(5, 'Must be more than 5 characters!'),
    feeback: Yup.string()
      .required('Review is required!')
      .min(5, 'Must be more than 5!'),
  })

  const methods = useForm<Review>({
    resolver: yupResolver(PricingSchema),
  })

  const { handleSubmit, control, reset } = methods

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    let imageName = ''
    if (reviewData) {
      if (image) {
        const imageFile = new FormData()
        imageFile.append('image', image)
        await dispatch(updateReviewImage(imageFile))
          .then((res) => {
            const url = res.data.data.split('/')
            imageName = url[url.length - 1]
            const obJ = {
              id: reviewData.id,
              name: data.name,
              feeback: data.feeback,
              image: imageName,
            }
            dispatch(updateReview(obJ))
              .then(() => {
                toast.success(`Review successfully updated`)
                afterUpdated()
              })
              .catch((error) => {
                toast.error('Error updating review')
                afterUpdated()
              })
          })
          .catch((error) => {
            toast.error('Error uploading image')
            afterUpdated()
          })
      } else {
        const obJ = {
          id: reviewData.id,
          name: data.name,
          feeback: data.feeback,
          image: reviewData.image,
        }
        dispatch(updateReview(obJ))
          .then(() => {
            toast.success(`Review successfully updated`)
            afterUpdated()
          })
          .catch((error) => {
            toast.error('Error updating review')
            afterUpdated()
          })
      }
    }
    setIsLoading(false)
  }

  return (
    <FormProvider
      className="space-y-6"
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="bg-white px-4 py-5 sm:p-6">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-6">
            <InputText
              type="text"
              label="Name *"
              name="name"
              control={control}
              required
              fullWidth
            />
          </div>
          <div className="col-span-6 sm:col-span-6">
            <InputTextarea
              type="text"
              label="Review *"
              name="feeback"
              control={control}
              required
              fullWidth
            />
          </div>
          <div className="col-span-6 sm:col-span-6">
            <label
              htmlFor={image}
              className="block text-md font-medium text-gray-700 mb-2"
            >
              Change image
            </label>
            <input
              type="file"
              name="image"
              accept=".jpg, .jpeg, .png"
              onChange={(e) => e.target.files && setImage(e.target.files[0])}
            />
          </div>
        </div>
        <div className="flex justify-end mt-5">
          <Button
            variant="primary"
            disabled={isLoading}
            text={isLoading ? 'Saving..' : 'Update'}
            type="submit"
          />
        </div>
      </div>
    </FormProvider>
  )
}

export default CardEditForm
