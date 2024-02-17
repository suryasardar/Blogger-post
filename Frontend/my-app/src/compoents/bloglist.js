import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

 
  

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

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

const BLOGList = () => {
    const [Blist, setBlist] = useState([]);
  
    useEffect(() => {
      // Fetch data from the API using Axios
      axios.get('http://localhost:4000/get/posts')
          .then(response => setBlist(response.data))
          .catch(error => console.error('Error fetching data:', error));
        
    }, []);
  
    console.log(Blist);
    return (
      <Container>
        {Blist.map((food, index) => (
          <Bcard key={index}>
            <Title>{food.title}</Title>
            <Link to="/blogs">
                        <Image src={food.image} alt={food.title} />
                    </Link>
            <Description>{food.shortDescription}</Description>
          </Bcard>
        ))}
      </Container>
    );
  };

export default BLOGList;
