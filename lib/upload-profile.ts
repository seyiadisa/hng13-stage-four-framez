import { decode } from "base64-arraybuffer";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import { supabase } from "./supabase";

export const uploadImage = async (
  imageAsset: ImagePicker.ImagePickerAsset
): Promise<string | undefined> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const base64 = imageAsset.base64!;
  const filePath = `${user!.id}/${Date.now()}.${imageAsset.mimeType?.split("/")[1] || "jpg"}`;
  const contentType = imageAsset.mimeType ?? "image/jpeg";
  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(filePath, decode(base64), { contentType });

  if (error) {
    Alert.alert("Error uploading image", error.message);
    return;
  }

  return data.path;
};

export const uploadProfileText = async (
  name: string,
  bio: string,
  imagePath?: string
) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("profiles")
    .update({
      name,
      bio,
      avatar_url: imagePath,
    })
    .eq("id", user!.id);

  if (error) {
    Alert.alert("Error updating profile", error.message);
    return;
  }
};
