export type Id = number;

export type Project = {
  id: Id;
  title: string;
  description: string;
  image: string;
  tech: string[];
  github?: string;
  external?: string;
  featured?: boolean;
};

export type Message = {
  id: Id;
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  date?: string;
  read?: boolean;
};

export type Experience = {
  id: Id;
  role: string;
  company: string;
  period: string;
  description: string;
};

