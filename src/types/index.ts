export type TChildrenProp = {
  children: React.ReactNode;
};

export type TReactNode = React.ReactNode;

export type TSetState = React.Dispatch<React.SetStateAction<boolean>>;
export type TSetStateValue = React.Dispatch<React.SetStateAction<string | null>>;

export interface ActionOption {
  label: string;
  handler: () => void;
}
