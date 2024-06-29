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
  value
} : InputWithIconProps) => {
  return (
    <div className="mb-2">
      <div className="mt-3 flex w-full items-center justify-start rounded-full">
        <Icon className="mr-2 size-5" />
        <label htmlFor={name}>{label}</label>
      </div>
      <Input
        type="text"
        placeholder={placeholder}
        name={name}
        onInput={onChange}
        className="mt-2"
        defaultValue={defaultValue}
        value={value}
      />
    </div>
  )
}

export default InputTextWithIcon
