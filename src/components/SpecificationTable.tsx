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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Specification</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {specifications.map((spec, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{spec.key}</TableCell>
            <TableCell>{spec.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SpecificationTable;
