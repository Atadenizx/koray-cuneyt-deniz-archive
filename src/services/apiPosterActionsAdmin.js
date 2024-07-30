import supabase, { supabaseUrl } from "./supabase";

function sanitizeFileName(fileName) {
  return fileName
    .replace(/[^a-z0-9]/gi, "_") // Replace non-alphanumeric characters with underscores
    .toLowerCase(); // Convert to lowercase for consistency
}

export async function addOrEditPosterApi({ poster }) {
  console.log(poster);
  try {
    // 1- Configuring the image file
    const imageName = `${Math.random()}-${poster.image.name}`.replaceAll(
      "/",
      "",
    );
    console.log("product.image:", poster.image);
    console.log("product image name:", poster.image.name);
    const imagePath = `${supabaseUrl}/storage/v1/object/public/poster-images/${imageName}`;

    // 2- Creating the product
    const { data, error } = await supabase
      .from("posters")
      .insert([{ ...poster, image: imagePath }])
      .select();

    if (error) {
      console.error("Poster insert error:", error);
      throw new Error(error.message);
    }

    // Ensure data is not undefined
    if (!data || data.length === 0) {
      throw new Error("Failed to insert product");
    }

    const posterId = data[0].id;

    // 3- Uploading the image
    const { error: storageError } = await supabase.storage
      .from("poster-images")
      .upload(imageName, poster.image);

    // 4- Deleting the product if image failed to upload
    if (storageError) {
      console.error("Image upload error:", storageError);
      console.log("data id:", posterId);
      await supabase.from("posters").delete().eq("id", posterId);
      throw new Error(storageError.message);
    }

    return data;
  } catch (err) {
    console.error("addPosterApi error:", err);
    throw err;
  }
}

// export async function editPosterApi({ poster, id }) {
//   const imageName = `${Math.random()}-${poster.image.name}`.replaceAll("/", "");
//   console.log("product.image:", poster.image);
//   console.log("product image name:", poster.image.name);
//   const imagePath = `${supabaseUrl}/storage/v1/object/public/poster-images/${imageName}`;

//   const { data, error } = await supabase
//     .from("posters")
//     .update({ ...poster, image: imagePath })
//     .eq("id", id)
//     .select();

//   if (error) {
//     console.error("Poster edit error:", error);
//     throw new Error(error.message);
//   }

//   // Ensure data is not undefined
//   if (!data || data.length === 0) {
//     throw new Error("Failed to insert product");
//   }

//   const posterId = data[0].id;

//   // 3- Uploading the image
//   const { error: storageError } = await supabase.storage
//     .from("poster-images")
//     .upload(imageName, poster.image);

//   // 4- Deleting the product if image failed to upload
//   if (storageError) {
//     console.error("Image upload error:", storageError);
//     console.log("data id:", posterId);
//     await supabase.from("posters").delete().eq("id", posterId);
//     throw new Error(storageError.message);
//   }

//   return data;
// }

// export async function editPosterApi({ poster, id }) {
//   const imageName = `${Math.random()}-${sanitizeFileName(poster.image.name)}`;
//   console.log("product.image:", poster.image);
//   console.log("product image name:", poster.image.name);
//   const imagePath = `${supabaseUrl}/storage/v1/object/public/poster-images/${imageName}`;

//   const { data, error } = await supabase
//     .from("posters")
//     .update({ ...poster, image: imagePath })
//     .eq("id", id)
//     .select();

//   if (error) {
//     console.error("Poster edit error:", error);
//     throw new Error(error.message);
//   }

//   // Ensure data is not undefined
//   if (!data || data.length === 0) {
//     throw new Error("Failed to insert product");
//   }

//   const posterId = data[0].id;

//   // 3- Uploading the image
//   const { error: storageError } = await supabase.storage
//     .from("poster-images")
//     .upload(imageName, poster.image);

//   // 4- Deleting the product if image failed to upload
//   if (storageError) {
//     console.error("Image upload error:", storageError);
//     console.log("data id:", posterId);
//     await supabase.from("posters").delete().eq("id", posterId);
//     throw new Error(storageError.message);
//   }

//   return data;
// }

export async function editPosterApi({ poster, id }) {
  try {
    let imagePath = poster.image;

    if (poster.image instanceof File) {
      const imageName = `${Math.random()}-${poster.image.name}`.replaceAll(
        "/",
        "",
      );
      imagePath = `${supabaseUrl}/storage/v1/object/public/poster-images/${imageName}`;

      const { error: storageError } = await supabase.storage
        .from("poster-images")
        .upload(imageName, poster.image);

      if (storageError) {
        throw new Error(storageError.message);
      }
    }

    const { data, error } = await supabase
      .from("posters")
      .update({ ...poster, image: imagePath })
      .eq("id", id)
      .select();

    if (error) {
      throw new Error(error.message);
    }

    if (!data || data.length === 0) {
      throw new Error("Failed to update poster");
    }

    return data;
  } catch (err) {
    console.error("editPosterApi error:", err);
    throw err;
  }
}

export async function deletePosterApi(id) {
  console.log("supabse product id:", id);
  const { error } = await supabase.from("posters").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
