import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { AppRoute } from "../../routing/AppRoutes.enum";
import { AddressView } from "./AddressView";
import { AddressBody, AddressViewContainerProps } from "./AddressView.types";

export const AddressViewContainer = ({ address, loading: loadingProps }: AddressViewContainerProps) => {
  const { push } = useHistory();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: AddressBody) => {
    setLoading(true);

    try {
      if (values.id) {
        const response = await axios.patch(`/address/${values.id}`, values);
  
        if (response.status === 200) {
          push(AppRoute.addresses);
        } else {
          throw new Error();
        }
      } else {
        const response = await axios.post('/address', values);
  
        if (response.status === 200) {
          push(AppRoute.addresses);
        } else {
          throw new Error();
        }
      }      
    } catch (error) {
      throw new Error();
    } finally {
      setLoading(false);
    }
  };

  return <AddressView address={address} onSubmit={onSubmit} loading={loading || loadingProps} />;
};
