"use client";

import { useEffect } from "react";

function FacebookPost({ link, type }: { link: string; type: string }) {
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
    }
  }, []);

  return (
    <div
      className={`${type === "photo" ? "fb-post" : "video"} max-h-[350px] w-fit overflow-auto shadow-md justify-self-center`}
      data-href={link}
      data-width="300"
      data-show-text="true"
    ></div>
  );
}

export default FacebookPost;
