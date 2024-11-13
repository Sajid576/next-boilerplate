import React from 'react'

export default function DetailsItem({
  label,
  value,
}: {
  label: string;
  value: string | React.ReactNode | React.ReactElement; // Updated type to accept a React component
}) {
  return (
    <p className="text-gray-700 capitalize">
      <strong>{label}:</strong> {value}
    </p>
  );
}