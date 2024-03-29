"use client";

import { ElementType } from "react";
import { Control, FieldErrors, FieldValues, Path, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui";

import styles from "./styles.module.scss";

export interface WrappedComponentProps<TFieldsValues extends FieldValues = FieldValues> {
  control: Control<TFieldsValues>;
  errors: FieldErrors<FieldValues>;
}

export interface WithFormProps {
  formSubmittedCallback: (data: FieldValues) => void;
}

export interface WithFormSettingsProps {
  resolver: z.infer<z.Schema<any, any>>;
  buttonText?: string;
}

const withForm =
  <FormFields extends FieldValues = FieldValues>(
    WrappedComponent: ElementType,
    { resolver, buttonText = "Отправить" }: WithFormSettingsProps,
  ) =>
  // eslint-disable-next-line react/display-name
  (props: WithFormProps) => {
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm<FormFields>({
      resolver: zodResolver(resolver),
    });

    const onSubmit = async (data: FieldValues) => {
      props.formSubmittedCallback(data);
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <WrappedComponent errors={errors} control={control} />
        <Button type={"submit"} variant="mobile" className={styles.button}>
          {buttonText}
        </Button>
      </form>
    );
  };

export default withForm;
