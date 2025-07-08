import { useState } from "react";
import { Input } from "@/components/ui/input";

type TableData = {
  week: string;
  presented: string;
  accepted: string;
  aht: string;
  csat: string;
};

interface EditableTableProps {
  data: TableData[];
  onDataChange?: (updatedData: TableData[]) => void;
}

export function EditableTable({ data, onDataChange }: EditableTableProps) {
  const [editingCell, setEditingCell] = useState<{row: number; col: string} | null>(null);
  const [editedValue, setEditedValue] = useState("");
  
  const handleCellClick = (rowIndex: number, col: string, value: string) => {
    setEditingCell({ row: rowIndex, col });
    setEditedValue(value);
  };

  const handleBlur = () => {
    if (!editingCell || !onDataChange) return;
    
    const { row, col } = editingCell;
    const updatedData = [...data];
    
    // Update the specific cell value
    updatedData[row] = {
      ...updatedData[row],
      [col]: editedValue
    };
    
    onDataChange(updatedData);
    setEditingCell(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      (e.target as HTMLInputElement).blur();
    } else if (e.key === 'Escape') {
      setEditingCell(null);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted/50 text-muted-foreground">
            <th className="py-2 px-3 text-left font-medium">Week</th>
            <th className="py-2 px-3 text-center font-medium">Presented</th>
            <th className="py-2 px-3 text-center font-medium">Accepted</th>
            <th className="py-2 px-3 text-center font-medium">AHT</th>
            <th className="py-2 px-3 text-center font-medium">CSAT</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr 
              key={row.week} 
              className={`border-b border-border hover:bg-muted/50 ${rowIndex % 2 === 0 ? 'bg-card' : 'bg-card/80'}`}
            >
              <td className="py-2 px-3 font-medium">{row.week}</td>
              {['presented', 'accepted', 'aht', 'csat'].map((col) => (
                <td 
                  key={col} 
                  className="py-2 px-3 text-center relative"
                  onClick={() => handleCellClick(rowIndex, col, row[col as keyof TableData])}
                >
                  {editingCell?.row === rowIndex && editingCell?.col === col ? (
                    <Input
                      autoFocus
                      value={editedValue}
                      onChange={(e) => setEditedValue(e.target.value)}
                      onBlur={handleBlur}
                      onKeyDown={handleKeyDown}
                      className="h-8 text-sm p-1 text-center border-primary/50 bg-background"
                    />
                  ) : (
                    <div className="py-1 px-2 -mx-2 rounded hover:bg-muted/30 cursor-text">
                      {row[col as keyof TableData]}
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
