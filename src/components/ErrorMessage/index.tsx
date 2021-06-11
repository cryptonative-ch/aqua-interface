// Externals
import React from 'react'

interface ErrorMessageProps {
  error: string | Error
}

export function ErrorMessage({ error }: ErrorMessageProps) {
  if (error instanceof Error) {
    return <div>{error.message}</div>
  }

  return <div>{error}</div>
}
