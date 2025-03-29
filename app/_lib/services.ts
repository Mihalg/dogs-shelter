import { browserClient } from "../_utils/supabase/client";
const supabase = browserClient();

export async function getAnnouncementData(id: string | null) {
  if (!id) return null;

  const { data: announcement, error } = await supabase
    .from("announcements")
    .select("id, name, age, breed, sex, description, main_image, images")
    .eq("id", +id)
    .single();

  if (error) console.log(error);

  return announcement;
}

export async function getAnnouncementImages(id: string | null) {
  if (!id) return;

  const { data: mainImgList, error: mainImageError } = await supabase.storage
    .from("announcements-images")
    .list(`${id}/main`);

  if (mainImageError) {
    console.log(mainImageError?.message);
    throw new Error("Wystąpił błąd");
  }

  const { data: mainImg, error: mainImgDownloadError } = await supabase.storage
    .from("announcements-images")
    .download(`${id}/main/${mainImgList[0].name}`);

  if (mainImgDownloadError) {
    console.log(mainImgDownloadError?.message);
    throw new Error("Wystąpił błąd");
  }

  async function downloadImages(id: string) {
    const { data, error } = await supabase.storage
      .from("announcements-images")
      .list(id);

    if (error) {
      console.error("Błąd pobierania listy plików:", error);
      return;
    }

    const downloadedFiles = await Promise.all(
      data
        .filter((file) => file.id)
        .map(async (file) => {
          const { data: fileData, error: downloadError } =
            await supabase.storage
              .from("announcements-images")
              .download(`${id}/${file.name}`);

          if (downloadError) {
            console.error(`Błąd pobierania pliku ${file.name}:`, downloadError);
            return null;
          }
          return { name: file.name, blob: fileData };
        }),
    );

    return downloadedFiles.filter((file) => file !== null);
  }

  const images = await downloadImages(id).then((images) =>
    images!.map(
      (img) =>
        new File([img.blob as BlobPart], img.name, {
          type: "image/jpeg",
        }),
    ),
  );

  const mainImage = new File([mainImg as BlobPart], `${mainImgList[0].name}`, {
    type: "image/jpeg",
  });

  return {
    images,
    mainImage,
  };
}

export async function getImage(from: string, id: string | null) {
  if (!id) return;

  const { data, error } = await supabase.storage.from(from).list(id);

  if (error) {
    console.log(error?.message);
    throw new Error("Wystąpił błąd");
  }
  if (!data.length) return;

  const { data: img, error: imageDownloadError } = await supabase.storage
    .from(from)
    .download(`${id}/${data[0].name}`);

  if (imageDownloadError) {
    console.log(imageDownloadError?.message);
    throw new Error("Wystąpił błąd");
  }

  const image = new File([img as BlobPart], `${data[0].name}`, {
    type: "image/jpeg",
  });

  return image;
}
export async function getPostData(id: string | null) {
  if (!id) return null;

  const { data: post, error } = await supabase
    .from("posts")
    .select("id, link, type, image, content, title")
    .eq("id", +id)
    .single();

  if (error) {
    console.log(error);
    throw new Error("Wystąpił błąd");
  }
  return post;
}

export async function getEventData(id: string | null) {
  if (!id) return null;

  const { data: event, error } = await supabase
    .from("events")
    .select("id, image, content, title")
    .eq("id", +id)
    .single();

  if (error) {
    console.log(error);
    throw new Error("Wystąpił błąd");
  }

  return event;
}

export async function getFundraiserData(id: string | null) {
  if (!id) return null;

  const { data: fundraiser, error } = await supabase
    .from("fundraisers")
    .select("id, link, created_at")
    .eq("id", +id)
    .single();

  if (error) {
    console.log(error);
    throw new Error("Wystąpił błąd");
  }

  return fundraiser;
}

export async function getExpenseData(id: string | null) {
  if (!id) return null;

  const { data: fundraiser, error } = await supabase
    .from("expenses")
    .select("*")
    .eq("id", +id)
    .single();

  if (error) {
    console.log(error);
    throw new Error("Wystąpił błąd");
  }

  return fundraiser;
}

export async function getExpensesImages(id: string | null) {
  if (!id) return;

  async function downloadImages(id: string) {
    const { data, error } = await supabase.storage
      .from("expenses-images")
      .list(id);

    if (error) {
      console.error("Błąd pobierania listy plików:", error);
      return;
    }

    const downloadedFiles = await Promise.all(
      data
        .filter((file) => file.id)
        .map(async (file) => {
          const { data: fileData, error: downloadError } =
            await supabase.storage
              .from("expenses-images")
              .download(`${id}/${file.name}`);

          if (downloadError) {
            console.error(`Błąd pobierania pliku ${file.name}:`, downloadError);
            return null;
          }
          return { name: file.name, blob: fileData };
        }),
    );

    return downloadedFiles.filter((file) => file !== null);
  }

  const images = await downloadImages(id).then((images) =>
    images!.map(
      (img) =>
        new File([img.blob as BlobPart], img.name, {
          type: "image/jpeg",
        }),
    ),
  );
  return images;
}
