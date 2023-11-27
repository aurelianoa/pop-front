import Link from "next/link"
import HighlightEvent from "@/app/components/HighlightEvent";
import MoreEvents from "@/app/components/MoreEvents";

export default function Home() {

  return (
    <main className="">
      <HighlightEvent/>
      <div className="mt-10 max-w-7xl mx-auto mb-20">
        <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-xl mb-10">
          Upcoming Events
        </h1>
        <MoreEvents/>
      </div>
    </main>
  )
}
