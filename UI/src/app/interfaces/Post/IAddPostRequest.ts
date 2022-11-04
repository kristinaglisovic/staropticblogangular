export interface IAddPostRequest{
    Title:string,
    Description:string,
    UserId:number,
    CategoriesIds:any[],
    TagsIds:any[],
    Image:string
}