import {
  ViewListIcon,
  UserCircleIcon,
  PlusCircleIcon,
  ClipboardListIcon,
  BookOpenIcon,
  MailIcon,
  HomeIcon,
  ChatIcon,
} from '@heroicons/react/outline'

export const userNavigation = [{ name: 'Sign out', href: '#' }]

export const user = {
  name: 'Chelsea Hagon',
  email: 'chelsea.hagon@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

export const navigation = [
  // {
  //   name: 'Pricing',
  //   icon: ClipboardListIcon,
  //   current: true,
  //   href: '/admin/pricing',
  //   access: ['ADMIN', 'SUPER_ADMIN'],
  //   subItems: [
  //     {
  //       name: 'Create',
  //       href: '/admin/pricing/create',
  //       icon: PlusCircleIcon,
  //     },
  //     {
  //       name: 'List',
  //       href: '/admin/pricing/list',
  //       icon: ViewListIcon,
  //     },
  //   ],
  // },
  {
    name: 'Breakdowns',
    icon: ClipboardListIcon,
    current: true,
    href: '/admin/machines',
    access: ['ADMIN', 'SUPER_ADMIN'],
    subItems: [
      {
        name: 'Report',
        href: '/admin/machines/list',
        icon: ViewListIcon,
      },
    ],
  },
  // {
  //   name: 'Home Page',
  //   icon: HomeIcon,
  //   current: true,
  //   href: '/admin/homepage',
  //   access: ['ADMIN', 'SUPER_ADMIN'],
  //   subItems: [
  //     {
  //       name: 'View',
  //       href: '/admin/homepage/list',
  //       icon: ViewListIcon,
  //     },
  //   ],
  // },
  // {
  //   name: 'Reviews',
  //   icon: ChatIcon,
  //   current: true,
  //   href: '/admin/reviews',
  //   access: ['ADMIN', 'SUPER_ADMIN'],
  //   subItems: [
  //     {
  //       name: 'View',
  //       href: '/admin/reviews/list',
  //       icon: ViewListIcon,
  //     },
  //   ],
  // },
  // {
  //   name: 'Bookings',
  //   icon: BookOpenIcon,
  //   current: false,
  //   href: '/admin/booking',
  //   access: ['ADMIN', 'SUPER_ADMIN'],
  //   subItems: [
  //     {
  //       name: 'List',
  //       href: '/admin/booking/list',
  //       icon: ViewListIcon,
  //     },
  //   ],
  // },
  // {
  //   name: 'Contact Us',
  //   icon: MailIcon,
  //   current: false,
  //   href: '/admin/contactus',
  //   access: ['ADMIN', 'SUPER_ADMIN'],
  //   subItems: [
  //     {
  //       name: 'List',
  //       href: '/admin/contactus/list',
  //       icon: ViewListIcon,
  //     },
  //   ],
  // },
  // {
  //   name: 'Attendance Management',
  //   icon: UsersIcon,
  //   href: '/employee',
  //   current: false,
  //   access: ['ADMIN', 'SUPER_ADMIN', 'USER', 'EMPLOYEE'],
  // },
  // {
  //   name: 'Users',
  //   icon: UserCircleIcon,
  //   current: false,
  //   href: '/admin/user',
  //   access: ['ADMIN', 'SUPER_ADMIN'],
  //   subItems: [
  //     { name: 'Create', href: '/admin/user/create', icon: PlusCircleIcon },
  //     { name: 'List', href: '/admin/user/list', icon: ViewListIcon },
  //   ],
  // },
]
