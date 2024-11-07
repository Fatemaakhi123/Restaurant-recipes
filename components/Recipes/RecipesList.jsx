"use client";
import HttpKit from "@/common/helpers/HttpKit";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import Modal from "../Modal";
import SingleRecipe from "./SingleRecipe";

const RecipesList = () => {
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["recipes"],
    queryFn: HttpKit.getTopRecipes,
  });
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    setIsLoggedIn(!!currentUser); 
  }, []);

  useEffect(() => {
    if (data) {
      setSelectedRecipe(data[0]);
    }
  }, [data]);

  const handleDetailsOpen = (recipe) => {
    setSelectedRecipe(recipe);
    setOpenDetails(true);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      alert("You must be logged in to add items to your cart.");
      return;
    }

    if (!selectedRecipe) {
      console.error("No item selected to add to cart");
      return;
    }

    const cartItem = {
      id: selectedRecipe.idMeal,
      name: selectedRecipe.strMeal,
      description: selectedRecipe.strInstructions || "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      image: selectedRecipe.strMealThumb,
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
    setCart(existingCart);
    setOpenDetails(false); 
    alert(`${cartItem.name} has been added to your cart.`);
  };

  const filteredRecipes = data?.filter((recipe) => {
    const recipeName = recipe.strMeal.toLowerCase();
    return recipeName.includes(searchQuery.toLowerCase());
  });

  if (isLoading) return <div>Loading recipes...</div>;
  if (error) return <div>Error loading recipes: {error.message}</div>;

  return (
    <div className="bg-gray-50 py-10 p-5">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-center">Top Recipes</h1>

        <div className="my-6 text-center">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for recipes..."
            className="w-full max-w-3xl mx-auto p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-lg"
          />
        </div>

        <div className="relative py-16">
          <div className="container relative m-auto px-6 text-gray-500 md:px-12">
            <div className="grid gap-6 md:mx-auto md:w-8/12 lg:w-full lg:grid-cols-3">
              {filteredRecipes?.length > 0 ? (
                filteredRecipes.map((recipe) => (
                  <div key={recipe.idMeal} className="flex flex-col items-center">
                    <RecipeCard
                      recipe={recipe}
                      handleDetailsOpen={() => handleDetailsOpen(recipe)}
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500">
                  No recipes found for your search.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={openDetails} setIsOpen={setOpenDetails}>
        {selectedRecipe && <SingleRecipe recipe={selectedRecipe} setIsOpen={setOpenDetails} />}
        
        <div className="flex justify-center mt-4">
          <button
            onClick={handleAddToCart} 
            className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-700"
            style={{ fontSize: "0.8rem" }}
          >
            Add to Cart
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default RecipesList;
