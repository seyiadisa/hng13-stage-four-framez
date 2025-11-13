import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { Alert } from "react-native";

export const useHomeFeed = () => {
  return useQuery({
    queryKey: ["home_feed"],
    refetchOnMount: "always",

    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data } = await supabase
        .from("follows")
        .select("following_id")
        .eq("follower_id", user!.id);

      const followingIds = data?.map((follow) => follow.following_id);
      const { data: posts, error } = await supabase
        .from("posts")
        .select("*")
        .in("author_id", followingIds || [])
        .order("created_at", { ascending: false });

      if (error) {
        Alert.alert("Error fetching home feed", error.message);
        return [];
      }
      return posts;
    },
  });
};

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
