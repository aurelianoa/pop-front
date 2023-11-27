import CheckIn from '@/app/components/EventInteraction/CheckIn';

export default function Event({ params } : { params: { contractAddress: string } }) {

    return (
        <>
        <div className="bg-white">
        <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-14">
            <div
            className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
            aria-hidden="true"
            />
            <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
                <div className="mx-auto max-w-md">
                    <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-10">
                    CHECK IN
                    </h1>
                    <h1 className="max-w-2xl text-xl font-bold tracking-tight text-gray-900 sm:text-xl">
                    CLONEX MID WEST
                    </h1>
                    <p>
                    <small className="text-gray-500">May 22 2024</small>
                    </p>
                    <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
                        <h2 className="max-w-2xl text-md font-bold tracking-tight text-gray-900 sm:text-xl">
                        Calhoun Beach Club
                        </h2>
                    <CheckIn event={params.contractAddress}></CheckIn>
                    </div>
                </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
        </div>
        </div>
        </>
    )
}