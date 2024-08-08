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
  setItems: React.Dispatch<React.SetStateAction<T[]>>;
  itemToString: (item: T) => string;
  idExtractor: (item: T) => string;
  placeholder: string;
  addButtonText: string;
  createNewItem: (name: string) => T;
  className: string;
  disabled: boolean;
}

function TagInput<T>({
  title,
  items,
  setItems,
  itemToString,
  idExtractor,
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
      setItems((prevItems) => [...prevItems, newItem]);
      setNewItemName('');
    }
  };

  const handleRemoveItem = (id: string) => {
    if (!disabled) {
      setItems((prevItems) => prevItems.filter((item) => idExtractor(item) !== id));
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap gap-2">
          {items.map((item) => (
            <Badge
              key={idExtractor(item)}
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
                        onClick={() => handleRemoveItem(idExtractor(item))}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            handleRemoveItem(idExtractor(item));
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
        {!disabled && (
          <div className="flex gap-2">
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
