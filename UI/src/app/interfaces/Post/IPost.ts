export interface Post{
    id:number,
    title:string,
    description:string,
    author:string,
    isActive:boolean,
    createdAt:Date,
    updatedAt:Date,
    commentsCount:number,
    authorUsername:string
}