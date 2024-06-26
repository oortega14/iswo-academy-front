import {
  IconCircleFilled,
} from "@tabler/icons-react"

import { SidebarCategoryProps } from "@/types/sidebar"
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const SidebarCategory = ({
  category,
  handleClick,
}: SidebarCategoryProps) => {
  return (
    <AccordionItem value={category.category_key} key={category.category_key}>
      <AccordionTrigger>
        {!!category.icon && <category.icon className="size-8" />}
        <span className="text-left text-lg">{category.label}</span>
      </AccordionTrigger>
      <AccordionContent>
        <ul className="space-y-1">
          {category.links?.map((subcategory) => (
            <div
              key={subcategory.subcategory_key}
              className=" dark:hover:text-blue-dark flex cursor-pointer items-center space-x-2 rounded-lg p-2 font-semibold  hover:bg-slate-200 dark:hover:bg-slate-200 "
              onClick={handleClick.bind(
                null,
                category.category_key,
                subcategory.subcategory_key
              )}
            >
              <IconCircleFilled className="size-2" />
              <li className="text-base">{subcategory.label}</li>
            </div>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  )
}
