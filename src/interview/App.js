import React, { useState } from 'react';
import './style.css';

const getError = (validator, value) => {
  if (!validator) return '';

  let error = '';

  if (validator.required && !value) error = 'Field is Required!';

  // const customValidator = validator.validatorFunc;

  // error = customValidator(value);

  return error;
};

const MultiStepForm = ({ formData }) => {
  const [currStep, setCurrStep] = useState(0);
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});

  const stepsData = formData.steps;
  const title = stepsData[currStep].title;
  const currStepFields = stepsData[currStep].fields;

  // render UI elements
  // handle prev,next, submit
  // validation

  const validateCurrStep = () => {
    let currErrors = {};

    currStepFields.forEach((field) => {
      const error = getError(field.validation, formValues[field.name]);
      if (error) {
        currErrors[field.name] = error;
      }
    });

    setErrors(currErrors);

    return Object.keys(currErrors).length === 0;
  };

  const handleFieldChange = (event, fieldName) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [fieldName]: event.target.value,
    }));

    // const error = getError()
  };

  const handleNext = () => {
    const errorValidation = validateCurrStep();
    if (errorValidation) {
      setCurrStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    // validation

    const errorValidation = validateCurrStep();
    if (errorValidation) {
      alert('form submitted successfully!');
      console.log('formValues======', formValues);
    }
  };

  return (
    <>
      <h1>{title}</h1>
      {currStepFields.map((field, index) => (
        <div key={`${field.name}_${index}`}>
          <label>
            {field.label}
            <input
              type={field.type}
              value={formValues[field.name]}
              onChange={(e) => handleFieldChange(e, field.name)}
            />
          </label>
          {errors[field.name] && (
            <div style={{ color: 'red' }}>{errors[field.name]}</div>
          )}
        </div>
      ))}

      <div>
        {currStep > 0 && <button onClick={handlePrevious}> Previous </button>}
        {currStep < stepsData.length - 1 ? (
          <button onClick={handleNext}> Next </button>
        ) : (
          <button onClick={handleSubmit}> Submit </button>
        )}
      </div>
    </>
  );
};

const formData = {
  steps: [
    {
      title: 'Personal Details',
      fields: [
        {
          name: 'firstName',
          label: 'First Name',
          type: 'text',
          validation: { required: true },
        },
        {
          name: 'lastName',
          label: 'Last Name',
          type: 'text',
          validation: { required: true },
        },
      ],
    },
    {
      title: 'Account Details',
      fields: [
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          validation: { required: true },
        },
        {
          name: 'password',
          label: 'Password',
          type: 'password',
          validation: { required: true },
        },
      ],
    },
  ],
};

export default function App() {
  return <MultiStepForm formData={formData} />;
}

// JSON struct
/*
formData = {
  steps: [
    {
      title: 'Personal Details
      fields: [{
        name: "email"
      }]
    },

  ]
}
*/
