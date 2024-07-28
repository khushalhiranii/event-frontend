// src/components/EventDetails.js
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ReactFormGenerator } from 'react-form-builder2';
import 'react-form-builder2/dist/app.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EventContext } from '../context/EventContext';
import axios from 'axios';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events } = useContext(EventContext);
  const [event, setEvent] = useState(null);
  const [formData, setFormData] = useState([]);
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    const foundEvent = events.find((e) => e.id === parseInt(id, 10));
    if (foundEvent) {
      setEvent(foundEvent);
    }
  }, [id, events]);

  useEffect(() => {
    if (event && event.eventTemplate) {
      const parsedTemplate = JSON.parse(event.eventTemplate);
      setFormData(parsedTemplate || []);
    }
  }, [event]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      console.log("Form submitted with values:", formValues); 
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/event/${id}`, { formValues });
      if(res) {
        console.log(res);
        toast.success('Form submitted successfully!');
      }
    } catch (error) {
      console.error('Failed to register for event', error);
      toast.error('Failed to submit form. Please try again.');
    }
  };

  const handleChange = (data) => {
    const updatedFormValues = data.reduce((acc, item) => {
      acc[item.custom_name] = item.value;
      return acc;
    }, {});
    console.log(updatedFormValues, "<<<<values<");
    setFormValues(updatedFormValues);
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ReactFormGenerator
        form_action=""
        form_method=""
        data={formData}
        onChange={(values) => handleChange(values)}
        submitButton={<button type="button" onClick={handleSubmit}>Submit Form</button>} 
      />
      <ToastContainer />
    </div>
  );
};

export default EventDetails;
