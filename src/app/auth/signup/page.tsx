'use client'
import { type ChangeEvent, useState } from "react"
import { useAccount, useNetwork, useSignMessage } from "wagmi"
import { SiweMessage } from "siwe"
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
const ConnectWallet = dynamic(()=>import('@/app/components/UniversalProfile/ConnectUP'),{ssr:false});
const FormattedWallet = dynamic(()=>import('@/app/components/UniversalProfile/FormattedWallet'),{ssr:false});

export default function SignUp() {
    const { signMessageAsync } = useSignMessage();
    const { address, isConnected } = useAccount();
    const { chain } = useNetwork();
    const [email, setEmail] = useState<string>("");
    const nonceUrl = `${process.env.NEXT_PUBLIC_SIWE_API_URL}/api/auth/nonce`;
    const [txPendingStatus, setTxPendingStatus] = useState<boolean>(false); 
    const router = useRouter();

    const handleSelectedEmail = (event: ChangeEvent) => {
        const target = event.target as HTMLInputElement;
        if (target) setEmail(target?.value);
    }

    async function handleSignUp () {
        setTxPendingStatus(true);
        const nonce = await fetch(`${nonceUrl}`);
        const formattedMessage = {
            domain: window.location.host,
            address: address,
            statement: "Sign in with Ethereum to the app.",
            uri: window.location.origin,
            version: "1",
            chainId: chain?.id,
            nonce: await nonce.text(),
        }
        const message = new SiweMessage(formattedMessage);
        const textMessage = message.prepareMessage();
        const signature = await signMessageAsync({
            message: textMessage,
        })

        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: textMessage,
                signature: signature,
                user: {
                    email: email,
                }
            }),
        });
        const data = await res.json();
        setTxPendingStatus(false);
        if(data) {
            console.log(data);
            router.push(`/auth/signin`);
        } else {
            window.alert("Something went wrong. Please try again.");
        }
    }
    return (
      <>
        <div className="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-sm space-y-10">
            <div>
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign up using your Universal Profile
              </h2>
            </div>
            {isConnected && address ?
            <div className="space-y-6">
              <div className="relative -space-y-px rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-0 z-10 rounded-md ring-1 ring-inset ring-gray-300" />
                    <FormattedWallet />
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    email
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    onChange={handleSelectedEmail}
                    value={email}
                    autoComplete="email"
                    required
                    className="relative block w-full rounded-b-md border-0 py-1.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Email Address"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="button"
                  onClick={handleSignUp}
                  disabled={txPendingStatus || !email}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign up
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
  