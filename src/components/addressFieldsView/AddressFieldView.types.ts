import { Address } from "../../app/addresses/Addresses.types";
import { AddressBody } from "../../app/shared/addressView/AddressView.types";

export type AddressFieldViewProps = {
  address?: Address;
  onSubmit?: (values: AddressBody) => Promise<void>;
};

export type AddressFieldViewBody = {
  id?: number;
  name?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip?: number;
};
