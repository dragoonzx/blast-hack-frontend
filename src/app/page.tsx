'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Typewriter } from 'react-simple-typewriter';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function Home() {
  return (
    <>
      <h1 className="font-sora text-7xl">
        Another level <br />
        <label className="text-[#f77334]">Another yield</label>
      </h1>
      <div className="px-4 py-2 border w-[320px] mt-4 block rounded-md border-gray-600 bg-gray-800/25 focus-visible:border-gray-300 focus-visible:outline-none focus-visible:ring-0 sm:text-sm">
        <div>
          WETH x{' '}
          <span>
            <Typewriter
              words={['SIB', 'XYZ', 'SHIB', 'SUK']}
              loop={false}
              cursor
              cursorStyle="_"
              typeSpeed={150}
              deleteSpeed={150}
              delaySpeed={1000}
            />
          </span>
        </div>
      </div>
      <div className="mt-16">
        <h2 className="font-sora text-6xl font-bold">
          Lock your ETH <br /> to mine BLAST ecosystem tokens
        </h2>
        <div className="flex items-center space-x-20 mt-6">
          <div className="space-y-2">
            <p className="font-roboto">Total Value Locked</p>
            <h3 className=" font-digital text-5xl ">$ 1 000</h3>
          </div>
          <div className="space-y-2">
            <p className="font-roboto">Tokens</p>
            <h3 className=" font-digital text-5xl">50</h3>
          </div>
          <div className="space-y-2">
            <p className="font-roboto">Users</p>
            <h3 className=" font-digital text-5xl">20</h3>
          </div>
        </div>
      </div>
      <div className="mt-16 max-w-[560px]">
        <h2 className="font-sora text-6xl">Benefits for</h2>
        <p className="text-xl mt-4">USERS:</p>
        <ol className="space-y-1 mt-2 list-disc">
          <li>
            <b>Mine</b> tokens with your yield{' '}
            <b>without risking your assets</b>
          </li>
          <li>
            <b>NO honeypots, NO hidden premines</b>, all stats are transparent
          </li>
          <li>
            Your yield is transformed into unremovable liqudity for the token.{' '}
            <b>NO rug pulls</b> in the long run.
          </li>
        </ol>
        <p className="text-xl mt-4">CREATORS:</p>
        <ol className="space-y-1 mt-2 list-disc">
          <li>
            Easy, <b>no-code creation of tokens</b>
          </li>
          <li>
            Configurable owner share + <b>earn gas fees</b> from token
          </li>
          <li>
            Your token getting additional <b>unremovable liqudity</b>
          </li>
        </ol>
      </div>
      <div className="mt-16">
        <h2 className="font-sora text-6xl">Favorite pairs</h2>
        <div className="flex items-center space-x-20 mt-6">
          <Link href="/tokens/xyz" scroll={false}>
            <div className="flex items-center border px-4 py-2 rounded-md border-gray-600 bg-gray-800/25 hover:bg-gray-600/25 focus-visible:border-gray-300 focus-visible:outline-none focus-visible:ring-0 sm:text-sm">
              WETH x SHIB
            </div>
          </Link>
          <Link href="/tokens/xyz">
            <div className="flex items-center border px-4 py-2 rounded-md border-gray-600 bg-gray-800/25 hover:bg-gray-600/25 focus-visible:border-gray-300 focus-visible:outline-none focus-visible:ring-0 sm:text-sm">
              WETH x SUK
            </div>
          </Link>
          <Link href="/tokens/xyz" scroll={false}>
            <div className="flex items-center border px-4 py-2 rounded-md border-gray-600 bg-gray-800/25 hover:bg-gray-600/25 focus-visible:border-gray-300 focus-visible:outline-none focus-visible:ring-0 sm:text-sm">
              WETH x HP
            </div>
          </Link>
        </div>
      </div>
      <div className="mt-16">
        <h2 className="font-sora text-6xl">FAQ </h2>
        <div className="w-[460px] mt-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                Can I withdraw my ETH at any time after depositing?
              </AccordionTrigger>
              <AccordionContent>
                Yes. You can claim your rewards and withdraw your ETH at any
                time. No time locks.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Does owner tokens have vest schedule?
              </AccordionTrigger>
              <AccordionContent>
                No, currently, owner tokens are unlocked immediately, but we
                will add vesting feature in the future.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is there any fees?</AccordionTrigger>
              <AccordionContent>
                Protocol taking 0.5% of tokens supply and 10% of owner supply as
                a fee. DEX swap have standard 0.3% fee that goes to liquidity
                providers.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>What happening with gas fees?</AccordionTrigger>
              <AccordionContent>
                Token fees are paid to the token creator. Vault fees is used to
                create more liquidity for the token. Helpers contracts fees
                (like factories and router) is claimable by frontent owner.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <footer>
        <div className=" fixed bottom-0 left-auto right-12">
          <p className="font-digital flex justify-center">
            {'>'} GIVE ME YOUR WETH
          </p>
          <Image src="/mine-footer.png" alt="" width={256} height={256} />
        </div>
      </footer>
    </>
  );
}
