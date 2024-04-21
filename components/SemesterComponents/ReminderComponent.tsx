import React from 'react'
import { examplePosts } from './_DummyReminder';
import PostsContiner from './PostsContiner';



const ReminderComponent = () => {
  return (
    <div className="w-full  rounded-md 
      flex flex-col space-y-4
    ">
      {
        examplePosts.map((val, ind) => (
          <PostsContiner
            postId={val.postId}
            author={val.author}
            postContent={ val.postContent}
            authorImageUrl={val.authorImageUrl}
            postDate = {val.postDate}
            files = {val.files}
            comment = {val.comment}
          />
        ))
      }
    </div>
  )
}

export default ReminderComponent;