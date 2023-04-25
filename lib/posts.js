import { readFile, readdir } from "fs/promises";
import { marked } from "marked";
import matter from "gray-matter";

export async function getPost(slug) {
  const source = await readFile(`content/posts/${slug}.md`, "utf8");
  const {
    data: { title, date },
    content,
  } = matter(source);
  const body = marked(content);
  return {
    title,
    date,
    body,
  };
}

export async function getSlugs() {
  const suffix = ".md";
  const files = await readdir("content/posts");
  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(suffix, ""));
}

export async function getPosts() {
  const slugs = await getSlugs();
  return Promise.all(
    slugs.map(async (slug) => ({ slug, ...(await getPost(slug)) }))
  );
}
