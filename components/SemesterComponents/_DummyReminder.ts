export interface StudentPost {
    postId: number;
    author: string, 
    postContent: string,
    authorImageUrl?: string, 
    postDate: Date,
    files?: string[], 
}



export const examplePosts: StudentPost[] = [
    {
        postId: 1, 
        author: 'Tajbir Ahmed', 
        postContent: "Post reagarding Project Submission of Web Lab Engineering",
        authorImageUrl: '', 
        postDate: new Date(), 
    }, 
    {
        postId: 2,
        author: 'Papon Banik',
        postContent: "Post reagarding Telecommunication CT",
        authorImageUrl: '',
        postDate: new Date(),
    }
]
