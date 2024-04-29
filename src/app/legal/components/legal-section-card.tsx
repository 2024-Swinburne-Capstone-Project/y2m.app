import { TermsAndConditionsSection } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Typography from '@/components/ui/typography';
import { Key } from 'react';
import MainSectionImage from '@/components/main-section-image';

interface LegalSectionCardProps {
  section: TermsAndConditionsSection;
}

export const LegalSectionCard: React.FC<LegalSectionCardProps> = ({ section }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{section.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {section.content.map((paragraph: string, paragraphIndex: Key) => (
          <Typography key={paragraphIndex} variant="p">
            {paragraph}
          </Typography>
        ))}
      </CardContent>
      {section.imagePath && (
        <MainSectionImage imagePath={section.imagePath} width={300} height={300} />
      )}
    </Card>
  );
};
