import { browserClient } from "@/app/_utils/supabase/client";
import FundraiserRow from "./FundraiserRow";

async function FundraisersList() {
  const supabase = browserClient();

  const { data: fundraisers } = await supabase
    .from("fundraisers")
    .select("id, link, created_at");

  return fundraisers?.length ? (
    fundraisers?.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    ).map((fundraiser) => (
      <FundraiserRow key={fundraiser.id} fundraiser={fundraiser} />
    ))
  ) : (
    <p className="mt-10 w-full text-center text-2xl">Brak Zbiórek</p>
  );
}

export default FundraisersList;
