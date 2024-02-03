import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const TeamPage = () => {
  return (
    <div>
      <blockquote className="font-sora text-3xl">
        “There’s no meaning if you win alone!”{' '}
        <label className="text-sm">Tetsuya Kuroko</label>
      </blockquote>
      <div className="flex items-center space-x-12 mt-8">
        <Link
          href="https://t.me/Imranio"
          target="_blank"
          className="flex flex-col space-y-1"
        >
          <Image src="/imran.jpeg" alt="" width="128" height="128" />
          <p>Imran I.</p>
          <p className="text-xs">Smart contract engineer</p>
        </Link>
        <Link
          href="https://t.me/maxareumad"
          target="_blank"
          className="flex flex-col space-y-1"
        >
          <Image src="/max.jpeg" alt="" width="128" height="128" />
          <p>Max S.</p>
          <p className="text-xs">Frontend developer</p>
        </Link>
      </div>
    </div>
  );
};

export default TeamPage;
