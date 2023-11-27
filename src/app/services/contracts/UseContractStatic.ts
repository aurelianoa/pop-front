import { useEffect, useState } from "react";
import { Contract, ethers } from "ethers";

export function useContractStatic(address:string | undefined, abi:any): Contract | null {
    const [contract, setContract] = useState<Contract | null>(null);
    
    useEffect(() => {
        if (!address) return;
        (async () => {
            const provider = new ethers.JsonRpcProvider("https://rpc.testnet.lukso.network");
            const contract = new ethers.Contract(address, abi, provider);
            setContract(contract);
        })();
        
    },[address, abi])

    return contract;
}