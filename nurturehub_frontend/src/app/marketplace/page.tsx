import MarketplaceView from "./view";
import { getMarketPosts } from "./service";
export default async function MarketplacePage() {
  const posts = await getMarketPosts();
  posts.reverse();
  return (
    <div>
      <MarketplaceView data={{ posts }} />
    </div>
  );
}