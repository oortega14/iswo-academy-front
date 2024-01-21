export interface CourseGoal {
  id: number
  description: string
}

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
  promotional_video: string;
  promotional_image: string;
  course_test:  CourseTest;
  students:     number;
  reviews:      number;
  course_goals: CourseGoal[];
}

export interface CoursesStatus {
  acquired:    number;
  in_progress: number;
  ended:       number;
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

export interface LearningRoute {
  id: number;
  name: String;
  academy_id: Number;
  created_at: String;
  updated_at: String;
}

export interface SidebarLink {
  category_key: string;
  label: string;
  icon?: React.ComponentType;
  links?: Array<{ subcategory_key: string; label: string; }>;
}

export interface SidebarNavigationProps {
  sidebarLinks?: SidebarLink[]
  isSidebarOpen: boolean
  handleClick: (categoryLabel: string, subcategoryLabel: string ) => void
}

export interface SidebarNavigationAdminProps {
  sidebarLinks?: SidebarLink[]
  isSidebarOpen: boolean
  handleClick: (categoryLabel: string, subcategoryLabel: string ) => void
  courses: Course[]
}

export interface SidebarCategoryProps {
  category: SidebarLink
  handleClick: (categoryLabel: string, subcategoryLabel: string ) => void
}

export interface SidebarCategoryAdminProps {
  category: SidebarLink
  handleClick: (categoryLabel: string, subcategoryLabel: string ) => void
  courses: Course[]
}

export type SidebarProps = {
  params: {
    id: string
  }
}

export type BuildRouteProps = {
  category: string
  subcategory: string
  userId: string
  courseId: string
  academyId: string
}