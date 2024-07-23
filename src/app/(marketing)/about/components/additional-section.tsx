import MainSection from '@/components/common/main-section';
import MainSectionBody from '@/components/common/main-section-body';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface AdditionalSectionProps {
  contentText: string;
  linkText: string;
  linkHref: string;
  suffixText: string;
}

export const AdditionalSection: React.FC<AdditionalSectionProps> = ({
  contentText,
  linkText,
  linkHref,
  suffixText,
}) => {
  return (
    <MainSection className="bg-secondary">
      <MainSectionBody>
        <div>
          <p className="text-justify text-xl leading-relaxed text-muted-foreground">
            {contentText}{' '}
            <Button variant="link" className="px-1 text-xl" asChild>
              <Link href={linkHref}>{linkText}</Link>
            </Button>{' '}
            {suffixText}
          </p>
        </div>
      </MainSectionBody>
    </MainSection>
  );
};
