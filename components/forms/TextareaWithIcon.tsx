import React from "react"
import { TextareaWithIconProps } from '../../types/forms';
import { Textarea } from "../ui/textarea";

const TextareaWithIcon = ({
  Icon,
  label,
  placeholder,
  name,
  onChange,
  defaultValue,
} : TextareaWithIconProps) => {
  return (
    <div className="mb-2">
      <div className="mt-3 flex w-full items-center justify-start rounded-full">
        <Icon className="mr-2 size-5" />
        <label htmlFor={name}>{label}</label>
      </div>
      <Textarea
        placeholder={placeholder}
        name={name}
        onInput={onChange}
        className="mt-2"
        defaultValue={defaultValue}
      />
    </div>
  )
}

export default TextareaWithIcon
