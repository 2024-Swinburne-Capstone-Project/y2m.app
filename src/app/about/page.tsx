import MainSection from '@/components/main-section';
import MainSectionBody from '@/components/main-section-body';
import { AboutCarousel } from './components/about-carousel';
import { aboutConfig } from '@/config/about';
import Image from 'next/image';
import Title from '@/components/title';
import Subtitle from '@/components/subtitle';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainSection>
        <MainSectionBody className="space-y-6">
          <div className="md:w-1/2 space-y-6">
            <Title>
              <>
                At You2Mentor, we believe that <span className="text-primary">everyone</span> should
                have the opportunity to access a mentor
              </>
            </Title>
            <Subtitle>{aboutConfig.heroContent.contentText}</Subtitle>
          </div>
          <div className="md:w-1/2 dark:bg-primary-foreground dark:rounded-full">
            <Image
              src={aboutConfig.heroContent.imagePath}
              alt={aboutConfig.heroContent.titleText}
              width={300}
              height={300}
              className="w-full h-auto object-cover"
            />
          </div>
        </MainSectionBody>
      </MainSection>
      <MainSection>
        <MainSectionBody>
          <div>
            <p className="text-xl text-muted-foreground text-justify">
              According to Gallup, only 37% of individuals currently have access to at least one
              mentor. So we have created a platform for individual development where not only can
              you drive your growth, you can utilise a tribe of mentors based on development goals
              and mentor others utilising your strengths
            </p>
            <p className="text-xl text-muted-foreground">
              <Button variant="link" className="text-xl pl-0 pr-1" asChild>
                <Link href="/api/auth/login">Signup</Link>
              </Button>
              to take the next step in your development journey
            </p>
          </div>
        </MainSectionBody>
      </MainSection>
      <MainSection>
        <div className="py-12 px-4 md:px-8 max-w-7xl mx-auto space-y-6">
          <Title className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Our Core Values
          </Title>
          <AboutCarousel slides={aboutConfig.carouselSlides} />
        </div>
      </MainSection>
    </div>
  );
}
