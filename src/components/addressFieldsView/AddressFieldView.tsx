import { Formik, FormikHelpers } from "formik";
import { STATES } from "../../constants";
import { AddressFieldViewBody, AddressFieldViewProps } from "./AddressFieldView.types";

export const AddressFieldView = ({
  address,
  onSubmit: onSubmitProps,
}: AddressFieldViewProps) => {
  const onSubmit = async (values: AddressFieldViewBody, actions: FormikHelpers<AddressFieldViewBody>) => {
    try {
      if (onSubmitProps) {
        await onSubmitProps(values);
      }
      
      actions.setSubmitting(false);
    } catch (error) {
      actions.setSubmitting(false);
    }
  };

  return (
    <div>
      <Formik<AddressFieldViewBody>
        initialValues={{
          name: '',
          address1: '',
          address2: '',
          city: '',
          state: STATES[0].short,
          zip: 0,
          ...address
        }}
        onSubmit={onSubmit}
      >
        {({ isValid, isSubmitting, handleSubmit, values, handleChange }) => (
          <form onSubmit={handleSubmit}>
            <input type="hidden" value={values.id} />
            <div className="mb-2">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                required
                className="mt-2 w-full rounded px-2 border-2 active:border-blue-500"
                value={values.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="address">Address</label>
              <input
                id="address"
                name="address1"
                required
                className="w-full rounded px-2 border-2 active:border-blue-500"
                value={values.address1}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="address2">Address 2</label>
              <input
                id="address2"
                name="address2"
                className="w-full rounded px-2 border-2 active:border-blue-500"
                value={values.address2}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="city">City</label>
              <input
                id="city"
                name="city"
                required
                className="w-full rounded px-2 border-2 active:border-blue-500"
                value={values.city}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="state">State</label>
              <select
                id="state"
                name="state"
                required
                className="w-full rounded px-2 border-2 active:border-blue-500"
                value={values.state}
                onChange={handleChange}
              >
                {STATES.map((state) => (
                  <option key={state.short} value={state.short}>
                    {state.short}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <label htmlFor="address">Zip</label>
              <input
                id="address"
                type="number"
                name="zip"
                required
                className="w-full rounded px-2 border-2 active:border-blue-500"
                value={values.zip}
                onChange={handleChange}
              />
            </div>
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
};
