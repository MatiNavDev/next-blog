import Link from "next/Link";
import Head from "next/head";
import { getPosts } from "../lib/posts";

export async function getStaticProps() {
  const posts = await getPosts();

  return {
    props: {
      posts,
    },
  };
}

function HomePage({ posts }) {
  const slugsComponents = posts.map((post, index) => {
    const href = `/posts/${post.slug}`;
    return (
      <li key={post.slug}>
        <Link href={href}>{post.title}</Link>
      </li>
    );
  });

  console.log("[home] render");

  return (
    <>
      <Head>
        <title>My blog</title>
        <meta name="description" value="this is my blog" />
      </Head>
      <main>
        <h1>My Blog</h1>
        <ul>{slugsComponents}</ul>
      </main>
    </>
  );
}

export default HomePage;
