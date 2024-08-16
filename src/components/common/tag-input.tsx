import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface TagInputProps<T> {
  title: string;
  items: T[];
  setItems: (items: T[]) => void; // Changed this line
  itemToString: (item: T) => string;
  placeholder: string;
  addButtonText: string;
  createNewItem: (name: string) => T;
  className?: string;
  disabled?: boolean;
}

function TagInput<T>({
  title,
  items,
  setItems,
  itemToString,
  placeholder,
  addButtonText,
  createNewItem,
  className,
  disabled,
}: TagInputProps<T>) {
  const [newItemName, setNewItemName] = useState('');

  const handleAddItem = () => {
    if (newItemName.trim() && !disabled) {
      const newItem = createNewItem(newItemName);
      setItems([...items, newItem]);
      setNewItemName('');
    }
  };

  const handleRemoveItem = (index: number) => {
    if (!disabled) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  return (
    <Card className={`${className} flex flex-col`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex grow flex-col">
        <div className="mb-4 grow overflow-y-auto">
          <div className="flex flex-wrap gap-2">
            {items.map((item, index) => (
              <Badge
                key={index}
                variant="secondary"
                className={disabled ? 'cursor-default' : 'cursor-pointer'}
              >
                {itemToString(item)}
                {!disabled && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span
                          className="ml-2 cursor-pointer"
                          onClick={() => handleRemoveItem(index)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              handleRemoveItem(index);
                            }
                          }}
                          tabIndex={0}
                        >
                          ×
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Click to remove</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </Badge>
            ))}
          </div>
        </div>
        {!disabled && (
          <div className="mt-auto flex gap-2">
            <Input
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder={placeholder}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddItem();
                }
              }}
            />
            <Button onClick={handleAddItem}>
              <PlusCircle className="mr-2 size-4" /> {addButtonText}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default TagInput;
