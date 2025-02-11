import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import Page404 from '../Page404/Page404';
import "./Home.scss";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface ApiResponse {
  meals: Meal[];
}

export default function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['AllMeals'],
    queryFn: async () => {
      const { data } = await axios.get<ApiResponse>(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=`
      );
      return data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error || !data || !data.meals) {
    return <Page404 />;
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>All Meals</title>
      </Helmet>

      <div className="all-meals-container">
        <h1>All Meals 🍽️</h1>
        <div className="meals-wrapper">
          {data.meals.map((meal) => (
            <div key={meal.idMeal} className="meal-card">
              <div className="image-container">
                <img src={meal.strMealThumb} alt={meal.strMeal} />
              </div>
              <h3>{meal.strMeal}</h3>
              <Link to={`/categories/${meal.strCategory}/Meal-Details/${meal.idMeal}`}>
                <button className="view-recipe-btn">View Recipe</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
} 
