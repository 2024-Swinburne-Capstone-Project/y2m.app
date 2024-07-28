'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Features } from '@/components/marketing/features';
import { Testimonials } from '@/components/marketing/testimonials';
import Title from '@/components/common/title';
import Subtitle from '@/components/common/subtitle';
import MainSectionBody from '@/components/common/main-section-body';
import Image from 'next/image';
import MainSection from '@/components/common/main-section';
import { IntroVideo } from '@/components/marketing/intro-video';
import { Perks } from '@/components/marketing/perks';
import { MentorBenefits } from '@/components/marketing/mentor-benefits';
import { MenteeBenefits } from '@/components/marketing/mentee-benefits';
import { HomeBlogs } from '@/components/marketing/home-blogs';
import { AcknowledgementOfCountry } from '@/components/marketing/acknowledgement-of-country';
import { homeConfig } from '@/config/marketing/home';
import parseTextWithMarkup from '@/config/common/parser/parseTextWithMarkup';
import { useBlogPosts } from '@/hooks/useBlogData';
import { FlipWords } from '@/components/ui/flip-words';

export default function Home() {
  const { data: blogs, isLoading, error } = useBlogPosts();

  return (
    <div className="mx-6 mb-6 min-h-screen bg-background">
      <AnimatePresence>
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <MainSection>
            <MainSectionBody className="items-center space-y-6">
              <div className="space-y-6 md:w-1/2">
                <Title className="mx-auto lg:text-7xl">
                  <FlipWords
                    className="text-primary"
                    words={homeConfig.mainTitle.words.map((word) => word.text)}
                  />
                  <br />
                  {parseTextWithMarkup(homeConfig.mainTitle.staticText)}
                </Title>
                <Subtitle className="mb-8 text-lg text-muted-foreground md:text-xl">
                  {parseTextWithMarkup(homeConfig.subtitle)}
                </Subtitle>
              </div>
              <div className="dark:overflow-hidden dark:rounded-full dark:bg-foreground md:w-1/2">
                <Image
                  src={homeConfig.heroImage.src}
                  alt={homeConfig.heroImage.alt}
                  width={homeConfig.heroImage.width}
                  height={homeConfig.heroImage.height}
                  className="h-auto w-full object-cover"
                />
              </div>
            </MainSectionBody>
          </MainSection>
        </motion.section>
        <div className="mx-auto max-w-7xl">
          <Perks />
          <IntroVideo />
          <Features />
          <MentorBenefits />
          <MenteeBenefits />
          <HomeBlogs blogs={blogs || []} isLoading={isLoading} error={error} />
          <Testimonials />
          <AcknowledgementOfCountry />
        </div>
      </AnimatePresence>
    </div>
  );
}
