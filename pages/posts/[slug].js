import Head from "next/head";
import { getPost, getSlugs } from "../../lib/posts";

export async function getStaticPaths() {
  return {
    paths: (await getSlugs()).map((slug) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  console.log("[FirstPost] getStaticProps", slug);

  const post = await getPost(slug);

  return {
    props: {
      post,
    },
  };
}

export default function PostPage({ post }) {
  console.log("[first post] render");
  console.log(post);

  return (
    <>
      <Head>
        <title>{post.title} - My blog</title>
      </Head>
      <main>
        <p>{post.date}</p>
        <h1>{post.title}</h1>
        <article dangerouslySetInnerHTML={{ __html: post.body }}></article>
      </main>
    </>
  );
}
