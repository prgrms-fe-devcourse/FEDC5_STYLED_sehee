import {
  ChangeEvent,
  FormEvent,
  useState,
  useEffect,
  useCallback,
} from 'react';
import type { Props } from './type';

const useForm = <T>({ initialState, callback, validate }: Props<T>) => {
  const [values, setValues] = useState<T>(initialState);
  const [errors, setErrors] = useState<Partial<T>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  }, []);

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (Object.keys(errors).length === 0 && callback) {
      const result = callback();

      if (result instanceof Promise) {
        await result;
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const newErrors = validate ? validate(values) : {};

    setErrors(newErrors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return {
    values,
    errors,
    isLoading,
    handleOnChange,
    handleOnSubmit,
  };
};

export default useForm;
