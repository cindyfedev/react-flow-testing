import { useFormContext } from "react-hook-form";

export const Button = () => {
  const { handleSubmit, getFieldState, getValues } = useFormContext();

  // if user didn't adjust the regisered input then it will be undefined !
  return (
    <button
      onClick={() => {
        const values = getValues();
        console.log(values, "what is values in button ");
      }}
    >
      {" "}
      Submit{" "}
    </button>
  );
};
