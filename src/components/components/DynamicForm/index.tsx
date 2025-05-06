import { useState, useEffect, useMemo } from 'react';
import { t } from 'i18next';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import CheckboxInput from './CheckBoxInput';
import Button from '../../Button';

import './style.scss';

export enum IDynamicFormTypes {
  TEXT = 'text',
  NUMBER = 'number',
  URL = 'url',
  EMAIL = 'email',
  TEXTAREA = 'textarea',
  SELECT = 'select',
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
  UPLOAD = 'upload',
  DATE = 'date',
  PASSWORD = 'password',
  COLOR = 'color',
}

export interface IDynamicForm {
  fields: Record<
    string,
    {
      id: string;
      label: string;
      type: IDynamicFormTypes;
      multipleSelection?: boolean;
      value?: any;
      placeholder?: string;
      validations?: Array<{
        validator: string;
        value?: any;
        message: string;
      }>;
      options?: Array<{ label: string; value: any }>;
    }
  >;
  className?: string;
  onSubmit: (values: any) => void;
  submitText?: string;
  disabled?: boolean;
  title?: string;
  hasSections?: boolean;
}

const DynamicForm = (props: IDynamicForm) => {
  const { fields, className, onSubmit, submitText, ...rest } = props;
  const [formData, setFormData] = useState<Record<string, string>>({});

  const [validationSchema, setValidationSchema] = useState<any>({});

  const filteredFields: any = useMemo(() => {
    const data: IDynamicForm['fields'] = {};
    Object.keys(fields).forEach((key) => {
      // eslint-disable-next-line no-unused-vars
      const { id, label, type, placeholder, options } = fields[key];
      data[key] = { id, label, type, placeholder, options };
      // data[key] = fields[key]
    });
    return data;
  }, [fields]);

  const initializeForm = (fields: IDynamicForm['fields']) => {
    const validationSchema: any = {};
    const formData: Record<string, string> = {};

    for (const key of Object.keys(fields)) {
      const { type, validations, value } = fields[key];
      formData[key] = value ?? '';

      if (type === 'text') {
        validationSchema[key] = Yup.string();
      } else if (type === 'email') {
        validationSchema[key] = Yup.string();
      } else if (type === 'textarea') {
        validationSchema[key] = Yup.string();
      } else if (type === 'select') {
        validationSchema[key] = Yup.string();
      } else if (type === 'radio') {
        validationSchema[key] = Yup.string();
      } else if (type === 'checkbox') {
        validationSchema[key] = Yup.string();
      } else if (type === 'upload') {
        validationSchema[key] = Yup.string();
      } else if (type === 'date') {
        validationSchema[key] = Yup.date();
      } else if (type === 'number') {
        validationSchema[key] = Yup.number();
      } else if (type === 'url') {
        validationSchema[key] = Yup.string().url();
      } else {
        validationSchema[key] = Yup.string();
      }

      validations?.forEach((validator) => {
        const { message, validator: name, value } = validator;

        const msgKey = 'df-validation-' + name;
        const msg = message
          ? message
          : value
          ? t(msgKey, { value })
          : t(msgKey);

        // string validations
        if (name === 'required') {
          validationSchema[key] = validationSchema[key].required('Required');
        } else if (name === 'min') {
          validationSchema[key] = validationSchema[key].min(value, msg);
        } else if (name === 'max') {
          validationSchema[key] = validationSchema[key].max(value, msg);
        } else if (name === 'length') {
          validationSchema[key] = validationSchema[key].length(value, msg);
        } else if (name === 'email') {
          validationSchema[key] = validationSchema[key].email(msg);
        } else if (name === 'includes') {
          validationSchema[key] = validationSchema[key].includes(value, msg);
        } else if (name === 'startsWith') {
          validationSchema[key] = validationSchema[key].startsWith(value, msg);
        } else if (name === 'endsWith') {
          validationSchema[key] = validationSchema[key].endsWith(value, msg);
        } else if (name === 'regex') {
          validationSchema[key] = validationSchema[key].matches(value, msg);
        } else if (name === 'gt') {
          validationSchema[key] = validationSchema[key].gt(value, msg);
        } else if (name === 'gte') {
          validationSchema[key] = validationSchema[key].gte(value, msg);
        } else if (name === 'lt') {
          validationSchema[key] = validationSchema[key].lt(value, msg);
        } else if (name === 'positive') {
          validationSchema[key] = validationSchema[key].positive(msg);
        } else if (name === 'nonnegative') {
          validationSchema[key] = validationSchema[key].nonnegative(msg);
        } else if (name === 'negative') {
          validationSchema[key] = validationSchema[key].negative(msg);
        } else if (name === 'nonpositive') {
          validationSchema[key] = validationSchema[key].nonpositive(msg);
        } else if (name === 'multipleOf') {
          validationSchema[key] = validationSchema[key].multipleOf(value, msg);
        }
      });

      setFormData(formData);
      setValidationSchema(Yup.object().shape({ ...validationSchema }));
    }
  };

  const getFormElement = (name: string, schema: any) => {
    const { type } = schema;

    const isText =
      type === 'text' ||
      type === 'email' ||
      type === 'textarea' ||
      type === 'number' ||
      type === 'password';

    const inputProps = {
      name,
      ...schema,
    };
    if (isText) {
      return <TextInput {...inputProps} />;
    }
    if (type === 'select') {
      return <SelectInput {...inputProps} />;
    }
    if (type === 'checkbox') {
      return <CheckboxInput {...inputProps} />;
    }
  };

  const handelFormSubmit = (values: any, { setSubmitting }: any): any => {
    onSubmit(values);
    setSubmitting(false);
  };

  useEffect(() => {
    initializeForm(fields);
  }, [fields]);

  return (
    <Formik
      {...rest}
      enableReinitialize
      initialValues={formData}
      validationSchema={validationSchema}
      onSubmit={handelFormSubmit}
    >
      {({ errors, touched, dirty }) => (
        <Form
          noValidate={true}
          className={`bdm-dynamic-form  ${className ? className : ''} `.trim()}
        >
          {Object.keys(formData).map((key) => {
            return (
              <div key={key}>
                {getFormElement(key, {
                  ...filteredFields[key],
                  error: errors[key],
                  touched: touched[key],
                })}
              </div>
            );
          })}
          <div className="bdm-dynamic-form__actions">
            <Button
              title={submitText || 'ذخیره'}
              type="submit"
              disabled={!dirty}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default DynamicForm;
