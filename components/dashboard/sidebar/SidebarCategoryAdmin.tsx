import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Course, SidebarCategoryAdminProps } from "@/types/sidebar";

export const SidebarCategoryAdmin = ({ category, handleClick, courses }: SidebarCategoryAdminProps) => {
  console.log(courses)
  if (category.category_key === 'admin-courses') {
    return (
      <AccordionItem value={category.category_key} key={category.category_key}>
        <AccordionTrigger>
          {!!category.icon && <category.icon />}
          {category.label}
        </AccordionTrigger>
        <AccordionContent>
          <Accordion type="single" collapsible>
            {courses.length > 0 ? (
              <>
                {courses.map((course: Course) => (
                  <AccordionItem
                    value={course.title}
                    key={course.id}
                  >
                    <AccordionTrigger
                      onClick={handleClick.bind(
                        null,
                        category.category_key,
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
                key={subcategory.subcategory_key}
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
    );
  }
};
