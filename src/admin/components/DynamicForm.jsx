import React, { useEffect, useState } from 'react'
import { ReactFormGenerator } from 'react-form-builder2';

function DynamicForm({formTemplate}) {
    const [formData, setFormData] = useState([]);

    useEffect(() => {
        // Ensure jQuery is available globally if needed
        // (window as any).$ = $;
        // (window as any).jQuery = $;
     
     
        // Load saved form data from local storage on initial load
        const savedFormData = formTemplate;
        if (savedFormData) {
          const formData2 = JSON.parse(savedFormData);
          console.log(formData2);
          setFormData(formData2 || []);
        }
      }, []);
     
  return (
    <div>
    <ReactFormGenerator
       form_action=""
       form_method=""
       data={formData}
       submitButton={<button >Submit Form</button>}
     />


     
   </div>
  )
}

export default DynamicForm