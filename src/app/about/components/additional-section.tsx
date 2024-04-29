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
          <p className="text-xl text-muted-foreground text-justify leading-relaxed">
            {content}
            <span>
              <Button variant="link" className="text-xl pl-1 pr-1" asChild>
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
