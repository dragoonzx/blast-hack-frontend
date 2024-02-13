'use client';

import React, { use, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';


const CreateSuccess = () => {

  return (
    <Card>
        <CardHeader>
            <h3 className="font-semibold leading-none tracking-tight">Success!</h3>
        </CardHeader>
        <CardContent>
            Link: [LINK]
        </CardContent>
    </Card>
  );
};

export default CreateSuccess;
