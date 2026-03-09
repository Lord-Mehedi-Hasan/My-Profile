// Server component
import Link from 'next/link';
import { blogPosts, categories } from '@/data/blog';
import BlogListClient from './BlogListClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog — Mehedi Hasan',
    description: 'Thoughts on web development, algorithms, machine learning, and software engineering by Mehedi Hasan.',
};

export default function BlogPage() {
    return <BlogListClient posts={blogPosts} categories={categories} />;
}
