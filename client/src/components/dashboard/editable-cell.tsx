import { useState, useRef, useEffect } from 'react';

interface EditableCellProps {
  value: string | number;
  onUpdate: (value: string | number) => void;
  className?: string;
  isNumeric?: boolean;
  isPercentage?: boolean;
}

export function EditableCell({ value, onUpdate, className = '', isNumeric = false, isPercentage = false }: EditableCellProps) {
  const [isEditing, setIsEditing] = useState(false);
  const formatValue = (val: string | number) => {
    const str = String(val);
    if (isPercentage && str !== '-' && str !== '') {
      // Remove any existing percentage sign to prevent duplicates
      const cleanVal = str.replace(/%/g, '').trim();
      return cleanVal ? `${cleanVal}%` : '0%';
    }
    return str || '0';
  };

  const parseValue = (val: string) => {
    if (isPercentage) {
      // Remove any non-numeric characters except decimal point and minus sign
      const numStr = val.replace(/[^0-9.-]/g, '');
      const num = parseFloat(numStr);
      return isNaN(num) ? '0' : String(Math.min(100, Math.max(0, num)));
    }
    return val;
  };

  const [inputValue, setInputValue] = useState<string>(formatValue(value));
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Update the input value when the value prop changes
    setInputValue(formatValue(value));
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    saveChanges();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveChanges();
    } else if (e.key === 'Escape') {
      setInputValue(String(value));
      setIsEditing(false);
    }
  };

  const saveChanges = () => {
    const parsedValue = isPercentage ? parseValue(inputValue) : inputValue;
    const currentValue = typeof value === 'number' ? String(value) : value;
    if (parsedValue !== currentValue.replace(/%/g, '')) {
      onUpdate(isNumeric ? parseFloat(parsedValue) || 0 : parsedValue);
    }
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <td className={`${className} relative`}>
        <div className="w-full flex justify-center">
          <input
            ref={inputRef}
            type={isNumeric ? 'number' : 'text'}
            value={isPercentage ? inputValue.replace('%', '') : inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            min={isPercentage ? 0 : undefined}
            max={isPercentage ? 100 : undefined}
            step={isNumeric ? 'any' : undefined}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="w-full max-w-[100px] text-center border border-blue-300 rounded px-1 py-0.5"
          />
        </div>
      </td>
    );
  }

  return (
    <td 
      onClick={handleClick}
      className={`${className} cursor-pointer hover:bg-blue-50 transition-colors text-center`}
      title="Click to edit"
    >
      <div className="w-full text-center">
        {formatValue(value)}
      </div>
    </td>
  );
}
