import React from "react"
import { Input } from "../ui/input"
import { InputWithIconProps } from '../../types/forms';

const InputTextWithIcon = ({
  Icon,
  label,
  placeholder,
  name,
  onChange,
  defaultValue,
} : InputWithIconProps) => {
  return (
    <div>
      <div className="mt-3 flex w-full items-center justify-start rounded-full">
        <Icon className="mr-2 size-5" />
        <label htmlFor={name}>{label}</label>
      </div>
      <Input
        type="text"
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        className="mt-2"
        defaultValue={defaultValue}
      />
    </div>
  )
}

export default InputTextWithIcon