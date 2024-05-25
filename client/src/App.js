import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [personImage, setPersonImage] = useState(null);
  const [groupImages, setGroupImages] = useState([]);

  const handlePersonChange = (e) => setPersonImage(e.target.files[0]);
  const handleGroupChange = (e) => setGroupImages([...e.target.files]);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('person', personImage);
    groupImages.forEach((img, index) => formData.append(`group${index}`, img));

    const response = await axios.post('http://localhost:5000/api/remove-person', formData);
    console.log(response.data);
  };

  return (
    <div>
      <h1>Person Removal from Group Photos</h1>
      <input type="file" onChange={handlePersonChange} />
      <input type="file" multiple onChange={handleGroupChange} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;
