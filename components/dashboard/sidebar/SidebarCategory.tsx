import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { SidebarCategoryProps } from "@/types/sidebar";

export const SidebarCategory = ({ category, handleClick, courses }: SidebarCategoryProps) => {
  if (category.key === 'courses') {
    return (
      <AccordionItem value={category.key} key={category.key}>
        <AccordionTrigger>
          {!!category.icon && <category.icon />}
          {category.label}
        </AccordionTrigger>
        <AccordionContent>
          <Accordion type="single" collapsible>
            {courses.length > 0 ? (
              <>
                {courses.map((course) => (
                  <AccordionItem
                    value={course.title}
                    key={course.id}
                  >
                    <AccordionTrigger
                      onClick={handleClick.bind(
                        null,
                        category.label,
                        course.id
                      )}
                    >
                      {course.title}
                    </AccordionTrigger>
                    <AccordionContent></AccordionContent>
                  </AccordionItem>
                ))}
              </>
            ) : (
              <>
                <AccordionItem
                  value='Nuevo Curso'
                >
                  <AccordionTrigger
                    onClick={handleClick.bind(
                      null,
                      category.label,
                      'nuevo curso'
                    )}
                  >
                    Crear Curso
                  </AccordionTrigger>
                  <AccordionContent></AccordionContent>
                </AccordionItem>
              </>
            )}
          </Accordion>
        </AccordionContent>
      </AccordionItem>
    );
  } else {
    return (
      <AccordionItem value={category.key} key={category.key}>
        <AccordionTrigger>
          {!!category.icon && <category.icon />}
          {category.label}
        </AccordionTrigger>
        <AccordionContent>
          <Accordion type="single" collapsible>
            {category.links?.map((subcategory) => (
              <AccordionItem
                value={subcategory.subcategory}
                key={subcategory.label}
              >
                <AccordionTrigger
                  onClick={handleClick.bind(
                    null,
                    category.label,
                    subcategory.label
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
    );
  }
};
