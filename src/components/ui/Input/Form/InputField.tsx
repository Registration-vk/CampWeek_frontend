import { ComponentProps } from "react";
import { Control, FieldPath, FieldPathValue, FieldValues, useController } from "react-hook-form";

import Input from "@/components/ui/Input/input";

export interface InputFieldProps<
  TFieldsValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldsValues> = FieldPath<TFieldsValues>,
> {
  control: Control<TFieldsValues>;
  inputName: TFieldName;
  inputLabel: string;
  inputType?: ComponentProps<"input">["type"];
  readOnly?: boolean;
  type?: string;
  className?: string;
  defaultValue?: FieldPathValue<TFieldsValues, TFieldName>;
  handleChange?: () => void;
}

const InputField = <
  TFieldsValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldsValues> = FieldPath<TFieldsValues>,
>(
  props: InputFieldProps<TFieldsValues, TFieldName>,
) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name: props.inputName,
    control: props.control,
    defaultValue: props.defaultValue,
  });

  return (
    <Input
      label={props.inputLabel}
      type={props.inputType}
      // placeholder={props.inputLabel}
      readOnly={props.readOnly}
      error={error?.message}
      className={props.className}
      {...field}
    />
  );
};

export default InputField;
