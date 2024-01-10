export interface Lesson {
  id:          number;
  title:       string;
  description: string;
  visible:     boolean;
  url_video:   string;
  files:       File[];
}

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
