import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getInTouchConfig } from '@/config/marketing/get-in-touch';
import MainSectionBody from '@/components/common/main-section-body';

const ContactInfo: React.FC = () => {
  const { visitUs, mailUs } = getInTouchConfig;

  return (
    <MainSectionBody className="mx-auto grid grid-cols-1 gap-8 md:mt-16 md:w-2/3 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>{visitUs.title.text}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{visitUs.address.text}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{mailUs.title.text}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{mailUs.email.text}</p>
        </CardContent>
      </Card>
    </MainSectionBody>
  );
};

export default ContactInfo;
