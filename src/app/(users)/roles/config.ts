export const API_ENDPOINT = "/roles";
export const BASE_ROUTE = "/roles";

export const MODULE_NAME = "Roles";
export const MODULE_NAME_SINGULAR = "Role";

export const ACTION_CREATE = { id: "create", name: "Create" };
export const ACTION_UPDATE = { id: "update", name: "Update" };
export const ACTION_VIEW = { id: "view", name: "View" };
export const ACTION_DELETE = { id: "delete", name: "Delete" };
export const ACTION_APPROVE = { id: "approve", name: "Approve" };
export const ACTION_REJECT = { id: "reject", name: "Reject" };
export const ACTION_DOWNLOAD = { id: "download", name: "Download" };

export const COMMON_ACTIONS = [
  ACTION_CREATE,
  ACTION_UPDATE,
  ACTION_VIEW,
  ACTION_DELETE,
  ACTION_APPROVE,
  ACTION_REJECT,
  ACTION_DOWNLOAD,
];

export const MODULES = {
  products: {
    id: "products",
    sidebarLabel: "Products",
    formLabel: "Products",
  },
  allProducts: {
    id: "products",
    sidebarLabel: "All Products",
    formLabel: "All Products",
  },
  centralWareHouseProducts: {
    id: "products",
    sidebarLabel: "Distributor Products",
    formLabel: "Distributor Products",
  },

  wareHouseProducts: {
    id: "products",
    sidebarLabel: "Agent Warehouse Products",
    formLabel: "Agent Warehouse Products",
  },
  categories: {
    id: "categories",
    sidebarLabel: "Categories",
    formLabel: "Categories",
  },
  color: {
    id: "colors",
    sidebarLabel: "Colors",
    formLabel: "Colors",
  },
  size: {
    id: "sizes",
    sidebarLabel: "Sizes",
    formLabel: "Sizes",
  },
  unit: {
    id: "units",
    sidebarLabel: "Units",
    formLabel: "Units",
  },
  warehouse: {
    id: "warehouses",
    sidebarLabel: "Warehouses",
    formLabel: "Warehouse",
  },
  supplier: {
    id: "suppliers",
    sidebarLabel: "Suppliers",
    formLabel: "Supplier",
  },
  requisition: {
    id: "requisitions",
    sidebarLabel: "Requisition",
    formLabel: "Requisition (Distributor)",
  },
  requisitionDeliveries: {
    id: "requisition-deliveries",
    sidebarLabel: "Deliveries",
    formLabel: "Requisition Deliveries (Distributor)",
  },
  requisitionReceivables: {
    id: "requisition-receivables",
    sidebarLabel: "Receivables",
    formLabel: "Requisition Receivables (Distributor)",
  },
  purchaseOrder: {
    id: "purchase-orders",
    sidebarLabel: "Purchase Orders",
    formLabel: "Purchase Orders",
  },
  purchaseOrderDeliveries: {
    id: "purchase-order-deliveries",
    sidebarLabel: "Deliveries",
    formLabel: "PO Deliveries (Distributor)",
  },
  purchaseOrderReceivables: {
    id: "purchase-order-receivables",
    sidebarLabel: "Receivables",
    formLabel: "PO Receivables (Agent)",
  },
  return: {
    id: "returns",
    sidebarLabel: "Returns",
    formLabel: "Returns",
  },
  returnDeliverables: {
    id: "return-deliveries",
    sidebarLabel: "Deliveries",
    formLabel: "Return Deliveries (Agent)",
  },
  returnReceivables: {
    id: "return-receivables",
    sidebarLabel: "Receivables",
    formLabel: "Return Receivables (Distributor)",
  },
  roles: {
    id: "roles",
    sidebarLabel: "Roles",
    formLabel: "Roles",
  },
  users: {
    id: "users",
    sidebarLabel: "Users",
    formLabel: "Users",
  },
  distributorUsers: {
    id: "distributor-users",
    sidebarLabel: "Distributor Users",
    formLabel: "Distributor Users",
  },
  agentUsers: {
    id: "agent-users",
    sidebarLabel: "Agent Users",
    formLabel: "Agent Users",
  },

  banners: {
    id: "banners",
    sidebarLabel: "Banners",
    formLabel: "Banners",
  },
  order: {
    id: "orders",
    sidebarLabel: "Orders",
    formLabel: "Orders",
  },
  featuredProducts: {
    id: "featured-products",
    sidebarLabel: "Featured Products",
    formLabel: "Featured Products",
  },
  featuredCategories: {
    id: "featured-categories",
    sidebarLabel: "Featured Categories",
    formLabel: "Featured Categories",
  },
};

