export interface StudentPost {
    postId: number;
    author: string, 
    postContent: string,
    authorImageUrl?: string, 
    postDate: Date,
    files?: string, 
    comment?: Comment[]
}

export interface Comment { 
    commentId: number, 
    postId: number, 
    author: string,
    authorImageUrl?: string, 
    comment: string,
    date: Date
}

export const examplePosts: StudentPost[] = [
    {
        postId: 1, 
        author: 'Tajbir Ahmed', 
        postContent: "Post reagarding Project Submission of Web Lab Engineering",
        authorImageUrl: '', 
        postDate: new Date(), 
        comment: [
            {
                commentId: 1,
                postId: 1, 
                author: 'Labib Taher Chowdhury', 
                authorImageUrl: '', 
                comment: 'This posst was helpful', 
                date: new Date()
            }, 
            {
                commentId: 2,
                postId: 1,
                author: 'Labib Taher Chowdhury',
                authorImageUrl: '',
                comment: 'This posst was helpful',
                date: new Date()
            }
        ]
    }, 
    {
        postId: 2,
        author: 'Papon Banik',
        postContent: "Post reagarding Telecommunication CT",
        authorImageUrl: '',
        postDate: new Date(),
        comment: [
            {
                commentId: 3,
                postId: 2,
                author: 'Labib Taher Chowdhury',
                authorImageUrl: '',
                comment: 'This posst was helpful',
                date: new Date()
            },
            {
                commentId: 4,
                postId: 2,
                author: 'Labib Taher Chowdhury',
                authorImageUrl: '',
                comment: 'This posst was helpful',
                date: new Date()
            }
        ]
    }
]
