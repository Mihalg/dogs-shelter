import FacebookFeed from "./_components/FacebookFeed";

export default function Home() {
  return (
    <div className="container mx-auto p-4 w-full">
      <h1 className="mb-4 text-3xl font-bold">Aktualności</h1>
      <FacebookFeed />
    </div>
  );
}
