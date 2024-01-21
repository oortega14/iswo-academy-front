import React from "react"
import { TextareaWithIconProps } from '../../types/forms';
import { Textarea } from "../ui/textarea";

const TextareaWithIcon = ({
  Icon,
  label,
  placeholder,
  name,
  onChange
} : TextareaWithIconProps) => {
  return (
    <div>
      <div className="mt-3 flex w-full items-center justify-start rounded-full">
        <Icon className="mr-2 size-5" />
        <label htmlFor={name}>{label}</label>
      </div>
      <Textarea
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        className="mt-2"
      />
    </div>
  )
}

export default TextareaWithIcon
