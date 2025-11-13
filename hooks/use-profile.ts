import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { Alert } from "react-native";

export const useProfileInfo = (userId?: string) => {
  return useQuery({
    queryKey: ["profile_info", userId],
    queryFn: async () => {
      if (!userId) {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        userId = user!.id;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        Alert.alert("Error fetching profile", error.message);
        return {};
      }

      return data;
    },
  });
};

export const useProfilePosts = () => {
  return useQuery({
    queryKey: ["profile_posts"],
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

export const useFollowers = (userId?: string) => {
  return useQuery({
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
  });
};

export const useFollowing = (userId?: string) => {
  return useQuery({
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
  });
};
