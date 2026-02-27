import type { Show } from "./Show";
import type { Cast } from "./Cast";

export interface ShowDetails extends Show {
  _embedded: {
    cast: Cast[];
  };
}
