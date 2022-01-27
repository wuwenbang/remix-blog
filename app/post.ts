import path from 'path';
import fs from 'fs/promises';
import parseFrontMatter from 'front-matter';
import { marked } from 'marked';

export type Post = {
  slug: string;
  title: string;
};

interface MatterResult {
  attributes: { title?: string };
  body: string;
}

type NewPost = {
  title: string;
  slug: string;
  markdown: string;
};

// relative to the server output not the source!
const postsPath = path.join(__dirname, '..', 'posts');

export async function getPosts() {
  const dir = await fs.readdir(postsPath);
  return Promise.all(
    dir.map(async filename => {
      const file = await fs.readFile(path.join(postsPath, filename));
      const {
        attributes: { title },
      }: MatterResult = parseFrontMatter(file.toString());
      const slug = filename.replace(/\.md$/, '');
      return { slug, title };
    })
  );
}

export async function getPost(slug: string) {
  const filepath = path.join(postsPath, slug + '.md');
  const file = await fs.readFile(filepath);
  const {
    attributes: { title },
    body,
  }: MatterResult = parseFrontMatter(file.toString());
  const html = marked(body);
  return { slug, html, title };
}

export async function createPost(post: NewPost) {
  const md = `---\ntitle: ${post.title}\n---\n\n${post.markdown}`;
  await fs.writeFile(path.join(postsPath, post.slug + '.md'), md);
  return getPost(post.slug);
}
