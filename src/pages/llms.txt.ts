import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import {
  person,
  about,
  skills,
  experience,
  projects,
  education,
  achievements,
} from '../data/site';

// Serves /llms.txt — a plain-text index for AI agents and LLMs,
// following the llmstxt.org convention.
export const GET: APIRoute = async ({ site }) => {
  const base = site?.href.replace(/\/$/, '') ?? '';

  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  const lines: string[] = [];

  lines.push(`# ${person.name}`);
  lines.push('');
  lines.push(`> ${person.title} based in ${person.location}. ${person.tagline}`);
  lines.push('');
  lines.push(about.map((p) => p.replace(/\s+/g, ' ').trim()).join(' '));
  lines.push('');

  lines.push('## Contact');
  lines.push(`- Email: ${person.email}`);
  if (person.github) lines.push(`- GitHub: ${person.github}`);
  if (person.leetcode) lines.push(`- LeetCode: ${person.leetcode}`);
  if (person.linkedin) lines.push(`- LinkedIn: ${person.linkedin}`);
  lines.push(`- Résumé: ${base}${person.resume}`);
  lines.push('');

  lines.push('## Skills');
  for (const group of skills) {
    lines.push(`- ${group.label}: ${group.items.join(', ')}`);
  }
  lines.push('');

  lines.push('## Experience');
  for (const job of experience) {
    lines.push(`### ${job.role} — ${job.company} (${job.period})`);
    for (const h of job.highlights) lines.push(`- ${h}`);
    lines.push('');
  }

  lines.push('## Projects');
  for (const project of projects) {
    lines.push(`### ${project.name} (${project.year})`);
    lines.push(`Stack: ${project.stack.join(', ')}`);
    for (const d of project.description) lines.push(`- ${d.replace(/\s+/g, ' ').trim()}`);
    lines.push('');
  }

  lines.push('## Education');
  for (const e of education) {
    lines.push(`- ${e.degree}, ${e.school} (${e.period}) — ${e.detail}`);
  }
  lines.push('');

  lines.push('## Achievements & Certifications');
  for (const a of achievements) lines.push(`- ${a}`);
  lines.push('');

  lines.push('## Blog Posts');
  if (posts.length === 0) {
    lines.push('- (none yet)');
  } else {
    for (const post of posts) {
      const date = post.data.pubDate.toISOString().slice(0, 10);
      lines.push(`- [${post.data.title}](${base}/blog/${post.id}) — ${date}: ${post.data.description}`);
    }
  }
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
