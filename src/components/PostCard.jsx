import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import appwriteService from "../appwrite/config"
import {Link} from "react-router-dom"

function PostCard({
    $id, title , featuredImage
}) {
  return (
    <Link to={`/post/${$id}`}>
    <div className="w-[300px] rounded-md border bg-white">
      <img
        src={appwriteService.getFilePreview(featuredImage)} alt={title}
        className="h-[200px] w-full rounded-t-md object-cover"
      />
      <div className="p-4 ">
        <div className='h-14 overflow-hidden'>
        <h1 className="inline-flex items-center  text-lg font-semibold">
          {title} &nbsp; <ArrowUpRight className="h-4 w-4" />
            
        </h1>
        </div>
        <p className="mt-3 text-sm text-gray-600">
        "Sending Warm Regards Across the Miles: Post from the Heart"
        </p>
        <button
          type="button"
          className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Read
        </button>
      </div>
    </div>
</Link>
  )
}



export default PostCard