import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../supabase/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query;
  console.log("slug", slug);

  const { data } = await supabase
    .from("links")
    .select("*")
    .eq("slug", slug)
    .limit(1)
    .single();

  console.log("Data", data);

  res.json({ message: "Hello world" });
};
