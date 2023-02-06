import httpService from "./httpServices";

export function createCard(card) {
  return httpService.post("/cards", card);
}

export function getAll() {
  return httpService.get("/card/my-cards");
}

export function deleteCard(id) {
  return httpService.delete(`/cards/${id}`);
}

export function updateCard(id, card) {
  return httpService.patch(`/cards/${id}`, card);
}

const cardsServies = {
  createCard,
  getAll,
  deleteCard,
  updateCard,
};

export default cardsServies;
