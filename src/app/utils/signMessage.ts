declare var window: any
import UniversalProfileContract from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import { SiweMessage } from 'siwe';
import { signMessage as wagmiSignMessage } from 'wagmi/actions';
import { luksoTestnet } from './luksoConfig';
import { ethers } from 'ethers';
import { hashMessage } from 'ethers';

export async function signMessage(address: string) : Promise<{signature: string, hashedMessage: string}> {
    const message = new SiweMessage({
        domain: window.location.host, // Domain requesting the signing
        address: address,           // Address performing the signing
        statement: 'By logging in you agree to the terms and conditions.', // a human-readable assertion user signs
        uri: window.location.origin,  // URI from the resource that is the subject of the signing
        version: '1',                 // Current version of the SIWE Message
        chainId: luksoTestnet.id,              // Chain ID to which the session is bound, 4201 is LUKSO Testnet
        resources: [
            `did:account:${address}`,
            `did:web:${window.location.host}`,  
        ], 
    });
    const hashedMessage = message.prepareMessage();
    const signature = await wagmiSignMessage({message: hashedMessage});
    return  { signature, hashedMessage: hashMessage(hashedMessage.toString()) };
}

export async function verifyMessage(options: {message: string, signature: string, address: string}) : Promise<boolean> {
    const provider = ethers.getDefaultProvider(luksoTestnet.rpcUrls.public.http[0]);
    
    const myUniversalProfileContract = new ethers.Contract(options.address, UniversalProfileContract.abi, provider);
    
    const isValidSignature = await myUniversalProfileContract.isValidSignature(options.message, options.signature);

    return isValidSignature === '0x1626ba7e';
}