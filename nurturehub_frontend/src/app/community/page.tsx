import CommunityView from "./view"
import {getAllPosts} from "./service"
import { Post } from "./model";
export default async function CommunityPage(){
  const posts: Post[] = await getAllPosts();
  posts.reverse();
  return (
    <div>
    <CommunityView data = {{posts}}/>
    </div>
  )
}