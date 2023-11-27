import GetTicket from '@/app/components/EventInteraction/GetTicket';

export default function Event({ params } : { params: { contractAddress: string } }) {

    return (
        <>
        <div className="bg-white">
        <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-14">
            <div
            className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
            aria-hidden="true"
            />
            <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
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
                <p>
                Calhoun Beach Club is a full-service fitness center with a dynamic group exercise program, personal training, Pilates, yoga, tennis, racquetball and squash. Enjoy indoor and outdoor pools, an indoor running track, steam rooms, hot tubs and more.
                </p>
                <GetTicket event={params.contractAddress}></GetTicket>
                
                </div>
                <img
                src="https://images.unsplash.com/photo-1567532900872-f4e906cbf06a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80"
                alt=""
                className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
                />
            </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
        </div>
        </div>
        </>
    )
}
