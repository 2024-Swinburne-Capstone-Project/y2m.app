import { BlogPost as DBBlogPost } from '../db';

export interface BlogPost extends DBBlogPost {}

export type CreateBlogPostData = Omit<BlogPost, 'id' | 'date'>;
