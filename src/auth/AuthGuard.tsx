import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuthContext } from './useAuthContext'

type AuthGuardProps = {
  children: React.ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { push, route } = useRouter()
  const { user } = useAuthContext()

  const [mount, isMount] = useState<boolean>(false)

  useEffect(() => {
    if (user) {
      if (
        route.includes('admin') &&
        !(user.role.name === 'SUPER_ADMIN' || user.role.name === 'ADMIN')
      ) {
        push('/login')
        isMount(true)
      }
    } else {
      isMount(true)
    }
  }, [route, user])

  // useEffect(() => {
  //   if (user) {
  //     if (user.role.id === 4) {
  //       push('/employee/attendance')
  //       isMount(true)
  //     }
  //   }
  // }, [route, user])

  return <> {mount && children} </>
}
