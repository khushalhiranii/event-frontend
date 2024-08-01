// src/components/FormPreview.js
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

  useEffect(() => {
    const storedEvents = JSON.parse(sessionStorage.getItem('events'));
    const foundEvent = storedEvents.find((event) => event.id === parseInt(id, 10));
    if (foundEvent && foundEvent.eventTemplate) {
      const parsedTemplate = JSON.parse(foundEvent.eventTemplate);
      setFormData(parsedTemplate || []);
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      console.log("Form submitted with values:", formValues);
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/event/${id}`, { formValues, modeOfRegistration: "UPLOADED" });
      console.log(res)
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
    const updatedFormValues = data.reduce((acc, item) => {
      acc[item.name] = item.value;
      return acc;
    }, {});
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
