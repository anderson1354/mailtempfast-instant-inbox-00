
import React from 'react';
import MainLayout from '@/components/MainLayout';
import MainHero from '@/components/MainHero';
import EmailGenerator from '@/components/EmailGenerator';
import AdBanner from '@/components/AdBanner';
import PrivacyNotice from '@/components/PrivacyNotice';

const Index = () => {
  return (
    <MainLayout>
      <MainHero />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <EmailGenerator />
        
        <div className="space-y-6">
          <AdBanner type="rectangle" position="sidebar" />
          <PrivacyNotice />
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
