import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiError, ApiResponse, BlogPost, CreateBlogPostData } from '@/types';

const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  const response = await fetch('/api/blogs');
  if (!response.ok) {
    throw new Error('Failed to fetch blog posts');
  }
  const apiResponse: ApiResponse<BlogPost[]> = await response.json();
  return apiResponse.data;
};

export const useBlogPosts = () => {
  return useQuery({
    queryKey: ['blogPosts'],
    queryFn: fetchBlogPosts,
  });
};

const fetchBlogPost = async (id: string): Promise<BlogPost> => {
  const response = await fetch(`/api/blogs/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch blog post');
  }
  return await response.json();
};

export const useBlogPost = (id: string) => {
  return useQuery({
    queryKey: ['blogPost', id],
    queryFn: () => fetchBlogPost(id),
    enabled: !!id,
  });
};

const createBlogPost = async (data: CreateBlogPostData): Promise<BlogPost> => {
  const response = await fetch('/api/blogs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error: ApiError = await response.json();
    throw new Error(error.message);
  }

  const apiResponse: ApiResponse<BlogPost> = await response.json();
  return apiResponse.data;
};

export const useCreateBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBlogPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
    },
  });
};
