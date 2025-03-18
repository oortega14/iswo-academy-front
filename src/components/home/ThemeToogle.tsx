

import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid"

export function ThemeToggle({className}:any) {
  

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`${className} ml-3 border`}
    >
      <SunIcon className="size-6 dark:hidden " />
      <MoonIcon className="hidden size-6 dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
