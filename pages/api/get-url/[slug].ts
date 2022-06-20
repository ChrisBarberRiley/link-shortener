import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../supabase/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query;
  console.log("slug", slug);

  // Should never occur as route would go to index and not this page
  if (!slug) {
    res.status(400).json({ error: "Missing slug" });
    return;
  }

  const { data, error } = await supabase
    .from("links")
    .select("*")
    .eq("slug", slug)
    .limit(1)
    .single();

  if (error) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  return res.redirect(data.url);
};
