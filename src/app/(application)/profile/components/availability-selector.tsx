import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const timeSlots = Array.from({ length: 48 }, (_, i) => {
  const hour = Math.floor(i / 2);
  const minute = i % 2 === 0 ? '00' : '30';
  return `${hour.toString().padStart(2, '0')}:${minute}`;
});

interface AvailabilitySelectorProps {
  selectedDays: string[];
  selectedTimes: Record<string, string[]>;
  onDayToggle: (day: string) => void;
  onTimeChange: (day: string, startTime: string, endTime: string) => void;
  className?: string;
  disabled?: boolean;
}

const AvailabilitySelector: React.FC<AvailabilitySelectorProps> = ({
  selectedDays,
  selectedTimes,
  onDayToggle,
  onTimeChange,
  className,
  disabled,
}) => {
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle>Availability</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {daysOfWeek.map((day) => (
              <Button
                key={day}
                variant={selectedDays.includes(day) ? 'default' : 'outline'}
                onClick={() => !disabled && onDayToggle(day)}
                className="w-14"
                disabled={disabled}
              >
                {day}
              </Button>
            ))}
          </div>
          {selectedDays.map((day) => (
            <div key={day} className="space-y-2">
              <div className="font-medium">{day}</div>
              <div className="flex items-center space-x-2">
                <Select
                  value={selectedTimes[day]?.[0] || ''}
                  onValueChange={(value) => !disabled && onTimeChange(day, value, selectedTimes[day]?.[1] || value)} // Disable time change
                  disabled={disabled}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Start Time" />
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
                <Select
                  value={selectedTimes[day]?.[1] || ''}
                  onValueChange={(value) => !disabled && onTimeChange(day, selectedTimes[day]?.[0] || value, value)} // Disable time change
                  disabled={disabled}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="End Time" />
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
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AvailabilitySelector;