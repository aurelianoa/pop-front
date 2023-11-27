/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";
import { ContractTransactionResponse } from "ethers";

export default function TransactionModal(props: any) {
  const [open, setOpen] = useState(false);
  const [tx, setTx] = useState<ContractTransactionResponse | null>(null);
  const [title, setTitle] = useState<string|null>(null);
  const [transactionStatus, setTransactionStatus] = useState<string|null>(null);

    useEffect(() => {
        setOpen(props?.open)
        setTx(props?.tx)
        setTitle(props?.title)
        setTransactionStatus(props?.transactionStatus)
    }, [props])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="transition-opacity" />
        </Transition.Child>

        <div className="">
          <div className="flex items-end">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0 "
            >
              <Dialog.Panel className="relative">
                <div className="pointer-events-none fixed inset-x-0 bottom-0 px-6 pb-6">
                  <div className="pointer-events-auto mx-auto max-w-xl rounded-lg  bg-white  shadow-lg ring-1 ring-gray-900/10">
                    <div className="col-span-1 flex px-6">
                      <div className="flex overflow-hidden items-center justify-center text-sm font-medium text-white">
                        {transactionStatus == "pending" ? 
                        <ClockIcon className="inline-flex h-12 w-14 items-center justify-center  text-gray-600 animate-pulse" aria-hidden="true" />
                        :
                        <CheckCircleIcon className="inline-flex h-12 w-14 items-center justify-center  text-gray-600" aria-hidden="true" />
                        }
                      </div>
                      <div className="px-6 py-2">
                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-600">
                          {title}
                        </Dialog.Title>
                        <p className="text-sm leading-6 text-gray-900">
                        {transactionStatus == "pending" ?
                          <>
                            Your{' '}
                            <a href={`${process.env.NEXT_PUBLIC_ETHERSCAN_URL}${tx?.hash}`} target="_blank" rel="noreferrer" className="font-semibold text-gray-600">
                              transaction
                            </a>
                            {' '}
                            is submited to the blockchain and it will be confirmed shortly.
                          </>
                          :
                          <>
                            Your{' '}
                            <a href={`${process.env.NEXT_PUBLIC_ETHERSCAN_URL}${tx?.hash}`} target="_blank" rel="noreferrer" className="font-semibold text-gray-600">
                              transaction
                            </a>
                            {' '}
                            is confirmed.
                          </>
                        }
                        </p>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
