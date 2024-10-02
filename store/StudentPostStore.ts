import { StudentPost } from '@/components/SemesterComponents/_DummyReminder';
import {create} from 'zustand'
import { persist } from 'zustand/middleware';

interface StudentPostStore {
    posts: StudentPost[];
    addPost: (post: StudentPost) => void;
    deletePost: (postId: number) => void;
}

export const useStudentPostStore = create<StudentPostStore>() (
    persist(
        (set) => ({
            posts: [],
            addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
            deletePost: (postId) => set((state) => ({ posts: state.posts.filter((post) => post.postId !== postId) })),
        }),
        {
            name: 'student-post-store',
        }
    )
)