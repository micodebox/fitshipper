import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Address } from "../addresses/Addresses.types";
import { AddressDetails } from "./AddressDetails"

export const AddressDetailsContainer = () => {
  const [address, setAddress] = useState<Address>();
  const [loading, setLoading] = useState(false);
  const { addressId } = useParams<{ addressId: string }>();

  useEffect(() => {
    const getAddress = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/address/${addressId}`);
        setAddress(response.data);
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    getAddress();
  }, [addressId]);

  return <AddressDetails address={address} loading={loading} />;
};
