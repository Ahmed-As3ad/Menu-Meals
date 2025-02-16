import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { FaYoutube, FaExternalLinkAlt } from "react-icons/fa"; 
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import Page404 from "../Page404/Page404";
import "./MealDetails.scss";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strInstructions?: string;
  strYoutube?: string;
  strSource?: string;
  [key: string]: string | undefined;
}

export default function MealDetails() {
  const { mealId } = useParams();
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const handleCheckboxChange = (ingredient: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((item) => item !== ingredient)
        : [...prev, ingredient]
    );
  };

  const isChecked = (ingredient: string) => selectedIngredients.includes(ingredient);

  const { data, isLoading, error } = useQuery<Meal>({
    queryKey: ["mealDetails", mealId],
    queryFn: async () => {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
      );
      return response.data.meals ? response.data.meals[0] : null;
    },
  });

  if (isLoading) return <Loading />;
  if (error || !data) return <Page404 />;

  const ingredients: { ingredient: string; measure: string }[] = Object.entries(data)
    .filter(([key, value]) => key.startsWith("strIngredient") && value)
    .map(([key, ingredient]) => {
      const index = key.replace("strIngredient", "");
      const measure = data[`strMeasure${index}`] || "";
      return { ingredient: ingredient as string, measure };
    });

  return (
    <div className="container">
      <h1 className="title">{data.strMeal}</h1>

      <div className="flex-container">
        <div className="image-container">
          <img src={data.strMealThumb} alt={data.strMeal} />
        </div>

        <div className="ingredients-container">
          <h2>Ingredients</h2>
          <div className="ingredients-list">
            <ul>
              {ingredients.map(({ ingredient, measure }, i) => (
                <li key={i} className={`checkbox-item ${isChecked(ingredient) ? "checked" : ""}`}>
                  <input
                    type="checkbox"
                    checked={isChecked(ingredient)}
                    onChange={() => handleCheckboxChange(ingredient)}
                  />
                  <span className={isChecked(ingredient) ? "line-through text-gray-500" : ""}>
                    {ingredient} - {measure}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="instructions">
        <h2>Instructions</h2>
        <p>{data.strInstructions}</p>
      </div>

      <div className="buttons">
        {data.strYoutube && (
          <a href={data.strYoutube} target="_blank" rel="noopener noreferrer" className="youtube">
            <FaYoutube /> <span>Watch on YouTube</span>
          </a>
        )}
        {data.strSource && (
          <a href={data.strSource} target="_blank" rel="noopener noreferrer" className="source">
            <FaExternalLinkAlt /> <span>View Recipe Source</span>
          </a>
        )}
      </div>
    </div>
  );
}
