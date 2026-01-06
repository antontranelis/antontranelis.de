export interface TeamMember {
  name: string;
  role?: string;
  github?: string;
}

export interface SidebarData {
  relatedProjects?: string[];
  relatedArticles?: string[];
  npmUrl?: string;
  opencollectiveUrl?: string;
  partners?: string[];
  todos?: string[];
  dates?: Array<{ label: string; date: string }>;
  status?: string;
  team?: TeamMember[];
  userStories?: string[];
}

export interface PostMeta {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  featured?: boolean;
  slug: string;
}

export interface Post extends PostMeta, SidebarData {
  content: string;
}

export interface Project extends SidebarData {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  sort?: number;
}
