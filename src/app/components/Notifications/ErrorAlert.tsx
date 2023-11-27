import { XCircleIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/20/solid";
import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

function ErrorAlert(props: any) {
    const [showError, setShowError] = useState(false);
    const message = props?.message;

    useEffect(() => {
        setShowError(props?.showError)
    }, [props])

    return (
      <>
      <Transition.Root show={showError} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setShowError}>
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
                <div className="pointer-events-none fixed inset-x-0 bottom-0 sm:flex sm:justify-center sm:px-6 sm:pb-5 lg:px-8">
                  <div className="pointer-events-auto flex items-center rounded-lg justify-between gap-x-6 bg-red-500 px-6 py-2.5 sm:py-3 sm:pl-4 sm:pr-3.5">
                    <p className="flex text-sm text-white">
                      <XCircleIcon className="h-5 w-5 text-gray-100 mr-1" aria-hidden="true" />{''}<strong className="font-semibold mr-1">Error -{'>'}</strong>{''}{message}
                    </p>
                    <button type="button" onClick={() => setShowError(false)} className="-m-1.5 flex-none p-1.5">
                      <span className="sr-only">Dismiss</span>
                      <XMarkIcon className="h-5 w-5 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      </>
    )
}
export default ErrorAlert;