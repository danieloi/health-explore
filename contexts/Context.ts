import { createContext } from "react";
import { Hospital } from "types";

const Context = createContext<{
  hospitals: Hospital[];
}>({
  hospitals: [],
});

const { Provider, Consumer } = Context;

export { Context, Provider, Consumer };
