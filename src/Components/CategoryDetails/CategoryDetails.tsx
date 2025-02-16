import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import Page404 from '../Page404/Page404';
interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory?: string;
  strInstructions?: string;
  strMealThumb?: string;
}



export default function CategoryDetails() {
    const {category} = useParams();  
    const { data, isLoading, error } = useQuery({
        queryKey: ['categoryFilter', category],
        queryFn: async () => {
            const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
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
     <Helmet>
        <meta charSet="utf-8" />
        <title>{category}</title>
      </Helmet>

      <div className="all-meals-container">
  <div className="meals-wrapper">
    {data?.meals?.map((meal: Meal) => (
      <div key={meal.idMeal} className="meal-card">
        <div className="image-container">
          <img src={meal.strMealThumb} alt={meal.strMeal} />
        </div>
        <h3>{meal.strMeal}</h3>
        <Link to={`/categories/${category}/Meal-Details/${meal.idMeal}`}>
          <button className="view-recipe-btn">View Recipe</button>
        </Link>
      </div>
    ))}
  </div>
</div>



    </>
  )
}
