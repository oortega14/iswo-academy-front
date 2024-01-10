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

