"use client";

import { useEffect } from "react";

function FacebookFeed() {
  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
    } else {
      const script = document.createElement("script");
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      script.src =
        "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2";
      script.onload = () => {
        if (window.FB) {
          window.FB.XFBML.parse();
        }
      };
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div
      className="fb-post"
      data-href="https://www.facebook.com/reksiobrodnica/posts/pfbid0Dk715DSDaQGZAFDNVn1xgm3fHWyzP78gh65t9ezgpdzXhtto9StkE5zgQBWNbXijl?locale=pl_PL"
    ></div>
  );
}

export default FacebookFeed;
