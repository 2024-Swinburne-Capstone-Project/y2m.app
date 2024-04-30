'use client';
import { useState } from 'react';
import { privacyPolicyConfig, termsAndConditionsConfig } from '@/config/legal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LegalHeroSection } from './components/legal-hero-section';
import { LegalContentSection } from './components/legal-content-section';

export default function LegalPage() {
  const [activeTab, setActiveTab] = useState('privacy');

  const config = activeTab === 'privacy' ? privacyPolicyConfig : termsAndConditionsConfig;

  return (
    <div className="min-h-screen bg-background">
      <LegalHeroSection config={config} />
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="max-w-7xl mx-auto pl-10 pr-10 mb-10"
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
