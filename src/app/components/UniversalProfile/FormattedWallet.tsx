'use client'
import { shortenAddress } from "@/app/utils/shorten";
import { useAccount } from "wagmi";

export default function FormattedWallet() {
    const { address, isConnected } = useAccount();
    return (
        <div>
            {isConnected && address ? 
            <div className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-center">
                UP address: {shortenAddress(address)}
            </div>
            : <div>Not Connected</div> }
        </div>
    );
}