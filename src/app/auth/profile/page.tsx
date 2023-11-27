'use client'
import { useSession } from "next-auth/react";
import { shortenAddress } from "@/app/utils/shorten";
import TicketsOfOwner from "@/app/components/EventInteraction/TicketsOfOwner";
import BadgesOfOwner from "@/app/components/BadgeInteraction/BadgesOfOwner";



export default function MyProfile() {
  const { data: session } = useSession()

  return (
    <>
      <div className="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm space-y-10">
          <div>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              User
            </h2>
          </div>
          <div className="space-y-6">
            <div className="relative -space-y-px rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-0 z-10 rounded-md ring-1 ring-inset ring-gray-300" />
              UP address: {shortenAddress(session?.user?.name)}
            </div>
            <div className="flex min-h-full flex-1 items-left justify-center">
              <BadgesOfOwner ownerAddress={session?.user?.name ?? ''}/>
             </div>
             
            <div>
            </div>
          </div>
          
        </div>
      </div>
      <div className="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <TicketsOfOwner ownerAddress={session?.user?.name ?? ''}/>
      </div>
      
      
    </>
  )
}