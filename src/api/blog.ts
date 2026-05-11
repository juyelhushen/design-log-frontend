import api from "./axios";

export type BlogStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export type BlogResponse = {
  id: number;
  title: string;
  slug: string;
  summary?: string;
  content: string;
  status: BlogStatus;
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
};

export type BlogListItemResponse = {
  id: number;
  title: string;
  slug: string;
  summary?: string;
  status: BlogStatus;
  tags: string[];
  createdAt?: string;
};

export type BlogCreateRequest = {
  title: string;
  summary?: string;
  content: string;
  tags?: string[];
};

export type BlogUpdateRequest = BlogCreateRequest;

export const getMyBlogsApi = (params?: { page?: number; size?: number; sort?: string }) =>
  api.get<{ content: BlogListItemResponse[] }>("/blogs/me", { params });

export const getBlogBySlugApi = (slug: string) =>
  api.get<BlogResponse>(`/blogs/${slug}`);

export const createBlogApi = (payload: BlogCreateRequest) =>
  api.post<BlogResponse>("/blogs", payload);

export const updateBlogApi = (id: number, payload: BlogUpdateRequest) =>
  api.put<BlogResponse>(`/blogs/${id}`, payload);

export const publishBlogApi = (id: number) =>
  api.patch(`/blogs/${id}/publish`);

export const deleteBlogApi = (id: number) =>
  api.delete(`/blogs/${id}`);