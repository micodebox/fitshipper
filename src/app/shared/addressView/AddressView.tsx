import { useState } from "react"
import { useHistory } from "react-router-dom";
import { AddressFieldView } from "../../../components/addressFieldsView/AddressFieldView";
import { AddressFreeFormView } from "../../../components/addressFreeFormView/AddressFreeFormView";
import { AddressViewProps } from "./AddressView.types";

export const AddressView = ({ address, loading = false, onSubmit }: AddressViewProps) => {
  const { goBack } = useHistory();
  const [isFieldView, setIsFieldView] = useState(false);

  return (
    <div className="w-full">
      {loading && (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
        </div>
      )}
      <div className="flex justify-between mb-2">
        <button className="btn-secondary" onClick={goBack}>Go Back</button>
        <button className="btn-third" onClick={() => setIsFieldView(!isFieldView)}>
          Switch to {isFieldView ? 'Freeform' : 'Fields'}
        </button>
      </div>
      <div className="border p-4">
        {isFieldView && (
          <AddressFieldView address={address} onSubmit={onSubmit} />
        )}
        {!isFieldView && (
          <AddressFreeFormView address={address} onSubmit={onSubmit} />
        )}
      </div>
    </div>
  );
}
