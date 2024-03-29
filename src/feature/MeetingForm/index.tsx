import { useRef, useState } from "react";
import { useController } from "react-hook-form";

import { InputField, MultipleSelectField, SingleSelectField } from "@/components/ui/form";
import { withForm, WrappedComponentProps } from "@/core/hoc";

import { schema } from "./schema";
import { opinionLeaders, optionsRoles, regions } from "./static";

import classes from "./styles.module.scss";

export function Index(props: WrappedComponentProps) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <section className={classes.meetingForm}>
      <InputField
        control={props.control}
        inputName={"meetingName"}
        inputLabel={"Название мероприятия"}
        defaultValue={""}
      />
      <InputField
        control={props.control}
        inputName={"meetingLink"}
        inputLabel={"Постоянная ссылка"}
        readOnly={false}
        defaultValue={"https://campweek.aozol.ru/"}
      />

      <InputField
        control={props.control}
        inputName={"meetingDate"}
        inputLabel={"Дата мероприятия"}
        inputType={"date"}
        defaultValue={""}
      />
      <InputField
        control={props.control}
        inputName={"meetingStart"}
        inputLabel={"Время начала"}
        inputType={"time"}
        defaultValue={""}
      />
      <InputField
        control={props.control}
        inputName={"meetingEnd"}
        inputLabel={"Время окончания"}
        inputType={"time"}
        defaultValue={""}
      />

      <InputField
        control={props.control}
        inputName={"meetingAddLink"}
        inputLabel={"Ссылка на доп.регистрацию"}
        defaultValue={""}
        readOnly={false}
      />
      {/* <InputField
          control={props.control}
          inputName={"isRegNeeded"}
          inputLabel={"Требуется регистрация"}
          inputType={"checkbox"}
          defaultValue={false}
          // {...props.control.register("isRegNeeded", {
          //   onChange: (e) => setIsChecked(e.target.value),
          // })}
          // ref={null}
        /> */}

      <InputField
        control={props.control}
        inputName={"meetingDsc"}
        inputLabel={"Короткое описание"}
        defaultValue={""}
        inputType={"textarea"}
        className={classes.textarea}
      />
      <InputField
        control={props.control}
        inputName={"meetingAddInfo"}
        inputLabel={"Дополнительная информация"}
        defaultValue={""}
        inputType={"textarea"}
      />

      <SingleSelectField
        control={props.control}
        defaultValue={"Онлайн"}
        selectName={"meetingLocation"}
        selectLabel={"Локация"}
        selectOptions={regions}
      />
      <MultipleSelectField
        control={props.control}
        selectName={"meetingTarget"}
        selectLabel={"Целевая аудитория"}
        selectOptions={optionsRoles}
      />

      <InputField
        control={props.control}
        inputName={"meetingSpeakerInfo"}
        inputLabel={"Регалии спикера"}
        defaultValue={""}
      />
      <InputField
        control={props.control}
        inputName={"meetingNotes"}
        inputLabel={"Заметки (для админа)"}
        defaultValue={""}
      />
    </section>
  );
}

export default withForm(Index, {
  resolver: schema,
  buttonText: "Создать мероприятие",
});
