import { ReactChild, useCallback, useState } from "react";
import { AxiosResponse } from "axios";

type Field<T> = {
  label: string;
  type: "text" | "password" | "textarea";
  key: keyof T;
};

type useFormOptions<T> = {
  initFormData: T;
  fields: Field<T>[];
  buttons: ReactChild;
  submit: {
    request: (formData: T) => Promise<AxiosResponse<T>>;
    message: string;
  };
};

export function useForm<T>(options: useFormOptions<T>) {
  const { initFormData, fields, buttons, submit } = options;
  // 非受控
  const [formData, setFormData] = useState(initFormData);
  const [errors, setErrors] = useState(() => {
    // e的类型为对象， 对象里面为数组，数组里面的key/value均为string
    // in keyof 指 k 为 T 的所有下标的类型相同
    const e: { [k in keyof T]?: string[] } = {};
    for (let key in initFormData) {
      if (initFormData.hasOwnProperty(key)) {
        e[key] = [];
      }
    }
    return e;
  });

  const onChange = useCallback(
    (key: keyof T, value: any) => {
      // 由于serFormData中需要用到formData的即时值，
      // 所以 useCallback 需要监听formData的变化
      setFormData({
        ...formData,
        [key]: value,
      });
    },
    [formData]
  );
  const _onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      submit.request(formData).then(
        () => {
          window.alert(submit.message);
        },
        (error) => {
          if (error.response) {
            const response: AxiosResponse = error.response;
            if (response.status === 422) {
              setErrors(response.data);
            }
          }
          console.log(error.response);
        }
      );
    },
    [submit, formData]
  );

  const form = (
    <form onSubmit={_onSubmit}>
      {fields.map((field) => (
        <div>
          <label>
            {field.label}
            {field.type === "textarea" ? (
              <textarea onChange={(e) => onChange(field.key, e.target.value)}>
                {formData[field.key]}
              </textarea>
            ) : (
              <input
                type={field.type}
                value={formData[field.key].toString()}
                onChange={(e) => onChange(field.key, e.target.value)}
              />
            )}
          </label>
          {errors[field.key]?.length > 0 && (
            <div>{errors[field.key].join(",")}</div>
          )}
        </div>
      ))}
      <div>{buttons}</div>
    </form>
  );
  return {
    form,
    setErrors,
  };
}
