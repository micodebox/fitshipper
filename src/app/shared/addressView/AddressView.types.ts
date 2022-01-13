import { Address } from "../../addresses/Addresses.types";

export type AddressViewContainerProps = {
  address?: Address;
  loading?: boolean;
};

export type AddressViewProps = {
  address?: Address;
  loading?: boolean;
  onSubmit?: (values: AddressBody) => Promise<void>;
};

export type AddressBody = {
  id?: number;
  name?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip?: number;
};
