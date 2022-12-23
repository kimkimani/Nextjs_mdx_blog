import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Head from 'next/head';
import Postcard from '../components/PostCard';

export default function Home(props) {
  return (
    <div className='container w-[80%] mx-auto mt-10'>
      <Head>
        <title>Cooking Blog</title>
      </Head>
      <h1 className="text-green-700 text-3xl font-bold my-12">Cooking Blog</h1>
      {
        props.posts.length > 0 ? (
          <div className='md:grid md:grid-cols-3 gap-8'>
            {
              props.posts.map((post,index) => (
                <Link href={`/posts/${post.slug}`} key={index}>
                    <Postcard post={post} />
                </Link>
              ))
            }
          </div>
        ) : (
          <h2 className='font-sans text-3xl'>No posts yet</h2>
        )
      }
    </div>
  )
}

// fetching the posts.
export async function getStaticProps(){
  let files = fs.readdirSync(path.join("posts"));
  files = files.filter(file => file.split('.')[1] == "mdx");
  const posts =  files.map(file => {
    const fileData = fs.readFileSync(path.join("posts",file),'utf-8');
    const {data} = matter(fileData);
    return {
      frontMatter:data,
      slug:file.split('.')[0],   
    }
  });
  return{
    props:{
      posts
    }
  }
}