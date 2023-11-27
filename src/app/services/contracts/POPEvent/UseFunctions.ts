import { useEffect, useState } from "react";
import { contractABI, contractAddress } from "./objects/contract";
import { useContractStatic } from "../UseContractStatic";

export function useGetBalanceOf(address: string | undefined ) : number {
    const contract = useContractStatic(contractAddress, contractABI);
    const [balance, setbalanceOf] = useState<number>(0);
    useEffect(() => {
        if (!contract || !address) return;
        contract.balanceOf(address).then((balance: number) => {
            console.log('balance', balance);
            setbalanceOf(balance);
        })
    },[contract, address])

    return balance;
}


