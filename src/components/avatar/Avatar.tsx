import React from 'react'
import IAvatar from './IAvatar'

const Avatar = ({ url, name, size }: IAvatar) => {
  const avatarSize = () => {
    switch (size) {
      case 'xs':
        return 'w-8 h-8'

      case 's':
        return 'w-9 h-9'

      case 'm':
        return 'w-12 h-12'

      default:
        return 'w-10 h-10'
    }
  }
  return (
    <div>
      {name && (
        <div
          className={`flex rounded-full bg-gray-500  ${avatarSize()} items-center justify-center text-white font-bold`}
        >
          {name && name[0]}
        </div>
      )}
      {url && (
        <div className="flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <img className="h-8 w-8 rounded-full" src={url} alt="avatar" />
        </div>
      )}
    </div>
  )
}

export default Avatar
