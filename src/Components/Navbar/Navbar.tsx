import { Link } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import axios from "axios";
import Loading from "../Loading/Loading";
import Page404 from '../Page404/Page404';


export default function Navbar() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
          const {data} = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
          return data
        },
      })
    
      if (isLoading) {
        return <Loading/>; 
      }
    
      if (error) {
        return <Page404/>; 
      }
  return (
    <>
    <div className="bg-[#F4F2EE]">
    <h1 className="bg-gradient-to-r from-[#FF8C00] to-[#D23669] bg-clip-text text-transparent font-extrabold text-center text-4xl md:text-5xl mt-10">
      Learn, Cook, Eat Your Food
    </h1>
  
    <ul className="flex flex-wrap items-center  text-gray-900 dark:text-white mt-4 rounded-xl">
      {data.categories.map(category => (
        <Link to={`categories/${category.strCategory}`} key={category.idCategory}>
          <li
            key={category.idCategory}
            className="px-6 py-2 rounded-2xl opacity-65 bg-gradient-to-r from-[#FF8C00] to-[#D23669] bg-clip-text text-transparent font-extrabold text-lg text-center hover:opacity-100 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            {category.strCategory}
          </li>
        </Link>
      ))}
    </ul>
    </div>
  </>
  
  
  
  
  )
}
