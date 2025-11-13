import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { Alert } from "react-native";

export const useHomeFeed = () => {};

export const useExploreFeed = () => {
  return useQuery({
    queryKey: ["explore_feed"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .neq("author_id", user!.id)
        .order("created_at", { ascending: false });

      if (error) {
        Alert.alert("Error fetching explore feed", error.message);
        return [];
      }
      return data;
    },
  });
};
