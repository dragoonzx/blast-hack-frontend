'use client';

import React, { useEffect } from 'react';
import CountUp from 'react-countup';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { MineblastProjectData } from '@/lib/onchain';
import { formatNumberCompact } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { truncate18Decimals } from '@/lib/utils';
import classNames from 'classnames';

interface ErrorProps {
  className?: string;
}

const Vault404 = ({
  className,
}: ErrorProps) => {
  
  return (
    <Card className={classNames(
      'w-[450px]',
      className
    )}>
      <CardHeader>
        <CardTitle className="text-3xl">
          404: Project not found
        </CardTitle>
      </CardHeader>
      <CardFooter className='pb-0'>
      <div className='flex w-full'>
        Something went wrong. Try again later or contact support.
        <Image src="/mine-footer.png" alt="" width={198} height={198} />
        </div>
      </CardFooter>
    </Card>
  );
};

export default Vault404;
