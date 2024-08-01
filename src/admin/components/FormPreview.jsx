import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ReactFormGenerator } from 'react-form-builder2';
import 'react-form-builder2/dist/app.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const FormPreview = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [fieldLabels, setFieldLabels] = useState({});

  useEffect(() => {
    const storedEvents = JSON.parse(sessionStorage.getItem('events'));
    const foundEvent = storedEvents.find((event) => event.id === parseInt(id, 10));
    if (foundEvent && foundEvent.eventTemplate) {
      const parsedTemplate = JSON.parse(foundEvent.eventTemplate);
      console.log(parsedTemplate);
      setFormData(parsedTemplate || []);
      
      // Build a fieldLabels map from formData
      const labels = parsedTemplate.reduce((acc, field) => {
        acc[field.name] = field.label; // Adjust this if the label is under a different property
        return acc;
      }, {});
      setFieldLabels(labels);
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form submitted with values:", formValues);
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/event/${id}`, {
        formData: formValues,
        modeOfRegistration: "UPLOADED",
      });
      console.log(res);
      if (res.data.statusCode === 201) {
        toast.success(res.data.message);
      } else {
        toast.error('Failed to submit form. Please try again.');
      }
    } catch (error) {
      console.error('Failed to submit form', error);
      toast.error(error.response.data.message);
    }
  };

  const handleChange = (data) => {
    // Map the data to include full item details along with labels and values
    const updatedFormValues = data.map((item) => ({
      ...item,
      value: item.value,
      label: fieldLabels[item.name] || 'Unknown Label', // Add label from fieldLabels
    }));
    setFormValues(updatedFormValues);
  };

  return (
    <div>
      <ReactFormGenerator
        form_action=""
        form_method=""
        data={formData}
        onChange={handleChange}
        submitButton={<button type="button" onClick={handleSubmit}>Submit Form</button>} 
      />
      <ToastContainer />
    </div>
  );
};

export default FormPreview;
