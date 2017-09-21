import axios from "axios";

export const client = axios.create({
  baseURL: "http://pokeapi.co/api/v2",
  headers: {
    "Content-Type": "application/json"
  }
});
