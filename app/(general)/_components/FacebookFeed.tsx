"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function FacebookFeed() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
    } else {
      const script = document.createElement("script");
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      script.src =
        "https://connect.facebook.net/pl_PL/sdk.js#xfbml=1&version=v22.0";
      script.onload = async () => {
        if (window.FB) {
          await window.FB.XFBML.parse();
        }
      };
      document.body.appendChild(script);
      setIsLoading(false);
    }
  }, []);

  return (
    <section className="mx-auto flex w-full max-w-[1200px] flex-col py-10">
      <h2 className="mb-8 text-3xl font-bold text-primary-100 lg:text-5xl">
        Co nowego?
      </h2>
      <div className="mx-auto flex flex-col justify-between gap-6 lg:w-full lg:flex-row">
        <div className="h-[350px] overflow-auto shadow-lg">
          {isLoading ? (
            <p className="loader">Loading</p>
          ) : (
            <div
              className="fb-post"
              data-href="https://www.facebook.com/permalink.php?story_fbid=pfbid02en4ZsLjEomaXs2jUWyvUt7TkuCXbMP96XAEQcEpMjDorgKNvL9MieP8xJAd2hchfl&id=100063527889981"
              data-width="300"
              data-show-text="true"
            ></div>
          )}
        </div>
        <div className="h-[350px] overflow-auto shadow-lg">
          {isLoading ? (
            <p className="loader">Loading</p>
          ) : (
            <div
              className="fb-video"
              data-href="https://www.facebook.com/100063527889981/videos/551662567344595"
              data-width="300"
              data-show-text="true"
            ></div>
          )}
        </div>
        <div className="h-[350px] overflow-auto shadow-lg">
          {isLoading ? (
            <p className="loader">Loading</p>
          ) : (
            <div
              className="fb-post"
              data-href="https://www.facebook.com/permalink.php?story_fbid=pfbid01SD3ZFizp9q6vTKqK2gwx732Vj2AcgWB68Q2KAtKC5TgQ7cQ9CR3S2fyEChpDjBGl&id=100063527889981"
              data-width="300"
              data-show-text="true"
            ></div>
          )}
        </div>
      </div>
      <Link
        href="/aktualnosci"
        className="mx-auto mt-8 w-fit rounded-full bg-primary-100 px-6 py-2 text-light-100"
      >
        Zobacz więcej
      </Link>
    </section>
  );
}

export default FacebookFeed;
