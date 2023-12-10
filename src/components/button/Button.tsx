import React from 'react'

type ButtonProps = {
  text: string
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  size?: 'small' | 'medium' | 'large'
  fullWidth?: boolean
  disabled?: boolean
}

const Button = ({
  text,
  type,
  onClick,
  variant,
  size,
  fullWidth,
  disabled,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={`${fullWidth ? 'w-full' : ''} ${
        disabled
          ? 'bg-[#e2e2e2] text-[#676767]'
          : variant == 'primary'
          ? 'bg-[#3f9944] hover:bg-[#127a15] text-white'
          : 'border-2 border-[#3f9944] text-[#3f9944] hover:bg-[#127a15]'
      } ${
        size == 'small'
          ? 'px-2 py-1 text-sm'
          : size == 'large'
          ? 'px-4 py-2 text-lg'
          : 'px-3 py-2 text-md'
      }  font-semibold rounded-md flex justify-center shadow-sm `}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  )
}

export default Button
