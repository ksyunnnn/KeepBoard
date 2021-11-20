import React, { ButtonHTMLAttributes } from 'react';

type Props = {
  loading?: boolean;
  id: string;
  variant?: 'text' | 'outlined' | 'contained' | 'icon';
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FCX<Props> = ({
  children,
  onClick,
  loading = false,
  type = 'button',
  className,
  id,
  title,
  variant = 'outlined',
  ...props
}) => {
  if (variant === 'icon') {
    return (
      <button
        {...props}
        type={type === 'submit' ? 'submit' : 'button'}
        className={`
        py-2 px-4 rounded-md text-sm min-w-24
         text-black
        transition duration-300 ease-in-out
        disabled:border-gray-100 disabled:text-gray-500 disabled:cursor-default
      bg
        ${className}
      `}
        onClick={onClick}
        disabled={loading}
        aria-label={props['aria-label'] || id}
        title={title || id}
      >
        {loading ? (
          <span>
            ...
          </span>
        ) : children}
      </button>
    );
  }
  if (variant === 'text') {
    return (
      <button
        {...props}
        type={type === 'submit' ? 'submit' : 'button'}
        className={`
        py-2 px-4 rounded-md text-sm min-w-24
        text-gray-500 hover:text-black
        transition duration-300 ease-in-out
        disabled:border-gray-100 disabled:text-gray-500 disabled:cursor-default
        ${className}
      `}
        onClick={onClick}
        disabled={loading}
        aria-label={props['aria-label'] || id}
        title={title || id}
      >
        {loading ? (
          <span>
            ...
          </span>
        ) : children}
      </button>
    );
  }

  if (variant === 'contained') {
    return (
      <button
        {...props}
        type={type === 'submit' ? 'submit' : 'button'}
        className={`
        py-2 px-4 rounded-md text-sm min-w-24
        border text-gray-500 hover:text-black border-black
        transition duration-300 ease-in-out
        disabled:border-gray-100 disabled:text-gray-500 disabled:cursor-default
        ${className}
      `}
        onClick={onClick}
        disabled={loading}
        aria-label={props['aria-label'] || id}
        title={title || id}
      >
        {loading ? (
          <span>
            ...
          </span>
        ) : children}
      </button>
    );
  }

  return (
    <button
      {...props}
      type={type === 'submit' ? 'submit' : 'button'}
      className={`
        py-2 px-4 rounded-md text-sm min-w-24
        border border-gray-100 text-gray-500 hover:text-black hover:border-black
        transition duration-300 ease-in-out
        disabled:border-gray-100 disabled:text-gray-500 disabled:cursor-default
        ${className}
      `}
      onClick={onClick}
      disabled={loading}
      aria-label={props['aria-label'] || id}
      title={title || id}
    >
      {loading ? (
        <span>
          ...
        </span>
      ) : children}
    </button>
  );
};

export default Button;
