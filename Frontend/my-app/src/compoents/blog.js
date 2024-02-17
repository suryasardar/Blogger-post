import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import axios from "axios";
import {useNavigate } from 'react-router-dom';


const FormContainer = styled.form`
display: flex;
flex-direction: column;
max-width: 500px;
margin: 0 auto;
`;

const FormGroup = styled.div`
margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
padding: 8px;
  font-size: 16px;
  width: 100%;
  `;
  
  const Textarea = styled.textarea`
  padding: 8px;
  font-size: 16px;
  width: 100%;
  min-height: 100px;
  `;
  
  const CharacterCount = styled.span`
  font-size: 12px;
  color: ${({ exceeded }) => (exceeded ? 'red' : 'inherit')};
  `;
  
  const ImagePreview = styled.img`
  max-width: 100%;
  margin-top: 10px;
  `;

  const BloggerPostForm = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  
  const [shortDescription, setShortDescription] = useState('');
  const [long, setlong] = useState('');
  const [summary, setSummary] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  
  const handleTitleChange = (e) => {
      if (e.target.value.length <= 10) {
      setTitle(e.target.value);
    }
};

const navigate = useNavigate();
const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    }
  };

  const handleShortDescriptionChange = (e) => {
    if (e.target.value.length <= 25) {
      setShortDescription(e.target.value);
    }
  };
  
  const handleLongdescription = (value) => {
      if (value.length <= 1000) {
          setlong(value);
        }
    };
    const handleSubmitcare = async (e) => {
    e.preventDefault();

    try {
      // Your form submission logic

      // Redirect to homepage after successful form submission
    
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };


  const handleSummaryChange = (value) => {
    if (value.length <= 30) {
      setSummary(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
    //   const { title, image, shortDescription, long, summary } = formData; // Assuming you have formData state to hold the form data
  
      // Make the POST request
      const response = await axios.post('http://localhost:4000/api/posts', {
        title,
        image,
        shortDescription,
        long,
        summary,
      });
  
      // Handle the response
      console.log('Post created:', response.data);
      // Optionally, you can redirect the user to another page or perform other actions
    } catch (error) {
      console.error('Error creating post:', error);
      // Handle error, show a message to the user, etc.
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormGroup>
        <Label>Title:</Label>
        <Input type="text" value={title} onChange={handleTitleChange} />
        <CharacterCount exceeded={title.length > 10}>{title.length}/10</CharacterCount>
      </FormGroup>
      <FormGroup>
        <Label>Image:</Label>
        <Input type="file" accept="image/*" onChange={handleImageChange} />
        {imagePreview && <ImagePreview src={imagePreview} alt="Preview" />}
      </FormGroup>
      <FormGroup>
        <Label>Short Description:</Label>
        <Textarea value={shortDescription} onChange={handleShortDescriptionChange}></Textarea>
        <CharacterCount exceeded={shortDescription.length > 25}>{shortDescription.length}/25</CharacterCount>
      </FormGroup>
      <FormGroup>
        <Label>long Description:</Label>
       <ReactQuill value={long} onChange={handleLongdescription} />

        <CharacterCount exceeded={long.length > 1000}>{long.length}/1000</CharacterCount>
      </FormGroup>
      <FormGroup>
        <Label>Summary:</Label>
        <ReactQuill value={summary} onChange={handleSummaryChange} />
        <CharacterCount exceeded={summary.length > 30}>{summary.length}/30</CharacterCount>
      </FormGroup>
          <button type="submit" onClick={handleSubmitcare}>Submit</button>
    </FormContainer>
  );
};
 
export default BloggerPostForm;
