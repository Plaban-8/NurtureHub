
export const dynamic = "force-dynamic";
import DashboardView from "./view";
import { getUserData } from "./service";
import { userDTO } from "./model";

export default async function DashboardPage() {
  const user: userDTO = await getUserData();
  return <div><DashboardView data={{ user }}/></div>;
}