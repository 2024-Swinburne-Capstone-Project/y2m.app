import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface RemoveButtonProps {
  onRemove: () => void;
  tooltipContent?: string;
  dropdownLabel?: string;
  buttonVariant?: 'ghost' | 'default' | 'destructive';
  showDropdown?: boolean;
}

const RemoveButton: React.FC<RemoveButtonProps> = ({
  onRemove,
  tooltipContent = 'Remove',
  dropdownLabel = 'Remove',
  buttonVariant = 'ghost',
  showDropdown = true,
}) => {
  const handleRemove = () => {
    onRemove();
  };

  const button = (
    <Button variant={buttonVariant} size="sm" onClick={showDropdown ? undefined : handleRemove}>
      <Trash2 className="size-4" />
    </Button>
  );

  const content = showDropdown ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{button}</DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleRemove}>
          <Trash2 className="mr-2 size-4" />
          {dropdownLabel}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    button
  );

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent>
          <p>{tooltipContent}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default RemoveButton;
