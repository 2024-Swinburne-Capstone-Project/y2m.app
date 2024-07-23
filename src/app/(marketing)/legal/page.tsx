'use client';
import { useState } from 'react';
import { privacyPolicyConfig, termsAndConditionsConfig } from '@/config/marketing/legal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LegalHeroSection } from './components/legal-hero-section';
import { LegalContentSection } from './components/legal-content-section';
import { PrivacyPolicyConfig, TermsAndConditionsConfig } from '@/types';

export default function LegalPage() {
  const [activeTab, setActiveTab] = useState('privacy');

  const config: PrivacyPolicyConfig | TermsAndConditionsConfig =
    activeTab === 'privacy' ? privacyPolicyConfig : termsAndConditionsConfig;

  return (
    <div className="min-h-screen bg-background">
      <LegalHeroSection config={config} />
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="mx-auto mb-10 max-w-7xl px-10"
      >
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
          <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
        </TabsList>
        <TabsContent value="privacy">
          <LegalContentSection sections={privacyPolicyConfig.sections} />
        </TabsContent>
        <TabsContent value="terms">
          <LegalContentSection sections={termsAndConditionsConfig.sections} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
