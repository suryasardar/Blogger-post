import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
// import BLOGLists from "./BLOGLists";

const Bcard = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 10px;
  padding: 20px;
  width: 300px;
`;

const Title = styled.h2`
  margin-bottom: 10px;
`;

const Image = styled.img`
  max-width: 100%;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 16px;
`;

const Short = ({setSelectedBlog}) => {
  const [Blist, setBlist] = useState([]);

  useEffect(() => {
    // Fetch data from the API using Axios
    axios.get("http://localhost:4000/api/user/getblog")
      .then(response => setBlist(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

    
  const handleImageClick = (uid) => {
    setSelectedBlog({
      isSelected: true,
      selectedId: uid
    }); // Set selectedBlog to true when image is clicked
  };
    
  return (
    <div>
      {Blist.map((food, index) => (
        <Bcard key={index}>
          
          <Title>{food.title}</Title>
          {/* <Link to={`/blogs/${food.uid}`}> */}
            <Image src={food.image} alt={food.title} onClick={handleImageClick(food.uid)} />
          {/* </Link> */}
          <Description>{food.shortDescription}</Description>
        </Bcard>
      ))}
    </div>
  );
};

export default Short;
