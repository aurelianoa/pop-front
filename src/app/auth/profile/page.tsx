'use client'
import { useAccount } from "wagmi";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const FormattedWallet = dynamic(()=>import('@/app/components/UniversalProfile/FormattedWallet'),{ssr:false});
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react"


export default function MyProfile() {
  const { address, isConnected } = useAccount()
  const { data: session } = useSession()

  const router = useRouter(); 
  
  
  useEffect(() => {
    console.log("isConnected", isConnected);
    console.log("address", address);
    console.log("session", session);
    if(isConnected && address) {
      console.log("is connected");
    } else {
        //router.push('/auth/signin');
    }
  },[isConnected, address, session]);

  return (
    <>
      <div className="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm space-y-10">
          <div>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              User
            </h2>
          </div>
          {isConnected && address ?
          <div className="space-y-6">
            <div className="relative -space-y-px rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-0 z-10 rounded-md ring-1 ring-inset ring-gray-300" />
                  <FormattedWallet />
            </div>
            <div className="text-black mx-auto text-center text-lg">
                address: {address}
            </div>
            <div>
            </div>
          </div>
          : 
          <></>
          }
        </div>
      </div>
    </>
  )
}