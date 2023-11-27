'use client'
import TicketQR from '@/app/components/EventInteraction/TicketQR';

export default function Page({ params } : { params: {addressOwner: string}}) {
    return (
        <>
            <TicketQR addressOwner={params.addressOwner}/>
        </>
    )
}