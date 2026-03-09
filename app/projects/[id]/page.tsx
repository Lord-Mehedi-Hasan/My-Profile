// Server component — no 'use client'
import { projects } from '@/data/projects';
import { notFound } from 'next/navigation';
import ProjectContent from './ProjectContent';

// Next.js 16 App Router: params is a Promise
interface Props {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    return projects.map(p => ({ id: p.id }));
}

export default async function ProjectPage({ params }: Props) {
    const { id } = await params;
    const project = projects.find(p => p.id === id);
    if (!project) notFound();

    const idx = projects.findIndex(p => p.id === id);
    const prev = projects[idx - 1] ?? null;
    const next = projects[idx + 1] ?? null;

    return <ProjectContent project={project} prev={prev} next={next} />;
}
