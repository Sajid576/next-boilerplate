export type TDistributorUser = {
  id: string;
  userName: string;
  email: string;
  role: string;
};

export type TDistributorUserData = {
  data: TDistributorUser[];
  success: boolean;
};
