'use client'
import { useState } from 'react'
import { useSession } from "next-auth/react"
import { useContract } from '@/app/services/contracts/UseContract';
import { contractAddress, contractABI } from "@/app/services/contracts/POPEvent/objects/contract";
import { ContractTransactionResponse, ContractTransactionReceipt } from "ethers";
import ErrorAlert from "@/app/components/Notifications/ErrorAlert";
import TransactionModal from "@/app/components/Notifications/TransactionModal";
import { useAccount } from "wagmi";
import dynamic from "next/dynamic";
import Link from 'next/link'

const ConnectWallet = dynamic(()=>import('@/app/components/UniversalProfile/ConnectUP'),{ssr:false});

export default function GetTicket(props: {event: string}) {
    //const contractAddress = props.event;
    const { data: session } = useSession();
    const [tx, setTx] = useState<ContractTransactionResponse | null>(null);
    const [txStatus, setTxStatus] = useState<boolean>(false);
    const [title, setTitle] = useState<string|null>("Transaction submitted");
    const [transactionStatus, setTransactionStatus] = useState<string|null>(null);
    const [showError, setShowError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>("");
    const popEventContract = useContract(contractAddress, contractABI);
    const { address, isConnected } = useAccount();
    const [openModal, setOpenModal] = useState<boolean>(false);

    async function rvsp() {
        try {
            
            setTxStatus(true);
            setTransactionStatus("pending");
            setTx(null);
            setTitle("Transaction submitted");
            let tx = null;
            if(popEventContract) {
                tx = await popEventContract.getTicket();
            }
            setTx(tx);
            setOpenModal(true);
            setTxStatus(false);
            
            const receipt: ContractTransactionReceipt = await tx.wait();
            if(receipt) {
                setTransactionStatus("success");
                setTitle("Transaction confirmed!");
            }

        } catch (error:any) {
            setTxStatus(false);
            console.log(error);
            if(typeof error.message !== undefined){
                console.log(error.message);
                setErrorMessage(`${error.message.slice(0,100)}...`);
            } else if(typeof error.error.message !== undefined){
                console.log(error.error.message);
                setErrorMessage(`${error.error.message.slice(0,100)}...`);
            } else {
                setErrorMessage("Unknown error ocurred");
            }
            
            setShowError(true);
            
            setTimeout(() => {
                setShowError(false);
                setErrorMessage(null);
            },5000);
        }
    } 
    return (
        <>
            <TransactionModal open={openModal} tx={tx} title={title} transactionStatus={transactionStatus} />
            <ErrorAlert showError={ showError } message={ errorMessage } ></ErrorAlert>
            <>
            {session ?
                <>
                    {!isConnected ? <ConnectWallet /> : 
                    <div className="mt-10">
                        <button
                        type='button'
                        className="rounded-md bg-indigo-600 px-10 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => isConnected ? rvsp(): null}
                        >
                        RSVP
                        </button>
                    </div>
                    }
                </>
                :
                <div className="mt-10">
                    <Link href="/auth/signin" className="rounded-md bg-indigo-600 px-10 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Sign in to RSVP
                    </Link>
                </div>
                }
            </>
        </>
    )
}