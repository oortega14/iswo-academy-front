export interface AcademyCardProps {
  imageUrl: string
  name: string
  description: string
}

export interface AcademyCategory {
  id:        number;
  name:      string;
  academies: Academy[];
}

export interface Academy {
  id:          number;
  name:        string;
  description: string;
  slogan:      string;
  logo:        string;
  domain:      string;
  owner:       string;
}
