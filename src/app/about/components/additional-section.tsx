import MainSection from '@/components/main-section';
import MainSectionBody from '@/components/main-section-body';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface AdditionalSectionProps {
  content: string;
}

export const AdditionalSection: React.FC<AdditionalSectionProps> = ({ content }) => {
  return (
    <MainSection className="bg-secondary">
      <MainSectionBody>
        <div>
          <p className="text-justify text-xl leading-relaxed text-muted-foreground">
            {content}
            <span>
              <Button variant="link" className="px-1 text-xl" asChild>
                <Link href="/api/auth/login">Signup</Link>
              </Button>
              to take the next step in your development journey
            </span>
          </p>
        </div>
      </MainSectionBody>
    </MainSection>
  );
};
