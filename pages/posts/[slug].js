import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';

export default function Post(props) {
  return (
    <div className='container w-[80%] mx-auto mt-10'>
        {
            props.frontMatter && props.mdxSource && (
                <div>
                    <Head>
                        <title>{props.frontMatter.title}</title>
                    </Head>
                <h1 className='font-semibold my-8 text-xl text-green-700'>{props.frontMatter.title}</h1>
                
                <MDXRemote {...props.mdxSource} />
                </div>

                
            )
        }
        
    </div>
  )
}


export async function getStaticPaths(){
    const files = fs.readdirSync(path.join("posts"));
    const paths = files.map((file) => {
        return {
            params:{
                slug:file.replace("mdx","")
            }
        }
    });
    return {
        paths,
        fallback:true
    }
}

export async function getStaticProps({params:{slug}}){
    const fileData = fs.readFileSync(path.join("posts",slug+'.mdx'));
    const {data,content} = matter(fileData);
    const mdxSource = await serialize(content);
    return {
        props:{
            frontMatter:data,
            slug,
            mdxSource
        }
    }
}
