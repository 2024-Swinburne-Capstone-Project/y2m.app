import React from 'react';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';

interface DataTableProps<T> {
  title: string;
  data: T[];
  headers: string[];
  renderRow: (item: T) => React.ReactNode;
  onAddNew: () => void;
  disabled?: boolean;
}

export function DataTable<T>({
  title,
  data,
  headers,
  renderRow,
  onAddNew,
  disabled,
}: DataTableProps<T>) {
  return (
    <Card className="mb-5">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        {!disabled && (
          <Button onClick={onAddNew}>
            <PlusCircle className="mr-2 size-4" /> Add New
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={header}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>{renderRow(item)}</TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
