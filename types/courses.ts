import React from "react";
import { Course } from "./sidebar";
import { User } from "./store";

export interface File {
  id:   number;
  file: string;
}

export interface Student {
  id:        number;
  user_id:   number;
  user_name: string;
  course_status : string;
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

export interface Answer {
  id: number;
  option_text: string;
  right_answer: boolean;
}

export interface Category {
  id: number;
  name: string;
}

export interface Certificate {
  id: number,
  course_title: string,
  file_url: string
}

export interface TotalComments {
  comments: LessonComment[];
  total:    number;
}

export interface UserComment {
  name:    string;
  picture: null | string;
}


export interface LessonComment {
  id:      number;
  comment: string;
  user:    UserComment;
}

export interface ButtonTooltipProps {
  tooltip: string
  icon: React.ComponentType | React.ReactNode;
  onClick?: () => void;
}

export interface SharedContentProps {
  title: string
  courses: Course[]
  course_condition: string
}

export interface CoursesCardProps {
  title: string
  price: string
  description: string
  imageUrl: string
  course_condition: string
}
