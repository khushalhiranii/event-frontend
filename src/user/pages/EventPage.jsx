import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ReactFormGenerator } from 'react-form-builder2';
import 'react-form-builder2/dist/app.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const EventPage = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [fieldLabels, setFieldLabels] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/event/${id}`); // Adjust this URL to your backend endpoint
        console.log(`responses ${response}`)
        const foundEvent = response.data;
        console.log(`found event ${foundEvent}`)
        if (foundEvent && foundEvent.eventTemplate) {
          const parsedTemplate = JSON.parse(foundEvent.eventTemplate);
          setFormData(parsedTemplate);

          // Build a fieldLabels map from formData
          const labels = parsedTemplate.reduce((acc, field) => {
            acc[field.id] = field.label; // Map field id to label
            return acc;
          }, {});
          setFieldLabels(labels);
        }
      } catch (error) {
        console.error('Failed to fetch event', error);
      } finally {
        setLoading(false); // Set loading to false after data fetch
      }
    };

    fetchEvent();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form submitted with values:", JSON.stringify(formValues));
      const res = await axios.post(`/event/${id}`, {
        formValues: JSON.stringify(formValues),
        modeOfRegistration: "ONSITE",
      });
      console.log(res);
      if (res.data.statusCode === 201) {
        toast.success(res.data.message);
      } else {
        toast.error('Failed to submit form. Please try again.');
      }
    } catch (error) {
      console.error('Failed to submit form', error);
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };

  const handleChange = (data) => {
    const updatedFormValues = data.reduce((acc, item) => {
      acc[item.id] = {
        ...item,
        value: item.value,
        label: fieldLabels[item.id] || 'Unknown Label',
      };
      return acc;
    }, {});
    setFormValues(updatedFormValues);
  };

  if (loading) {
    return <p>Loading...</p>; // Show a loading indicator while fetching data
  }

  return (
    <div>
      {formData.length > 0 ? (
        <ReactFormGenerator
          form_action=""
          form_method=""
          data={formData}
          onChange={handleChange}
          submitButton={<button type="button" onClick={handleSubmit}>Submit Form</button>}
        />
      ) : (
        <p>No form data available.</p>
      )}
      <ToastContainer />
    </div>
  );
};

export default EventPage;