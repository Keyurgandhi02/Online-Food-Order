import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import Loader from "./loader";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState();
  useEffect(() => {
    const fetchMeals = async () => {
      const data = await fetch(
        "https://react-http-a3530-default-rtdb.firebaseio.com/food.json"
      );

      if (!data.ok) {
        throw new Error("Oops Something Went Wrong!!");
      }
      const foodData = await data.json();

      const loadedMeals = [];

      for (const key in foodData) {
        loadedMeals.push({
          id: key,
          name: foodData[key].name,
          description: foodData[key].description,
          price: foodData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setIsError(error.message);
    });
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section>
      {isLoading && <Loader></Loader>}

      <section className={classes.meals}>
        <Card>
          {isError && <h3>{isError}</h3>}
          <ul>{mealsList}</ul>
        </Card>
      </section>
    </section>
  );
};

export default AvailableMeals;
