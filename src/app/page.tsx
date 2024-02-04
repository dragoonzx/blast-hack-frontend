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
        Your ultimate defi <br />
        <label className="text-[#e96828]">in one step</label>
      </h1>
      <div className="px-4 py-2 border w-[320px] mt-4">
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
          One Blast <br /> to rule them all
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
        <ol className="space-y-1 mt-2">
          <li>1) MINE tokens with your yield without additional risks</li>
          <li>
            2) NO honeypots, NO hidden premines, all stats are transparent
          </li>
          <li>
            3) Your yield is transformed into unremovable liqudity for the
            token. NO rug pulls in the long run.
          </li>
        </ol>
        <p className="text-xl mt-4">CREATORS:</p>
        <ol className="space-y-1 mt-2">
          <li>1) Easy, no-code creation of tokens</li>
          <li>2) Configurable owner share + earn gas fees from token</li>
          <li>3) Your token getting additional unremovable liqudity</li>
        </ol>
      </div>
      <div className="mt-16">
        <h2 className="font-sora text-6xl">Favorite pairs</h2>
        <div className="flex items-center space-x-20 mt-6">
          <Link href="/tokens/xyz" scroll={false}>
            <div className="border p-4">WETH x SHIB</div>
          </Link>
          <Link href="/tokens/xyz">
            <div className="border p-4">WETH x SUK</div>
          </Link>
          <Link href="/tokens/xyz" scroll={false}>
            <div className="border p-4">WETH x HP</div>
          </Link>
        </div>
      </div>
      <div className="mt-16">
        <h2 className="font-sora text-6xl">
          FAQ{' '}
          <label className="text-xl">for those who still dont know shit</label>
        </h2>
        <div className="w-[460px] mt-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>
                Yes. It comes with default styles that matches the other
                components&apos; aesthetic.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it animated?</AccordionTrigger>
              <AccordionContent>
                Yes. It`s animated by default, but you can disable it if you
                prefer.
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
