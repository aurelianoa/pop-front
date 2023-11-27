'use client'
import { useTokenIdsOf } from "@/app/services/contracts/POPBadge/UseFunctions";
import Image from "next/image";

  
  export default function BadgesOfOwner(props: {ownerAddress: string}) {
    const badges = useTokenIdsOf(props.ownerAddress);
    const badgesInfo = [
        {
          name: 'CLONEX MIDWEST',
          role: 'POP BADGE',
        },
      ]

    return (
        <div>
        <h2 className="text-sm font-medium text-gray-500">Badges</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-2">
        {badges?.length > 0 ?
        <>
        {badgesInfo.map((badge, key) => (
          <div
            key={key}
            className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
          >
            <div className="flex-shrink-0">
              <Image className="h-10 w-10 rounded-full" src="/BadgePOP.png" width={50} height={50} alt="" />
            </div>
            <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900">{badge.name}</p>
                <p className="truncate text-sm text-gray-500">{badge.role}</p>
            </div>
          </div>
        ))}
        </>
        :
        <></>
        }
      </div>
      </div>
    )
  }
  