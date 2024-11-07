"use client";
import Image from "next/image";
import React from "react";

const SingleRecipe = ({ recipe }) => {
  if (!recipe) return null;

  return (
    <div className="flex flex-col items-start gap-4 p-4 text-gray-700">
      <h2 className="text-lg font-semibold">{recipe.strMeal}</h2>
      <div className="w-full max-w-xs">
        <Image
          src={recipe.strMealThumb}
          width={600}
          height={300}
          alt={recipe.strMeal}
          className="rounded-lg shadow-lg"
        />
      </div>
      <p className="text-gray-600">
        Obcaecati, quam? Eligendi, nulla numquam natus laborum porro at cum,
        consectetur ullam tempora ipsa iste officia sed officiis! Incidunt ea
        animi officiis.
      </p>
    </div>
  );
};

export default SingleRecipe;
