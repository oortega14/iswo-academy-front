import { SidebarCategoryProps } from "@/types/sidebar"
import {
  Accordion,
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
        {!!category.icon && <category.icon />}
        {category.label}
      </AccordionTrigger>
      <AccordionContent>
        <Accordion type="single" collapsible>
          {category.links?.map((subcategory) => (
            <AccordionItem
              value={subcategory.subcategory_key}
              key={subcategory.label}
            >
              <AccordionTrigger
                onClick={handleClick.bind(
                  null,
                  category.category_key,
                  subcategory.subcategory_key
                )}
              >
                {subcategory.label}
              </AccordionTrigger>
              <AccordionContent></AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </AccordionContent>
    </AccordionItem>
  )
}
