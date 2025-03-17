import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SpecificationTableProps {
  specifications: Array<{ key: string; value: string }>;
}

const SpecificationTable: React.FC<SpecificationTableProps> = ({
  specifications,
}) => {
  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-3">Specifications</h2>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/3 sm:w-1/4">Specification</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {specifications.map((spec, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-sm sm:text-base">{spec.key}</TableCell>
                <TableCell className="text-sm sm:text-base">{spec.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SpecificationTable;
