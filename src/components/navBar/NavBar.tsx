import { Menu, Popover, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'
import React, { Fragment } from 'react'
import { user as usr } from '../../../const/navBar/userNavigation'
import { useAuthContext } from '../../auth/useAuthContext'
import Avatar from '../avatar/Avatar'

const NavBar = () => {
  const { replace } = useRouter()
  const { user, logout } = useAuthContext()

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  const handleLogout = async () => {
    try {
      logout()
      replace('/login')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 bg-slate-50 flex justify-between py-4">
        <div className="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">
          <div className="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2">
            <div className="flex flex-shrink-0 items-center">
              <a href="#">
                <img
                  className="w-24"
                  src="/logo.png"
                  alt="Bonnie image"
                  style={{ width: "200px"}}
                />
              </a>
            </div>
          </div>
          <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
            <div className="flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0"></div>
          </div>
        </div>
        <div>
          <Menu as="div" className="relative ml-5 flex-shrink-0 w-full">
            <div className="flex items-center">
              <span className="hidden sm:block pr-3 font-bold">
                {user?.firstName} {user?.lastName}
              </span>
              <Menu.Button className="flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                {user?.avatarLink ? (
                  <Avatar url={user?.avatarLink} />
                ) : (
                  <Avatar name={user?.firstName} />
                )}
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="text-center w-24 absolute right-0 z-10 mt-2 origin-top-right rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none cursor-pointer text-white bg-orange-500 hover:bg-red-600">
                <Menu.Item>
                  <a
                    onClick={handleLogout}
                    className={'block py-2 px-4 text-sm'}
                  >
                    Sign Out
                  </a>
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </>
  )
}

export default NavBar
