declare var window: any
import { useEffect, useState } from "react";
import { Contract, ethers } from "ethers";

export function useContractEOA(address:string | undefined, abi:any): Contract | null {
    const [contract, setContract] = useState<Contract | null>(null);
    
    useEffect(() => {
        if (!address) return;
        (async () => {
            const provider = new ethers.BrowserProvider(window.ethereum, "any");
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(address, abi, signer);
            setContract(contract);
        })();
        
    },[address, abi])

    return contract;
}