// External
import { ChangeEvent, useState } from 'react'

export function useInput(initialValue: any) {
  const [value, setValue] = useState(initialValue)

  return [
    value,
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value)
    },
    () => setValue(''),
  ]
}
