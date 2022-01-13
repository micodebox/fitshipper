import { Formik, FormikHelpers } from "formik";
import { AddressBody } from "../../app/shared/addressView/AddressView.types";
import { AddressFreeFormViewBody, AddressFreeFormViewProps } from "./AddressFreeFormView.types";

export const AddressFreeFormView = ({ address, onSubmit: onSubmitProps }: AddressFreeFormViewProps) => {
  const onSubmit = async (values: AddressFreeFormViewBody, actions: FormikHelpers<AddressFreeFormViewBody>) => {
    try {
      const valuesSplit = values.fullAddress?.split('\n');
      if (!valuesSplit || valuesSplit?.length < 3) {
        throw new Error();
      }
  
      const name = valuesSplit[0];
      const address1 = valuesSplit[1];
      const city = valuesSplit[2].split(', ')[0];
      const state = valuesSplit[2].split(', ')[1]?.split(' ')[0];
      const zip = valuesSplit[2].split(', ')[1]?.split(' ')[1];
  
      if (
        !name
        || !address1
        || !city
        || !state
        || !zip
        || name === ''
        || address1 === ''
        || city === ''
        || state === ''
        || zip === ''
        || parseInt(zip, 10) === 0
      ) {
        throw new Error();
      }
  
      const address: AddressBody = {
        name,
        address1,
        city,
        state,
        zip: parseInt(zip, 10),
      };

      await onSubmitProps?.(address);
    } catch (error) {
      actions.setErrors({ fullAddress: 'Invalid format!' });
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div>
      <Formik<AddressFreeFormViewBody>
        initialValues={{
          fullAddress: address ? `${address?.name || ''}\n${address?.address1 || ''} ${address?.address2 || ''}\n${address?.city || ''}, ${address?.state || ''} ${address?.zip || ''}` : '',
        }}
        onSubmit={onSubmit}
      >
        {({ isValid, isSubmitting, handleSubmit, handleChange, values, errors }) => (
          <form onSubmit={handleSubmit}>
            <label htmlFor="full-address">
              <div>Address (free-form)</div>
              <div className="text-sm text-gray-500">Copy & paste the full address</div>
            </label>
            <textarea
              id="full-address"
              name="fullAddress"
              required
              rows={4}
              className="mt-2 w-full rounded px-2 border-2 active:border-blue-500"
              value={values.fullAddress}
              onChange={handleChange}
            />
            {errors.fullAddress && <div className="text-sm text-red-500">{errors.fullAddress}</div>}
            <button
              type="submit"
              className={`w-full btn-primary mt-2 ${(!isValid || isSubmitting) ? 'btn-blue-200 hover:btn-blue-200 cursor-not-allowed' : ''}`}
              disabled={!isValid || isSubmitting}
            >Save Address</button>
          </form>
        )}
      </Formik>
    </div>
  );
}
