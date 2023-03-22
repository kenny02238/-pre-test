import { ChangeEventHandler, useState } from 'react';

type ValidatorFn<T> = (value: T) => boolean;

type ValidationResult<T> = {
  [P in keyof T]?: {
    valid: boolean;
    error?: string;
  };
};
type FormValidation<T> = {
  allFieldsValid: () => boolean;
} & ValidationResult<T>;

type FormSetter<T> = {
  [P in keyof T]: ChangeEventHandler<HTMLInputElement>;
};

export function useForm<T extends Record<string, any>>(
  initialData: T,
  validationRules: { [P in keyof T]: ValidatorFn<T[P]> }
) {
  const [formData, setFormData] = useState(initialData);
  const [validationResult, setValidationResult] = useState<FormValidation<T>>({
    allFieldsValid: () => false,
    ...Object.fromEntries(
      Object.keys(initialData).map((fieldName) => [fieldName, { valid: false }])
    ),
  } as FormValidation<T>);
  //驗證各個欄位
  const validateField = (fieldName: keyof T, value: T[keyof T]) => {
    const validator = validationRules[fieldName];
    if (!validator) {
      return;
    }
    const isValid = validator(value);
    const newValidationResult = {
      ...validationResult,
      [fieldName]: {
        valid: isValid,
        error: isValid ? undefined : `${String(fieldName)} 未通過驗證`,
      },
    };
    const allFieldsValid = Object.entries(newValidationResult).every(
      ([key, value]) => typeof value === 'function' || value?.valid
    );

    const updatedValidationResult = {
      ...newValidationResult,
      allFieldsValid: () => allFieldsValid,
    };
    setValidationResult(updatedValidationResult);
  };

  //透過外圍onChange拿到當下的值並且做處理
  const formSetter: FormSetter<T> = {} as FormSetter<T>;
  Object.keys(initialData).forEach((fieldName) => {
    const typedFieldName = fieldName as keyof T;
    formSetter[typedFieldName] = (event: T[keyof T]) => {
      console.log(typeof event.target.value);
      setFormData((prevFormData) => ({
        ...prevFormData,
        [typedFieldName]: event.target.value,
      }));
      validateField(typedFieldName, event.target.value);
    };
  });

  return [formData, formSetter, validationResult] as const;
}
