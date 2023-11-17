import Link from "next/link"
const navigation = [
  { name: 'Sign In', href: '/auth/signin', current: false },
  { name: 'Sign Up', href: '/auth/signup', current: false },
]

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

export default function Home() {

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm space-y-10">
          <div>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign up using your Ethereum wallet
            </h2>
          </div>
          <nav className="flex flex-1 flex-col" aria-label="Sidebar">
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-50 text-indigo-600' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                      'group flex gap-x-3 rounded-md p-2 pl-3 text-sm leading-6 font-semibold'
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      
    </main>
  )
}
