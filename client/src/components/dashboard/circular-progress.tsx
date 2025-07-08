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
    <div className="relative flex flex-col items-center" style={{ width: size, height: size }}>
      <svg 
        width={size} 
        height={size} 
        viewBox={`0 0 ${size} ${size}`} 
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#f3f4f6"
          strokeWidth="8"
          fill="none"
          className="transition-colors duration-200"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-500 ease-in-out"
          style={{
            filter: 'drop-shadow(0 0 2px rgba(59, 130, 246, 0.3))'
          }}
        />
      </svg>
      {/* Label */}
      {label && (
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{
            fontSize: size * 0.24,
            fontWeight: 600,
            color: '#1f2937',
            lineHeight: 1
          }}
        >
          {label}
        </div>
      )}
      {/* Percentage */}
      <div 
        className="absolute -bottom-5 w-full text-center font-medium"
        style={{
          color,
          fontSize: size * 0.14,
          fontWeight: 600
        }}
      >
        {Math.round(percentage)}%
      </div>
    </div>
  );
}
