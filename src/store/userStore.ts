import { create } from 'zustand';

export interface UserStoreType {
  username:string;
  userType:string;
  accessToken:string;
  refreshToken:string;
  setUserData: (data:UserStoreType) => void;
}

export const userStore = create<UserStoreType>((set) => ({
  username: '',
  userType: '',
  accessToken: '',
  refreshToken: '',

  setUserData: ({ username,userType,accessToken,refreshToken }:UserStoreType) => {
    set({ username,userType,accessToken,refreshToken });    
  }
}));
