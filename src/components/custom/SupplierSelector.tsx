import React, { useEffect, useState } from "react";
import ControlledSelect from "@components/custom/inputs/ControlledSelect";
import { useGetSuppliersQuery } from "@app/suppliers/redux/supplierApi";

interface SupplierSelectorProps {
  onSupplierChange: (supplierId: string) => void;
  deliveryType: string;
  deliveryTypes: { [key: string]: string };
}

const SupplierSelector: React.FC<SupplierSelectorProps> = ({
  onSupplierChange,
  deliveryType,
  deliveryTypes,
}) => {
  const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null);
  const { data: suppliers, isLoading: isSuppliersLoading } =
    useGetSuppliersQuery(null);

  useEffect(() => {
    if (suppliers?.data && suppliers.data.length > 0 && !selectedSupplier) {
      setSelectedSupplier(suppliers.data[0].id);
      onSupplierChange(suppliers.data[0].id);
    }
  }, [suppliers, selectedSupplier, onSupplierChange]);

  const handleSupplierChange = (value: string) => {
    setSelectedSupplier(value);
    onSupplierChange(value);
  };

  if (
    isSuppliersLoading ||
    !suppliers ||
    !selectedSupplier 
    
  ) {
    return null;
  }

  return (
    <ControlledSelect
      className="max-w-[200px]"
      label="Supplier"
      placeholder="Select a supplier"
      options={suppliers.data || []}
      defaultValue={selectedSupplier || undefined}
      onChange={handleSupplierChange}
    />
  );
};

export default SupplierSelector;
