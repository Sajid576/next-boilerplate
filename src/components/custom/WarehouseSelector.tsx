import React, { useEffect, useState } from "react";
import ControlledSelect from "@components/custom/inputs/ControlledSelect";
import { useGetWarehousesQuery } from "@app/warehouses/redux/warehouseApi";

interface WarehouseSelectorProps {
  onWarehouseChange: (warehouseId: string) => void;
}

const WarehouseSelector: React.FC<WarehouseSelectorProps> = ({
  onWarehouseChange,
}) => {
  const [selectedWarehouse, setSelectedWarehouse] = useState<string | null>(
    null
  );
  const { data: warehouses, isLoading: isWarehousesLoading } =
    useGetWarehousesQuery(null);

  useEffect(() => {
    if (warehouses?.data && warehouses.data.length > 0 && !selectedWarehouse) {
      setSelectedWarehouse(warehouses.data[0].id);
      onWarehouseChange(warehouses.data[0].id);
    }
  }, [warehouses, selectedWarehouse, onWarehouseChange]);

  const handleWarehouseChange = (value: string) => {
    setSelectedWarehouse(value);
    onWarehouseChange(value);
  };

  if (isWarehousesLoading || !warehouses || !selectedWarehouse) {
    return null;
  }

  return (
    <ControlledSelect
      className="max-w-[200px]"
      label="Warehouse"
      placeholder="Select a Warehouse"
      options={warehouses.data || []}
      defaultValue={selectedWarehouse || undefined}
      onChange={handleWarehouseChange}
    />
  );
};

export default WarehouseSelector;
