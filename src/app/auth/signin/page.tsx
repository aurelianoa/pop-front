'use client'
import { SiweMessage } from "siwe";
import { useAccount, useNetwork, useSignMessage } from "wagmi";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import dynamic from "next/dynamic";
import { signMessage, verifyMessage } from "@/app/utils/signMessage";
const ConnectWallet = dynamic(()=>import('@/app/components/UniversalProfile/ConnectUP'),{ssr:false});
const FormattedWallet = dynamic(()=>import('@/app/components/UniversalProfile/FormattedWallet'),{ssr:false});

export default function SignIn() {
  const { chain } = useNetwork()
  const { address, isConnected } = useAccount()
  const [txPendingStatus, setTxPendingStatus] = useState<boolean>(false); 
  const router = useRouter();

  async function handleSignIn () {
    try {
        setTxPendingStatus(true);
        const { signature, hashedMessage } = await signMessage(address ?? '');
        
        await signIn("credentials", {
          signature: signature,
          message: hashedMessage,
          address: address ?? '',
          callbackUrl: "/",
          error: "auth/signin"
        });
        
        
        setTxPendingStatus(false);
    } catch (error) {
      window.alert(error)
    }
    
  }

  return (
    <>
      <div className="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm space-y-10">
          <div>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign In with your Universal Profile
            </h2>
          </div>
          {isConnected && address ?
          <div className="space-y-6">
            <div className="relative -space-y-px rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-0 z-10 rounded-md ring-1 ring-inset ring-gray-300" />
                  <FormattedWallet />
            </div>

            <div>
              <button
                type="button"
                onClick={handleSignIn}
                disabled={txPendingStatus}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </div>
          : 
          <div className="space-y-6">
            <div className="text-center mx-auto">
              <ConnectWallet />
            </div>
          </div>
          }
        </div>
      </div>
    </>
  )
}
