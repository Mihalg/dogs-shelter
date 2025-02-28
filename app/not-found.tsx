import Link from "next/link";

function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-6 bg-dark-200">
      <p className="text-3xl text-white">Nie znaleziono strony</p>
      <Link
        className="hover:bg-primary-200 rounded-md bg-primary-100 px-4 py-2 font-semibold text-white transition-colors"
        href="/"
      >
        Strona główna
      </Link>
    </div>
  );
}

export default NotFound;
