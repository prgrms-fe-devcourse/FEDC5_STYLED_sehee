import { ChangeEvent, FormEvent, useState } from 'react';
import type { Props } from './type';

const useForm = <T>({ initialState, callback, validate }: Props<T>) => {
  const [values, setValues] = useState<T>(initialState);
  const [errors, setErrors] = useState<Partial<T>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const newErrors = validate ? validate(values) : {};

    if (Object.keys(newErrors).length === 0 && callback) {
      const result = callback();

      if (result instanceof Promise) {
        await result;
      }
    }

    setErrors(newErrors);
    setIsLoading(false);
  };

  return {
    values,
    errors,
    isLoading,
    handleOnChange,
    handleOnSubmit,
  };
};

export default useForm;
