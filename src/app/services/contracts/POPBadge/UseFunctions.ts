import { useEffect, useState } from "react";
import { contractABI, contractAddress } from "./objects/contract";
import { useContractStatic } from "../UseContractStatic";

export function useTokenIdsOf(address: string | undefined ) : string[] {
    const contract = useContractStatic(contractAddress, contractABI);
    const [tokensIdsOf, setTokensIdOf] = useState<string[]>([]);
    useEffect(() => {
        if (!contract || !address) return;
        contract.tokenIdsOf(address).then((tokens: string[]) => {
            console.log('tokens', tokens);
            setTokensIdOf(tokens);
        })
    },[contract, address])

    return tokensIdsOf;
}


