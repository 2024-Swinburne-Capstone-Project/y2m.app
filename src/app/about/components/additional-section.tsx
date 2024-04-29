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
          <p className="text-xl text-muted-foreground text-justify">{content}</p>
          <p className="text-xl text-muted-foreground">
            <Button variant="link" className="text-xl pl-0 pr-1" asChild>
              <Link href="/api/auth/login">Signup</Link>
            </Button>{' '}
            to take the next step in your development journey
          </p>
        </div>
      </MainSectionBody>
    </MainSection>
  );
};