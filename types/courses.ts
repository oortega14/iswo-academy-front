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
