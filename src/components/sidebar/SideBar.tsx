import React, { useEffect, useState } from 'react'

import { useAuthContext } from '../../auth/useAuthContext'
import { useRouter } from 'next/router'
import { ChevronRightIcon } from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { navigation } from '../../../const/navBar/userNavigation'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const SideBar = () => {
  const [currentRoute, setCurrentRoute] = useState<string>()
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const router = useRouter()
  const { route } = useRouter()
  const { user } = useAuthContext()

  useEffect(() => {
    if (router) {
      setCurrentRoute(router.asPath)
    }
    navigation.map((item) => {
      if (route.includes(item.href)) {
        setOpenSubmenu(item.name)
      }
    })
  }, [router])

  return (
    <div
      style={{ height: '100%', minHeight: '100vh' }}
      className="flex flex-1 flex-col bg-slate-50  sm:w-60"
    >
      <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
        <nav
          className="mt-5 flex-1 space-y-1 bg-slate-50 px-3"
          aria-label="Sidebar"
        >
          {navigation.map((item) => (
            <div key={item.name}>
              {item.access.includes(user?.role.name) && (
                <div>
                  <a
                    onClick={() =>
                      setOpenSubmenu(
                        openSubmenu === item.name ? null : item.name
                      )
                    }
                    className={classNames(
                      currentRoute?.includes(item.href)
                        ? 'text-[#3f9944]'
                        : 'text-gray-1000 hover:bg-gray-200',
                      'group flex items-center px-0 sm:px-5 py-3 text-sm font-medium rounded-md cursor-pointer'
                    )}
                  >
                    <item.icon
                      className={'sm:mr-3 flex-shrink-0 h-6 w-6 font-semibold'}
                      aria-hidden="true"
                    />
                    <span className="flex-1 hidden md:block text-left font-semibold">
                      {item.name}
                    </span>
                    {item.subItems &&
                      (openSubmenu === item.name ? (
                        <ChevronDownIcon className="sm:ml-2 h-5 w-5" />
                      ) : (
                        <ChevronRightIcon className="sm:ml-2 h-4 w-4" />
                      ))}
                  </a>
                  {openSubmenu === item.name && (
                    <div className="pl-2 sm:pl-5">
                      {item.subItems &&
                        item.subItems.map((subItem) => (
                          <a
                            key={subItem.name}
                            href={subItem.href}
                            className={classNames(
                              subItem.href === currentRoute
                                ? 'text-[#3f9944]'
                                : 'text-gray-500 hover:bg-gray-200',
                              'group flex items-center px-0 sm:px-3 py-2 text-sm font-medium rounded-md mt-2 cursor-pointer'
                            )}
                          >
                            <subItem.icon
                              className={'sm:mr-3 flex-shrink-0 h-6 w-6'}
                              aria-hidden="true"
                            />
                            <span className="flex-1 hidden md:block">
                              {subItem.name}
                            </span>
                          </a>
                        ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default SideBar
