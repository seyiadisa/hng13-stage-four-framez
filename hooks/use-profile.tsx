import { supabase } from "@/lib/supabase";
import { useQueries, useQuery } from "@tanstack/react-query";
import { Alert } from "react-native";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("author_id", user!.id)
        .order("created_at", { ascending: false });

      if (error) {
        Alert.alert("Error fetching personal posts", error.message);
        return [];
      }

      return data;
    },
  });
};

export const useUserFollowers = (userId?: string) => {
  return useQueries({
    queries: [
      {
        queryKey: ["userFollowers", userId],
        queryFn: async () => {
          const {
            data: { user },
          } = await supabase.auth.getUser();

          if (!userId) {
            userId = user!.id;
          }

          const { data } = await supabase
            .from("follows")
            .select("*")
            .eq("following_id", userId);
          return data;
        },
      },
      {
        queryKey: ["userFollowing", userId],
        queryFn: async () => {
          const {
            data: { user },
          } = await supabase.auth.getUser();

          if (!userId) {
            userId = user!.id;
          }

          const { data } = await supabase
            .from("follows")
            .select("*")
            .eq("follower_id", userId);

          return data;
        },
      },
    ],
  });
};
