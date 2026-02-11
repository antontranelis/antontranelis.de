export interface TeamMember {
  name: string;
  role?: string;
  github?: string;
}

export interface PostMeta {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  featured?: boolean;
  slug: string;
  externalUrl?: string;
}

export interface Post extends PostMeta {
  content: string;
  relatedProjects?: string[];
  relatedArticles?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  sort?: number;
  status?: string;
  team?: TeamMember[];
  relatedProjects?: string[];
  relatedArticles?: string[];
  npmUrl?: string;
  opencollectiveUrl?: string;
  partners?: string[];
  todos?: string[];
  userStories?: string[];
}

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  sort?: number;
  status?: string;
  team?: TeamMember[];
  content: string;
  isMdx: false;
}
