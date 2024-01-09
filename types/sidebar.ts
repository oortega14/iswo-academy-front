export interface Course {
  id:           number;
  title:        string;
  subtitle:     string;
  price:        string;
  description:  string;
  stars:        number;
  teacher_id:   null;
  teacher:      null;
  academy_id:   number;
  academy_name: string;
  banner:       string;
  course_test:  CourseTest;
  students:     number;
}

export interface CourseTest {
  id:           number;
  approve_with: number;
  time_limit:   number | null;
}

export interface Academy {
  id:                    number;
  name:                  string;
  logo:                  string;
  user_id:               number;
  academy_category:      string;
  description:           string;
  slogan:                string;
  academy_configuration: AcademyConfiguration;
}

export interface AcademyConfiguration {
  id:     number;
  colors: string;
  domain: string;
}


export interface SidebarLink {
  href?: string;
  key: string;
  label: string;
  icon?: React.ComponentType;
  links?: Array<{ subcategory: string; label: string; route: string }>;
}

export interface SidebarCategoryProps {
  category: SidebarLink;
  handleClick: (categoryLabel: string, subcategoryLabel: string) => void;
  courses: Course[]; // Asegúrate de tener el tipo Course definido
}

export type SidebarProps = {
  params: {
    id: string
  }
}
