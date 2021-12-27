import { Alert, Box, Button, CircularProgress } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import InputField from 'components/FormFields/InputField';
import RadioGroupField from 'components/FormFields/RadioGroupField';
import SelectField from 'components/FormFields/SelectField';
import { selectCityOptions } from 'features/city/citySlice';
import { Student } from 'models';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export interface StudentProps {
  initialValues?: Student;
  onSubmit?: (formValues: Student) => void;
}

const schema = yup
  .object({
    name: yup
      .string()
      .required('Please enter name.')
      .test('twoWords', 'Please enter at least two words', (value) => {
        if (!value) return true;
        const parts = value?.split(' ') || [];
        return parts.filter((x) => !!x).length >= 2;
      }),
    age: yup
      .number()
      .positive('Please enter a positive number.')
      .min(18, 'Min is 18')
      .max(60, 'Max is 60')
      .integer('Please enter an integer.')
      .required('Please enter age.')
      .typeError('Please enter a valid number'),
    mark: yup
      .number()
      .positive('Please enter a positive number.')
      .min(0, 'Min is 0')
      .max(10, 'Max is 10')
      .required('Please enter mark.')
      .typeError('Please enter a valid number'),
    gender: yup
      .string()
      .oneOf(['male', 'female'], 'Please select either male or female.')
      .required('Please select gender.'),
    city: yup.string().required('Please select city.'),
  })
  .required();

export default function StudentForm({ initialValues, onSubmit }: StudentProps) {
  const cityOptions = useAppSelector(selectCityOptions);
  const [error, setError] = useState<string>('');
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Student>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (formValues: Student) => {
    try {
      setError('');
      await onSubmit?.(formValues);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="name" control={control} label="Full Name" />
        <RadioGroupField
          name="gender"
          control={control}
          label="Gender"
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ]}
        />
        <InputField name="age" control={control} type="number" label="Age" />
        <InputField name="mark" control={control} type="number" label="Mark" />
        {Array.isArray(cityOptions) && cityOptions.length > 0 && (
          <SelectField
            name="city"
            control={control}
            label="City"
            options={cityOptions}
          />
        )}
        {error && <Alert severity="error">{error}</Alert>}

        <Box mt={3}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting && <CircularProgress size="16" />} Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
