
import React, { useState } from 'react';
import MainLayout from '@/components/MainLayout';
import MainHero from '@/components/MainHero';
import EmailGenerator from '@/components/EmailGenerator';
import EducationalSection from '@/components/EducationalSection';
import AdBanner from '@/components/AdBanner';
import PrivacyNotice from '@/components/PrivacyNotice';

const Index = () => {
  const [heroGeneratedEmail, setHeroGeneratedEmail] = useState<{email: string, password: string} | null>(null);

  const handleEmailGenerated = (email: string, password: string) => {
    setHeroGeneratedEmail({ email, password });
  };

  return (
    <MainLayout>
      <MainHero onEmailGenerated={handleEmailGenerated} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <EmailGenerator heroGeneratedEmail={heroGeneratedEmail} />
        
        <div className="space-y-6">
          <AdBanner type="rectangle" position="sidebar" />
          <PrivacyNotice />
        </div>
      </div>

      <EducationalSection />
    </MainLayout>
  );
};

export default Index;
