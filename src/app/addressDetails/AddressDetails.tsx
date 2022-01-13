import { AddressViewContainer } from "../shared/addressView/AddressViewContainer";
import { AddressDetailsProps } from "./AddressDetails.types";

export const AddressDetails = ({ address, loading }: AddressDetailsProps) => {
  return (
    <AddressViewContainer address={address} loading={loading} />
  );
};
