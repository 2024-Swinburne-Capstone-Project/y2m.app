import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { profileConfig } from '@/config/application/profile-config';
import ProfileSection from './components/profile-section';
import EducationSection from './components/education-section';
import ExperienceSection from './components/experience-section';
import EducationTable from './components/education-table';
import ExperienceTable from './components/experience-table';
export default function ProfilePage() {
  //TODO - Get user data from API, Save user data to API, Update Profile Picture through Auth0 API
  return (
    <div>
      <Card className="mx-auto mt-8 max-w-7xl">
        <CardHeader>
          <CardTitle>{profileConfig.profileForm.header.text}</CardTitle>
        </CardHeader>
        <CardContent>
          <ProfileSection />
        </CardContent>
      </Card>
      <Card className="mx-auto mt-8 max-w-7xl">
        <CardHeader>
          <CardTitle>{profileConfig.educationForm.header.text}</CardTitle>
        </CardHeader>
        <CardContent>
          <EducationSection />
        </CardContent>
      </Card>
      <Card className="mx-auto mt-8 max-w-7xl">
        <CardHeader>
          <CardTitle>{profileConfig.educationTable.caption}</CardTitle>
        </CardHeader>
        <CardContent>
          <EducationTable />
        </CardContent>
      </Card>
      <Card className="mx-auto mt-8 max-w-7xl">
        <CardHeader>
          <CardTitle>{profileConfig.experienceForm.header.text}</CardTitle>
        </CardHeader>
        <CardContent>
          <ExperienceSection />
        </CardContent>
      </Card>
      <Card className="mx-auto my-8 max-w-7xl">
        <CardHeader>
          <CardTitle>{profileConfig.experienceTable.caption}</CardTitle>
        </CardHeader>
        <CardContent>
          <ExperienceTable />
        </CardContent>
      </Card>
    </div>
  );
}
