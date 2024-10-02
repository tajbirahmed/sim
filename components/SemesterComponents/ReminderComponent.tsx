import React from 'react'
import { examplePosts } from './_DummyReminder';
import PostsContiner from './PostsContiner';
import { useStudentPostStore } from '@/store/StudentPostStore';



const ReminderComponent = () => {

  const posts = useStudentPostStore((state) => state.posts);

  return (
    <div className="w-full  rounded-md 
      flex flex-col space-y-4
    ">
      {
        posts.map((val, ind) => (
          <PostsContiner
            key={ind}
            postId={val.postId}
            author={val.author}
            postContent={ val.postContent}
            authorImageUrl={val.authorImageUrl}
            postDate = {val.postDate}
            files = {val.files}
          />
        ))
      }
    </div>
  )
}

export default ReminderComponent;