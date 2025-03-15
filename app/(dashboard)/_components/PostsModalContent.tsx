"use client";

import { useState } from "react";
import { Button } from "./Button";
import ImageUpload from "./ImageUpload";
import { Input } from "./Input";
import { Label } from "./Label";
import { Textarea } from "./Textarea";

function NewsModalContent() {
  const [postType, setPostType] = useState<"facebook" | "custom">("facebook");
  const [image, setImage] = useState<File[]>([]);

//   const params = useSearchParams();
  //   const id = params.get("postId");

  //   useEffect(() => {
  //       async function fetchData() {
  //         const data = await getAnnouncementData(id);
  //         const images = await getImages(id);

  //         if (images) {
  //           setMainImage([images?.mainImage]);
  //           setAdditionalImages(images.images);
  //         }
  //         setAnnouncement(data);
  //         setIsLoading(false);
  //       }

  //       if (id) fetchData();
  //     }, [id, setIsLoading]);

  return (
    <div>
      <div className="flex w-fit gap-2 rounded-md bg-light-200 px-1 py-1">
        <Button
          variant={postType === "facebook" ? "default" : "outline"}
          className="transition-colors"
          onClick={() => {
            setPostType("facebook");
          }}
        >
          Facebook
        </Button>
        <Button
          variant={postType !== "facebook" ? "default" : "outline"}
          onClick={() => {
            setPostType("custom");
          }}
        >
          Zwykły post
        </Button>
      </div>
      <form className="grid grid-cols-1 gap-y-4 py-4 lg:grid-cols-2">
        {postType === "facebook" ? (
          <>
            <div className="mr-2">
              <Label>Link do posta</Label>
              <Input type="text" />
            </div>
            <div className="ml-2 flex flex-col justify-end gap-1">
              <Label htmlFor="gender">Typ posta</Label>
              <select
                id="gender"
                name="gender"
                className="h-[36px] rounded-md border-[1px] border-neutral-200 bg-white px-3"
              >
                <option value="photo">Zdjęcie</option>
                <option value="video">Film</option>
              </select>
            </div>
            <Button className="ml-auto mt-auto w-40 lg:col-start-1 lg:col-end-4">
              Zapisz
            </Button>
          </>
        ) : (
          <>
            <div className="mr-2 lg:col-start-1 lg:col-end-4">
              <Label>Tytuł</Label>
              <Input type="text" />
            </div>
            <div className="mr-2 lg:col-start-1 lg:col-end-4">
              <Label>Opis</Label>
              <Textarea />
            </div>
            <div className="lg:col-start-1 lg:col-end-4">

            <ImageUpload
              id="image"
              multiple={false}
              //   defaultUrls={announcement?.images}
              setImages={setImage}
              images={image}
              />
              </div>

            <Button className="ml-auto mt-auto w-40 lg:col-start-1 lg:col-end-4">Zapisz</Button>
          </>
        )}
      </form>
    </div>
  );
}

export default NewsModalContent;
