'use client'
import { useState } from 'react'
import { useConnect } from 'wagmi';
import { luksoConector } from '@/app/utils/luksoConnector';

export default function ConnectUP() {
    const [loading, setLoading] = useState(false);
    const { connect } = useConnect({
        connector: luksoConector()
    })

    async function onOpen() {
        setLoading(true);
        connect();
        setLoading(false);
      }
    
      function connectUP() {
        onOpen();
      }

      
    return (
        <div className="text-center">
        <div className="mt-6">
            <button
            type="button"
            disabled={loading}
            onClick={connectUP}
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
            Connect your UP to continue
            </button>
        </div>
        </div>
    )
}
