import Home from "./Components/Home/Home"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from "./Components/Layout/Layout"
import CategortyDatils from "./Components/CategoryDetails/CategoryDetails"
import MealDetails from "./Components/MealDetails/MealDetails"
import Page404 from './Components/Page404/Page404'

function App() {
  let router = createBrowserRouter([
    {path:'', element:<Layout/> ,children:[
      {path:'', element:<Home/>},
      {path:'categories/:category', element:<CategortyDatils/>},
      // {path:'Meal-Details/:mealId', element:<MealDetails/>},
      {path:'/categories/:category/Meal-Details/:mealId', element:<MealDetails/>},
      // {path:'contact', element:<Contact/>},
      {path:'*', element:<Page404/>}
    ]}
  ])
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
