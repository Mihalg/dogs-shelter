"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/app/_components/Button";
import ImageUpload from "@/app/(dashboard)/_components/ImageUpload";
import { Input } from "@/app/_components/Input";
import { Label } from "@/app/(dashboard)/_components/Label";
import { Textarea } from "@/app/(dashboard)/_components/Textarea";
import { useModalContext } from "@/app/(dashboard)/_components/Modal";
import Spinner from "@/app/_components/Spinner";
import { useSearchParams } from "next/navigation";
import { getPostData, getImage } from "@/app/_lib/services";
import { createEditPost } from "@/app/_lib/actions";

type FacebookPost = {
  id: number;
  link: string;
  type: string;
};

type CustomPost = {
  id: number;
  title: string;
  content: string;
  image: string;
  type: string;
};

type Post = CustomPost | FacebookPost;

function NewsModalContent() {
  //get search params to fetch default data for editing
  // if id===null user is adding new announcement
  const params = useSearchParams();
  const id = params.get("postId");

  const { isLoading, setIsLoading, setIsOpen } = useModalContext();
  const [isPending, setIsPending] = useState(false);

  // variables for handling images
  const formRef = useRef<HTMLFormElement>(null);
  const [image, setImage] = useState<File[]>([]);

  const [postType, setPostType] = useState<string>("facebook");
  const [post, setPost] = useState<Post | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    //adding images to formData
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);

    if (image) {
      formData.append("image", image[0]);
      formData.append("type", postType);
      formData.append("id", post?.id ? `${post?.id}` : "");
    }

    setIsPending(true);
    await createEditPost(formData);
    setIsPending(false);
    setIsOpen(false);
  };

  //fetches post if editing
  useEffect(() => {
    async function fetchData() {
      const data = await getPostData(id);
      const image = await getImage("posts-images", id);

      if (image) {
        setImage([image]);
      }
      setPost(data);
      setPostType(data ? data.type : "facebook");
      setIsLoading(false);
    }

    if (id) fetchData();
  }, [id, setIsLoading]);

  return isLoading ? (
    <div className="flex min-h-full items-center justify-center">
      <Spinner />
    </div>
  ) : (
    <>
      {isPending ? (
        <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-dark-100/40">
          <Spinner />
        </div>
      ) : null}
      <div className="flex w-fit gap-2 rounded-md bg-light-200 px-1 py-1">
        <Button
          variant={postType === "facebook" ? "default" : "outline"}
          className={post && postType !== "facebook" ? "hidden" : ""}
          onClick={() => {
            setPostType("facebook");
          }}
        >
          Facebook
        </Button>
        <Button
          className={post && postType !== "custom" ? "hidden" : ""}
          variant={postType === "custom" ? "default" : "outline"}
          onClick={() => {
            setPostType("custom");
          }}
        >
          Zwykły post
        </Button>
      </div>
      <form
        ref={formRef}
        className="grid grid-cols-1 gap-y-4 py-4"
        onSubmit={handleSubmit}
      >
        {postType === "facebook" ? (
          <>
            <div className="mr-2">
              <Label>Link do posta</Label>
              <Input
                id="link"
                name="link"
                type="text"
                defaultValue={post && "link" in post ? post?.link : ""}
              />
            </div>

            <Button className="ml-auto mt-auto w-40 lg:col-start-1 lg:col-end-4">
              Zapisz
            </Button>
          </>
        ) : (
          <>
            <div className="mr-2 lg:col-start-1 lg:col-end-4">
              <Label htmlFor="title">Tytuł</Label>
              <Input
                id="title"
                name="title"
                type="text"
                defaultValue={post && "title" in post ? post?.title : ""}
              />
            </div>
            <div className="mr-2 lg:col-start-1 lg:col-end-4">
              <Label htmlFor="content">Treść</Label>
              <Textarea
                id="content"
                name="content"
                defaultValue={post && "content" in post ? post?.content : ""}
              />
            </div>
            <div className="lg:col-start-1 lg:col-end-4">
              <ImageUpload
                id="image"
                multiple={false}
                defaultUrls={post && "image" in post ? [post.image] : undefined}
                setImages={setImage}
                images={image}
              />
            </div>

            <Button className="ml-auto mt-auto w-40 lg:col-start-1 lg:col-end-4">
              Zapisz
            </Button>
          </>
        )}
      </form>
    </>
  );
}

export default NewsModalContent;
