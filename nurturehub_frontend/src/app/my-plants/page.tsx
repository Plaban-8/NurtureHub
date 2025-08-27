
import { getPlantsByUserId } from "./service";
import MyPlantsView from "./view";

export default async function MyPlantsPage() {
  const plants = await getPlantsByUserId();
  return <MyPlantsView data={{ plants }} />
}