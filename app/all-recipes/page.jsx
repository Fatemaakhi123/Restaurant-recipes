"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import Navbar from "@/components/Navbar";
import Navbarone from "@/components/Navbarone";

const fetchCategories = async () => {
  const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
  const data = await response.json();
  return data.categories;
};

const fetchMealsByIngredient = async () => {
  const response = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast");
  const data = await response.json();
  return data.meals;
};

const fetchSeafoodMeals = async () => {
  const response = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood");
  const data = await response.json();
  return data.meals;
};

const fetchCanadianMeals = async () => {
  const response = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian");
  const data = await response.json();
  return data.meals;
};

const AllRecipes = () => {
  const { data: categories, isLoading: isLoadingCategories, error: errorCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const { data: chickenMeals, isLoading: isLoadingChicken, error: errorChicken } = useQuery({
    queryKey: ["chicken_meals"],
    queryFn: fetchMealsByIngredient,
  });

  const { data: seafoodMeals, isLoading: isLoadingSeafood, error: errorSeafood } = useQuery({
    queryKey: ["seafood_meals"],
    queryFn: fetchSeafoodMeals,
  });

  const { data: canadianMeals, isLoading: isLoadingCanadian, error: errorCanadian } = useQuery({
    queryKey: ["canadian_meals"],
    queryFn: fetchCanadianMeals,
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    setIsLoggedIn(!!currentUser);
  }, []);

  useEffect(() => {
    if (categories) setFilteredCategories(categories);
  }, [categories]);

  const handleSearch = () => {
    if (!searchInput) {
      setFilteredCategories(categories);
    } else {
      const filtered = categories.filter(category =>
        category.strCategory.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredCategories(filtered);
    }
  };

  const openModalHandler = (item) => {
    setSelectedItem(item);
    setOpenModal(true);
  };

  const getDummyDescription = () => 
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      alert("You must be logged in to add items to your cart.");
      return;
    }

    if (!selectedItem) {
      console.error("No item selected to add to cart");
      return;
    }

    const cartItem = {
      id: selectedItem.idMeal || selectedItem.idCategory,
      name: selectedItem.strMeal || selectedItem.strCategory,
      description: selectedItem.strInstructions || getDummyDescription(),
      image: selectedItem.strMealThumb || selectedItem.strCategoryThumb,
      price: 10,
      quantity: 1,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemIndex = existingCart.findIndex((item) => item.id === cartItem.id);
    if (itemIndex >= 0) {
      existingCart[itemIndex].quantity += 1;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    setOpenModal(false);
    alert(`${cartItem.name} has been added to your cart.`);
  };

  if (isLoadingCategories || isLoadingChicken || isLoadingSeafood || isLoadingCanadian) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (errorCategories || errorChicken || errorSeafood || errorCanadian) {
    return <div className="min-h-screen flex items-center justify-center">Error fetching data</div>;
  }

  return (
    <>
      {isLoggedIn ? <Navbarone /> : <Navbar />}
      <div className="bg-gray-50 min-h-screen flex items-center p-4">
        <div className="container mx-auto py-12 px-6 mt-5">
          <h1 className="text-4xl text-center font-bold mb-8">All Recipes</h1>

          <div className="mb-8 text-center">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search categories..."
              className="p-3 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 border rounded-lg"
            />
            <button
              onClick={handleSearch}
              className="ml-2 py-2 px-6 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              Search
            </button>
          </div>

          <h2 className="text-3xl text-center font-semibold mb-6">Recipe Categories</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredCategories.map((category) => (
              <div
                key={category.idCategory}
                className="relative border border-gray-200 rounded-lg bg-white p-4 shadow-md"
                onClick={() => openModalHandler(category)}
              >
                <img
                  src={category.strCategoryThumb}
                  alt={category.strCategory}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h3 className="text-xl font-semibold">{category.strCategory}</h3>
                <p className="text-sm text-gray-600">{category.strCategoryDescription}</p>
              </div>
            ))}
          </div>

          {/* Meals sections */}
          <h2 className="text-3xl text-center font-semibold mt-12 mb-6">Meals with Chicken Breast</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {chickenMeals.map((meal) => (
              <div
                key={meal.idMeal}
                className="relative border border-gray-200 rounded-lg bg-white p-4 shadow-md"
                onClick={() => openModalHandler(meal)}
              >
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h3 className="text-xl font-semibold">{meal.strMeal}</h3>
                <p className="text-sm text-gray-600">{getDummyDescription()}</p>
              </div>
            ))}
          </div>

          <Modal isOpen={openModal} setIsOpen={setOpenModal}>
            {selectedItem && (
              <div className="p-4">
                <h2 className="text-2xl font-bold">{selectedItem.strMeal || selectedItem.strCategory}</h2>
                <img
                  src={selectedItem.strMealThumb || selectedItem.strCategoryThumb}
                  alt={selectedItem.strMeal || selectedItem.strCategory}
                  className="w-full h-64 object-cover rounded-md mt-4"
                />
                <p className="mt-4 text-gray-700">
                  {selectedItem.strCategoryDescription || getDummyDescription()}
                </p>
                <div className="flex justify-center">
                  <button
                    onClick={handleAddToCart}
                    className="bg-yellow-500 text-white py-1 px-2 mt-2 rounded hover:bg-yellow-700"
                    style={{ fontSize: "0.8rem" }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            )}
          </Modal>
        </div>
      </div>
    </>
  );
};

export default AllRecipes;
