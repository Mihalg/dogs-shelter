/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";

function FacebookPost({ link }: { link: string }) {
  useEffect(() => {
    if ((window as any).FB) {
      (window as any).FB.XFBML.parse();
    } else {
      const script = document.createElement("script");
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      script.src =
        "https://connect.facebook.net/pl_PL/sdk.js#xfbml=1&version=v22.0";
      script.onload = async () => {
        if ((window as any).FB) {
          await (window as any).FB.XFBML.parse();
        }
      };
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div
      className="fb-post max-h-[350px] w-fit justify-self-center overflow-auto shadow-md"
      data-href={link}
      data-width="300"
      data-show-text="true"
    ></div>
  );
}

export default FacebookPost;
