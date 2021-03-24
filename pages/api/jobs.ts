import { getData } from "utils/api";
import hospitals from "../../data/jobs.json";

export default async (req, res) => {
  res.statusCode = 200;

  const data = getData(req, hospitals);

  // this timeout emulates unstable network connection, do not remove this one
  // you need to figure out how to guarantee that client side will render
  // correct results even if server-side can't finish replies in the right order
  await new Promise((resolve) => setTimeout(resolve, 1000 * Math.random()));

  res.json(data);
};
