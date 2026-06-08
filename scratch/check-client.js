import { supabase } from "../src/integrations/firebase/client";

const run = async () => {
  const { data, error } = await supabase
    .from("industries")
    .select("*")
    .eq("published", true)
    .order("sort_order");
  console.log("Data length:", data?.length);
  console.log("Data items:", JSON.stringify(data, null, 2));
  console.log("Error:", error);
};

run().catch(console.error);
