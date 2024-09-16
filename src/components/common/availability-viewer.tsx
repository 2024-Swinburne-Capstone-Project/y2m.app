import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const timeSlots = Array.from({ length: 48 }, (_, i) => {
  const hour = Math.floor(i / 2);
  const minute = i % 2 === 0 ? '00' : '30';
  return `${hour.toString().padStart(2, '0')}:${minute}`;
});

interface AvailabilityViewerProps {
  availability: string;
  className?: string;
  textBased?: boolean; // Existing prop
  withHeader?: boolean; // Added new prop
}

export default function AvailabilityViewer({
  availability,
  className,
  textBased = false,
  withHeader = false,
}: AvailabilityViewerProps) {
  let selectedDays: string[] = [];
  let selectedTimes: Record<string, string[]> = {};

  try {
    selectedTimes = JSON.parse(availability);
    selectedDays = Object.keys(selectedTimes);
  } catch (error) {
    console.error('Error parsing availability:', error);
  }

  const renderAvailability = () => {
    if (textBased) {
      return (
        <div className="text-sm">
          {selectedDays.map((day) => (
            <Badge variant={'secondary'} key={day} className='mb-1 mr-1'>
              <span className="font-medium">{day}:</span>&nbsp;{selectedTimes[day][0]} - {selectedTimes[day][1]}
            </Badge>
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {daysOfWeek.map((day) => {
          const times = selectedTimes[day];
          if (!times) return null;

          return (
            <div key={day} className="space-y-2">
              <div className="font-medium">{day}</div>
              <div className="flex items-center space-x-2">
                <Select disabled defaultValue={times[0] || ''}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span>to</span>
                <Select disabled defaultValue={times[1] || ''}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {textBased ? (
        renderAvailability()
      ) : (
        <Card className={cn(className)}>
          {withHeader && (
            <>
              <CardHeader>
                <CardTitle>Availability</CardTitle>
              </CardHeader><CardContent>
                {renderAvailability()}
              </CardContent>
            </>
          )}
        </Card>
      )}
    </>
  );
};