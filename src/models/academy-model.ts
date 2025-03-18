export type Academy = {
  id:                    number;
  logo:                  string;
  name:                  string;
  description:           string;
  slogan:                string;
  academy_category_id:   number;
  user_id:               number;
  academy_configuration: AcademyConfiguration
  category:              string
}

export type AcademyConfiguration = {
  domain: string
}