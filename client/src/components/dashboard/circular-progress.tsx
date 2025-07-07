interface CircularProgressProps {
  value: number;
  maxValue: number;
  color: string;
  label?: string;
  size?: number;
}

export function CircularProgress({ 
  value, 
  maxValue, 
  color, 
  label, 
  size = 80 
}: CircularProgressProps) {
  const radius = size / 2 - 6;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min((value / maxValue) * 100, 100);
  const strokeDashoffset = circumference - (circumference * percentage) / 100;

  return (
    <div className="relative" style={{ width: size, height: size, padding: 2 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="10"
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-300 ease-in-out"
        />
      </svg>
      <div className="w-full text-center font-bold mt-1" style={{ color, fontSize: size * 0.32 }}>
        {label}
      </div>
    </div>
  );
}
