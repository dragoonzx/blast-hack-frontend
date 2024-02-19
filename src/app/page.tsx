'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Typewriter } from 'react-simple-typewriter';
import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { formatNameForLink } from '@/lib/onchain';

const examples = ["Test token", "Some token", "Token 404"];

export default function Home() {

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className='flex justify-center'>
    <div className='max-w-[1360px]'>
      <div className="mt-4 ">
        <h2 className="font-sora text-6xl font-bold">
          Launch blast-native token in 1 minute
        </h2>
        <div className='text-xl mt-12 flex w-full justify-between'>
          <div className='border-gray-300  border-r-2 rounded-3xl mr-12 p-6  hover:border-r-4 transition-all'>
            <p className='text-[#f77334]'>Fair launch with the help of Yield Mining</p>
            <p className='mt-2 text-base'>Users will mine tokens with their ETH yield. Their reward would be proportional to their ETH share</p>
          </div>
          <div className=' border-gray-300 border-r-2 border-l-2 rounded-3xl mr-12 p-6 hover:border-r-4 hover:border-l-4 transition-all'>
            <p className='text-[#f77334]'>Additional liqudity</p>
            <p className='mt-2 text-base'>Yield from users will be converted to unremovable liqudity for your token</p>
          </div>
          <div className='border-gray-300 border-l-2 rounded-3xl p-6 hover:border-r-0 hover:border-l-4 transition-all'>
            <p className='text-[#f77334]'>Claimable gas refunds</p>
            <p className='mt-2 text-base'>On top of configurable creator token share, you will always be eligible to gas rewards from your token activity</p>
          </div>
        </div>
      </div>
      <div className='flex items-center mt-12 '>
        <div className={'bg-gray-300 h-32 transition-all duration-long ease-linear' + (loaded?' grow-[2]':'')}></div>
        <div className="font-sora text-7xl select-none">
          Another level <br />
          <label className="text-[#f77334]">Another yield</label>
        </div>
      </div>
      <div className="mt-16">
        <h2 className="font-sora text-6xl">Example projects</h2>
        <div className="flex items-center space-x-20 mt-6">
          {examples.map((example) => 
            <Link href={"/tokens/" + formatNameForLink(example)} scroll={false}>
              <div className="flex items-center border px-4 py-2 rounded-md border-gray-600 bg-gray-800/25 hover:bg-gray-600/25 focus-visible:border-gray-300 focus-visible:outline-none focus-visible:ring-0 sm:text-sm">
                {example}
              </div>
            </Link>
          )}
          <Link href={"/create"} scroll={false}>
            <div className="border px-4 py-2 w-48 items-center rounded-md border-gray-600 bg-[#f77334] hover:bg-orange-600 focus-visible:border-gray-300 focus-visible:outline-none focus-visible:ring-0 sm:text-sm">Create your own {">"}</div>
          </Link>
        </div>
      </div>
      <div className="mt-16">
        <h2 className="font-sora text-6xl">FAQ </h2>
        <div className="w-[460px] mt-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                What happening with locked ETH?
              </AccordionTrigger>
              <AccordionContent>
                Deposited ETH will lose its yield, but can be withdrawed back at any time
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Does creator tokens have vest schedule?
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
                (like factories and router) is claimable by frontend owner.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <footer>
        <div className=" absolute bottom-0 left-auto right-12">
          <p className="font-digital flex justify-center">
            {'>'} HELLO
          </p>
          <Image src="/mine-footer.png" alt="" width={256} height={256} />
        </div>
      </footer>
    </div>
    </div>
  );
}
