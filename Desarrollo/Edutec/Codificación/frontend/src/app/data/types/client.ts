import { Course } from "./course";

export interface Client {
  _id      ?: string;
  email    ?: string;
  favorites?: string[]
}