'use client'
import QRCode from 'qrcode.react';


export default function TicketQR(props: {addressOwner: string}) {
    const uriQR = props.addressOwner
  return (
    <div>
    <div className="mx-auto max-w-2xl mt-10">
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto">
        CLONEX MID WEST
        </h1>
        <p>
        <small className="text-gray-500">May 22 2024</small>
        </p>
        <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
            <h2 className="max-w-2xl text-md font-bold tracking-tight text-gray-900 sm:text-xl lg:col-span-2 xl:col-auto">
            Calhoun Beach Club
            </h2>
        <p className="text-lg leading-8 text-gray-600 mb-5">
            2925 Dean Pkwy, Minneapolis, MN 55416
        </p>
        </div>
        <div className='max-w-xs mx-auto mt-10'>
            <div className='flex justify-center text-center p-10'>
                <QRCode value={uriQR} className='w-200 h-auto' />
            </div>
            
        </div>
        
    </div>
    </div>
  )
}