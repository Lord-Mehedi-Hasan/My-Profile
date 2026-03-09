// Server component
import { blogPosts } from '@/data/blog';
import { notFound } from 'next/navigation';
import BlogPostContent from './BlogPostContent';
import type { Metadata } from 'next';

interface Props { params: Promise<{ slug: string }>; }

export async function generateStaticParams() {
    return blogPosts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = blogPosts.find(p => p.slug === slug);
    if (!post) return {};
    return {
        title: `${post.title} — Mehedi Hasan`,
        description: post.excerpt,
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = blogPosts.find(p => p.slug === slug);
    if (!post) notFound();

    const idx = blogPosts.findIndex(p => p.slug === slug);
    const prev = blogPosts[idx - 1] ?? null;
    const next = blogPosts[idx + 1] ?? null;

    return <BlogPostContent post={post} prev={prev} next={next} />;
}
