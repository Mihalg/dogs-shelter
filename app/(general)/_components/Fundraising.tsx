import { browserClient } from "@/app/_utils/supabase/client";

async function Fundraisers() {
  const supabase = browserClient();
  const { data: fundraisers } = await supabase
    .from("fundraisers")
    .select("link");

  return fundraisers?.map((item, i) => (
    <a href={item.link} key={i}>
      {item.link}
    </a>
  ));
}

export default Fundraisers;
