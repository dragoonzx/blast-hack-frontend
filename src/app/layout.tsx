'use client';

import Image from 'next/image';
import Link from 'next/link';

import './globals.css';
import { Web3Provider } from '@/components/web3/Web3Provider';
import { ConnectKitButton } from 'connectkit';
import useScroll from '@/lib/hooks/useScroll';
import classNames from 'classnames';
import { Toaster } from '@/components/ui/toaster';

const NAV_MENU = [
  {
    title: 'Documentation',
    href: '/docs',
    separator: false,
    btn: false,
  },
  {
    title: 'Team',
    href: '/team',
    separator: false,
    btn: false,
  },
  {
    title: 'Github',
    href: '/github',
    separator: true,
    btn: false,
  },
  {
    title: 'Create',
    href: '/create',
    separator: false,
    btn: true,
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const scrolled = useScroll(50);

  return (
    <html lang="en">
      <title>Mineblast</title>
      <body className="font-roboto min-h-full flex-col bg-gray-900 text-gray-100 antialiased relative">
        <div className="pointer-events-none absolute inset-0 flex justify-center">
          <div className="hidden h-full w-full max-w-7xl grid-cols-3 gap-3.5 px-4 lg:grid">
            <div className="border-x border-white/[0.035]"></div>
            <div className="border-x border-white/[0.035]"></div>
            <div className="border-x border-white/[0.035]"></div>
          </div>
        </div>
        <Web3Provider>
          <header className="max-w-[1740px] px-24 py-4 mx-auto  bg-gray-950">
            <div className="flex items-center justify-between">
              <a href="/">
                <div className="flex flex-col items-center cursor-pointer">
                  <Image
                    src="/logo2.png"
                    alt="supablast"
                    width="80"
                    height="60"
                  />
                  <div 
                  className='rounded-full w-16 h-16 absolute -translate-y-[10px] 
                  hover:scale-[2.5] transition-transform ease-in-out hover:bg-[#f77334] duration-500 '>
                  </div>
                  MINEBLAST
                </div>
              </a>
              <nav
                aria-hidden="true"
                className={classNames(
                  'fixed transition-all font-sora',
                  scrolled
                    ? 'right-8 left-auto top-8 opacity-100 z-20'
                    : '-right-4 top-8 opacity-0 -z-10'
                )}
              >
                <div className="flex flex-col">
                  <ConnectKitButton.Custom>
                    {({
                      isConnected,
                      isConnecting,
                      show,
                      hide,
                      address,
                      ensName,
                      chain,
                    }) => {
                      return (
                        <button
                          onClick={show}
                          className="flex items-center border px-4 py-2 rounded-md border-gray-600 bg-gray-800/25 hover:bg-gray-600/25 focus-visible:border-gray-300 focus-visible:outline-none focus-visible:ring-0 sm:text-sm space-x-2"
                        >
                          {isConnected ? (
                            address ? (
                              `${address.slice(0, 6)}...${address.slice(-4)}`
                            ) : (
                              'Something wrong'
                            )
                          ) : (
                            <>
                              <span className="">Connect wallet_</span>
                            </>
                          )}
                        </button>
                      );
                    }}
                  </ConnectKitButton.Custom>
                </div>
              </nav>
              <nav
                className={classNames(
                  'flex items-center font-sora pt-6 transition-opacity h-[74px]',
                  scrolled ? ' opacity-0' : 'opacity-100'
                )}
              >
                <ul className="flex items-center">
                  {NAV_MENU.map((menu) => (
                    <li
                      key={menu.title}
                      className={classNames(
                        'px-4 py-2  text-md',
                        menu.separator ? 'border-r border-white/10' : '',
                        menu.btn ? '' : 'hover:text-[#f77334]'
                      )}
                    >
                      <Link
                        href={menu.href}
                        className={classNames(
                          menu.btn
                            ? 'flex items-center border px-4 py-2 rounded-md border-gray-600 bg-gray-800/25 hover:bg-gray-600/25 focus-visible:border-gray-300 focus-visible:outline-none focus-visible:ring-0 sm:text-sm'
                            : ''
                        )}
                      >
                        {menu.title}
                      </Link>
                    </li>
                  ))}
                </ul>

                <ConnectKitButton.Custom>
                  {({
                    isConnected,
                    isConnecting,
                    show,
                    hide,
                    address,
                    ensName,
                    chain,
                  }) => {
                    return (
                      <button
                        onClick={show}
                        // border-[#f77334]
                        className="flex items-center border px-4 py-2 rounded-md border-gray-600 bg-gray-800/25 hover:bg-gray-600/25 focus-visible:border-gray-300 focus-visible:outline-none focus-visible:ring-0 sm:text-sm space-x-2"
                      >
                        {isConnected ? (
                          address ? (
                            `${address.slice(0, 6)}...${address.slice(-4)}`
                          ) : (
                            'Something wrong'
                          )
                        ) : (
                          <>
                            <span className="">Connect wallet_</span>
                          </>
                        )}
                      </button>
                    );
                  }}
                </ConnectKitButton.Custom>
              </nav>
            </div>
          </header>
          <main className="min-h-screen items-center justify-between px-24 py-4">
            {children}
          </main>
          <Toaster />
        </Web3Provider>
      </body>
    </html>
  );
}
