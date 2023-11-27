'use client'
import { useGetBalanceOf } from "@/app/services/contracts/POPEvent/UseFunctions";
import { contractAddress } from '@/app/services/contracts/POPEvent/objects/contract';



function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

export default function TicketsOfOwner(props: {ownerAddress: string}) {
    const balance = useGetBalanceOf(props.ownerAddress);
    const projects = [
        { name: 'CLONEX MIDWEST', 
        initials: 'CMD', 
        href: 
        `${window.location.origin}/ticket/${contractAddress}-${props.ownerAddress}`, 
        balance: balance, 
        bgColor: 'bg-pink-600' 
    },
    ]
  return (
    <div>
      <h2 className="text-sm font-medium text-gray-500">Acitve Tickets</h2>
      {balance > 0 ?
      <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {projects.map((project) => (
          <li key={project.name} className="col-span-1 flex rounded-md shadow-sm">
            <div
              className={classNames(
                project.bgColor,
                'flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white'
              )}
            >
              {project.initials}
            </div>
            <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
              <div className="flex-1 truncate px-4 py-2 text-sm">
                <a href={project.href} className="font-medium text-gray-900 hover:text-gray-600">
                  {project.name}
                </a>
                <p className="text-gray-500">{project.balance}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
        :
        <></>
    }
    </div>
  )
}
