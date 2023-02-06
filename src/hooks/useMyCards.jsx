import { useEffect } from "react";
import { useState } from "react";
import cardsServies from "../services/cardsServices";

export const useMyCards = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const getCards = async () => {
      const { data } = await cardsServies.getAll();
    };
    getCards();
  });
  return cards;
};
