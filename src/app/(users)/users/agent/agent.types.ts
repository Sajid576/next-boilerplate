export type TAgentUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type TAgentUserData = {
  data: TAgentUser[];
  success: boolean;
};
