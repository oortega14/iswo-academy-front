import { CourseSection } from "./modals";

export interface CourseGoal {
  id: number
  description: string
  _destroy: boolean
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
  learning_route_id:   number;
  academy_name: string;
  banner:       string;
  promotional_video: string;
  promotional_image: string;
  course_test:  CourseTest;
  students:     number;
  reviews:      number;
  course_goals: CourseGoal[];
}

export interface Bank {
  bankCode: string,
  bankName: string
}

export interface Exam {
  id:             number;
  approved:       boolean;
  right_answers:  number;
  course_test_id: number;
  exam_answers:   ExamAnswer[];
}

export interface ExamAnswer {
  id:                 number;
  test_question_id:   number;
  question_option_id: null;
}

export interface Evaluation {
  id:           number;
  time_limit:   number;
  approve_with: number;
  questions:    Question[];
}

export interface Question {
  id:               number;
  question:         string;
  question_options: QuestionOption[];
}

export interface QuestionOption {
  id:          number;
  option_text: string;
}


export interface Lesson {
  id:          number;
  completed:   boolean;
  title:       string;
  description: string;
  visible:     boolean;
  url_video:   null;
  external_video_url?: string;
  files:       any[];
  course_section_id: string;
}

export interface CoursesStatus {
  of_interest:    number;
  in_progress: number;
  ended:       number;
}


export interface CourseTest {
  id:           number;
  approve_with: number;
  time_limit:   number | null;
  name:         string;
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
  contact_name:          string;
  contact_phone:         string;
  contact_email:         string;
}

export interface AcademyConfiguration {
  id:     number;
  colors: string;
  domain: string;
  contact_name:          string;
  contact_phone:         string;
  contact_email:         string;
}

export interface LearningRoute {
  id: number;
  name: string;
  academy_id: number;
  created_at: string;
  updated_at: string;
}

export interface SidebarLink {
  category_key: string;
  label: string;
  icon?: React.ComponentType< { className?: string }>;
  links?: Array<{ subcategory_key: string; label: string; }>;
}

export interface SidebarNavigationProps {
  sidebarLinks?: SidebarLink[]
  isSidebarOpen: boolean
  handleClick: (categoryLabel: string, subcategoryLabel: string ) => void
}

export interface SidebarNavigationVideoPlayerProps {
  sections?: CourseSection[]
  handleClick: (sectionId: number, lessonId: number ) => void
}

export interface SidebarCategoryProps {
  category: SidebarLink
  handleClick: (categoryLabel: string, subcategoryLabel: string ) => void
  courses?: Course[]
}

export interface SidebarSectionProps {
  section: CourseSection
  handleClick: (sectionId: number, lessonId: number ) => void
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

export type BuildRouteVPlayerProps = {
  sectionId: number
  courseId: string
  lessonId: number
  academyId: string
}

