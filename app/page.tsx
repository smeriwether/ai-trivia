import Home from "./Home";
import { fetchCategories } from "./data";

const getData = async (): Promise<Category[]> => {
  return fetchCategories();
};

export default async function Page() {
  const categories = await getData();

  return <Home categories={categories} />;
}