export const DISTRIBUTOR_PERMISSIONS = [
  {
    identifier: {
      name: MODULES.products.formLabel,
      id: MODULES.products.id,
    },
    actions: COMMON_ACTIONS,
  },
  {
    identifier: {
      name: MODULES.categories.formLabel,
      id: MODULES.categories.id,
    },
    actions: COMMON_ACTIONS,
  },
  {
    identifier: {
      name: MODULES.color.formLabel,
      id: MODULES.color.id,
    },
    actions: COMMON_ACTIONS,
  },
  {
    identifier: {
      name: MODULES.size.formLabel,
      id: MODULES.size.id,
    },
    actions: COMMON_ACTIONS,
  },
  {
    identifier: {
      name: MODULES.unit.formLabel,
      id: MODULES.unit.id,
    },
    actions: COMMON_ACTIONS,
  },
  {
    identifier: {
      name: MODULES.warehouse.formLabel,
      id: MODULES.warehouse.id,
    },
    actions: COMMON_ACTIONS,
  },
  {
    identifier: {
      name: MODULES.supplier.formLabel,
      id: MODULES.supplier.id,
    },
    actions: COMMON_ACTIONS,
  },
  {
    identifier: {
      name: MODULES.requisition.formLabel,
      id: MODULES.requisition.id,
    },
    actions: COMMON_ACTIONS,
  },
  {
    identifier: {
      name: MODULES.requisitionDeliveries.formLabel,
      id: MODULES.requisitionDeliveries.id,
    },
    actions: COMMON_ACTIONS,
  },
  {
    identifier: {
      name: MODULES.requisitionReceivables.formLabel,
      id: MODULES.requisitionReceivables.id,
    },
    actions: COMMON_ACTIONS,
  },
  {
    identifier: {
      name: MODULES.purchaseOrder.formLabel,
      id: MODULES.purchaseOrder.id,
    },
    actions: COMMON_ACTIONS,
  },
  {
    identifier: {
      name: MODULES.purchaseOrderDeliveries.formLabel,
      id: MODULES.purchaseOrderDeliveries.id,
    },
    actions: COMMON_ACTIONS,
  },
  {
    identifier: {
      name: MODULES.return.formLabel,
      id: MODULES.return.id,
    },
    actions: COMMON_ACTIONS,
  },
  {
    identifier: {
      name: MODULES.returnReceivables.formLabel,
      id: MODULES.returnReceivables.id,
    },
    actions: COMMON_ACTIONS,
  },
  {
    identifier: {
      name: MODULES.roles.formLabel,
      id: MODULES.roles.id,
    },
    actions: COMMON_ACTIONS,
  },
  {
    identifier: {
      name: MODULES.distributorUsers.formLabel,
      id: MODULES.distributorUsers.id,
    },
    actions: COMMON_ACTIONS,
  },
  {
    identifier: {
      name: MODULES.agentUsers.formLabel,
      id: MODULES.agentUsers.id,
    },
    actions: COMMON_ACTIONS,
  },
  {
    identifier: {
      name: MODULES.banners.formLabel,
      id: MODULES.banners.id,
    },
    actions: COMMON_ACTIONS,
  },
];

export const AGENT_PERMISSIONS = [
  {
    identifier: {
      name: MODULES.products.formLabel,
      id: MODULES.products.id,
    },
    actions: COMMON_ACTIONS,
  },
  {
    identifier: {
      name: MODULES.featuredProducts.formLabel,
      id: MODULES.featuredProducts.id,
    },
    actions: COMMON_ACTIONS,
  },
  {
    identifier: {
      name: MODULES.featuredCategories.formLabel,
      id: MODULES.featuredCategories.id,
    },
    actions: COMMON_ACTIONS,
  },
  {
    identifier: {
      name: MODULES.purchaseOrder.formLabel,
      id: MODULES.purchaseOrder.id,
    },
    actions: COMMON_ACTIONS,
  },
  {
    identifier: {
      name: MODULES.purchaseOrderReceivables.formLabel,
      id: MODULES.purchaseOrderReceivables.id,
    },
    actions: COMMON_ACTIONS,
  },
  {
    identifier: {
      name: MODULES.return.formLabel,
      id: MODULES.return.id,
    },
    actions: COMMON_ACTIONS,
  },
  {
    identifier: {
      name: MODULES.returnDeliverables.formLabel,
      id: MODULES.returnDeliverables.id,
    },
    actions: COMMON_ACTIONS,
  },
  {
    identifier: {
      name: MODULES.agentUsers.formLabel,
      id: MODULES.agentUsers.id,
    },
    actions: COMMON_ACTIONS,
  },
  {
    identifier: {
      name: MODULES.banners.formLabel,
      id: MODULES.banners.id,
    },
    actions: COMMON_ACTIONS,
  },
  {
    identifier: {
      name: MODULES.order.formLabel,
      id: MODULES.order.id,
    },
    actions: COMMON_ACTIONS,
  },
];
