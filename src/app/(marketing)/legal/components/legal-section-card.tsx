import { TermsAndConditionsSection, TextWithMarkup } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Typography from '@/components/ui/typography';
import { Key } from 'react';
import MainSectionImage from '@/components/marketing/main-section-image';

interface LegalSectionCardProps {
  section: TermsAndConditionsSection;
}

export const LegalSectionCard: React.FC<LegalSectionCardProps> = ({ section }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{section.title.text}</CardTitle>
      </CardHeader>
      <CardContent>
        {section.content.map((paragraph: TextWithMarkup, paragraphIndex: Key) => (
          <Typography key={paragraphIndex} variant="p">
            {paragraph.text}
          </Typography>
        ))}
      </CardContent>
      {section.imagePath && (
        <MainSectionImage imagePath={section.imagePath} width={300} height={300} />
      )}
    </Card>
  );
};
