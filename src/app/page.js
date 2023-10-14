import fetchCategories from "@/utils/fetchCategories";
import Image from "next/image";
import Link from "next/link";

const HomePage = async () => {
  const categories = await fetchCategories() || [];

  return (
    <div>
      <h2 className="mb-5">All Products</h2>
      <div className="flex flex-wrap gap-4 md:gap-8">
        {categories.map(category => <CategoryCard key={category._id} category={category} />)}
      </div>
    </div>
  )
};


const CategoryCard = ({ category }) => {
  return (
    <Link href={`/products?category=${category.category}`}>
      <Image src={category.thumnail} width={170} height={100} alt="" />
      <h3 className="text-center font-semibold text-lg capitalize">{category.category}</h3>
    </Link>
  )
}

export default HomePage;
