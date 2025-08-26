
import { getPlantsByUserId } from "./service";
import MyPlantsView from "./view";

export default async function MyPlantsPage() {
  const plants = await getPlantsByUserId();
  console.log(plants);

  return <MyPlantsView data={{ plants }} />
}