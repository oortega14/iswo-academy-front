import React from "react";
import { Course } from "./sidebar";

export interface File {
  id:   number;
  file: string;
}

export interface Student {
  id:        number;
  user_id:   number;
  user_name: string;
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
}

export interface Category {
  id: number;
  name: string;
}

export interface ButtonTooltipProps {
  tooltip: string
  icon: React.ComponentType | React.ReactNode;
  onClick?: () => void;
}

export interface SharedContentProps {
  title: string
  courses: Course[]
}

export interface CoursesCardProps {
  title: string
  price: string
  description: string
  imageUrl: string
}
