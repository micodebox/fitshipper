import { Address } from "../../app/addresses/Addresses.types";
import { AddressBody } from "../../app/shared/addressView/AddressView.types";

export type AddressFreeFormViewProps = {
  address?: Address;
  onSubmit?: (values: AddressBody) => Promise<void>;
};

export type AddressFreeFormViewBody = {
  fullAddress?: string;
};
