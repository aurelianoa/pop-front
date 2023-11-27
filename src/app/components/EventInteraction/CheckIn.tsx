'use client'
import { useState } from 'react'
import { useContractEOA } from '@/app/services/contracts/UseContractEOA';
import { contractAddress, contractABI } from "@/app/services/contracts/POPEvent/objects/contract";
import { contractAddress as contractBadge } from "@/app/services/contracts/POPBadge/objects/contract";
import { ContractTransactionResponse, ContractTransactionReceipt } from "ethers";
import ErrorAlert from "@/app/components/Notifications/ErrorAlert";
import TransactionModal from "@/app/components/Notifications/TransactionModal";;
import dynamic from "next/dynamic";
import {QrScanner} from '@yudiel/react-qr-scanner';

const ConnectWallet = dynamic(()=>import('@/app/components/UniversalProfile/ConnectUP'),{ssr:false});

export default function CheckIn(props: {event: string}) {
    const [tx, setTx] = useState<ContractTransactionResponse | null>(null);
    const [txStatus, setTxStatus] = useState<boolean>(false);
    const [title, setTitle] = useState<string|null>("Transaction submitted");
    const [transactionStatus, setTransactionStatus] = useState<string|null>(null);
    const [showError, setShowError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>("");
    const popEventContract = useContractEOA(contractAddress, contractABI);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [showCheckIn, setShowCheckIn] = useState<boolean>(false);
    const [data, setData] = useState<string>("");

    function verifyQRCode(data:string) {
        const params = data.split('-');
        const contractFromParams = params[0];
        //const ticketIdNumber = Number(params[1]);
        if(contractFromParams !== contractAddress) { 
            setErrorMessage("Unrecognized QR code");
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
                setErrorMessage(null);
            },5000);
            setShowCheckIn(false);
        } else {
            setData(data);
            setShowCheckIn(true);
        }
    }

    async function checkIn() {
        console.log('data from qr code: ', data);
        
        try {
            const params = data.split('-');
            const contractFromParams = params[0];
            const ownerAddress = params[1];
            if(contractFromParams !== contractAddress) {
                throw new Error("Invalid contract address");
            }
            
            setTxStatus(true);
            setTransactionStatus("pending");
            setTx(null);
            setTitle("Transaction submitted");
            let tx = null;
            if(popEventContract) {
                tx = await popEventContract.checkIn(ownerAddress, contractBadge);
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
            <QrScanner
                onDecode={(result) =>{ console.log(result); verifyQRCode(result);}}
                onError={(error) => { 
                    console.log(error?.message); 
                    setErrorMessage("Unknown error ocurred");
                    setShowError(true);}
                }
            />
            {showCheckIn ? 
            <div className='w-full mx-auto text-center mt-10'>
                <button
                type='button'
                className="rounded-md bg-indigo-600 px-12 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => checkIn() }
                >
                CHECK IN
                </button>
            </div>
            
            : null
            }
            </>
        </>
    )
}