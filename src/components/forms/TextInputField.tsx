import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "../ui/input"

interface TextInputFieldProps {
  label: string
  icon?: React.ElementType
  placeholder?: string
  field: any
  type?: string
  watchError?: boolean
  description?: string
}

export const TextInputField = ({
  label,
  icon: Icon,
  placeholder,
  field,
  type = "text",
  watchError = true,
  description
}: TextInputFieldProps) => {
  return (
    <FormItem>
      <div className="flex w-full items-center justify-start mt-3">
        {Icon && <Icon className="mr-2 size-5" />}
        <FormLabel className="text-base font-semibold">{label}</FormLabel>
      </div>
      {description && (
        <FormDescription className="text-sm text-muted-foreground">
          {description}
        </FormDescription>
      )}
      <FormControl>
        <Input type={type} placeholder={placeholder} {...field} />
      </FormControl>
      {watchError && <FormMessage />}
    </FormItem>
  )
}

export default TextInputField
