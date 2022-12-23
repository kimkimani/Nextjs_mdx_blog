import React from 'react'

export default function PostCard({post}) {
  return (
    <div className='rounded-md w-71 transition-all hover:text-green-700 hover:shadow-sm hover-scale:100 cursor:pointer'>
        <img className='h-40 w-64' src={post.frontMatter.thumbnail} alt="postCardImage" />
        <div className='mt-2 p-2'>
            <h2 className='font-semibold text-xl'>{post.frontMatter.title}</h2>
            <p className='mt-2'>{post.frontMatter.description}</p>
        </div>
        <div className='flex flex-row space-x-4'>
            <h2 className='text-green-700'> 📅{post.frontMatter.date}</h2>
            <p className='text-green-700'>⏰{post.frontMatter.readTime} min read</p>
        </div>

    </div>
  )
}
