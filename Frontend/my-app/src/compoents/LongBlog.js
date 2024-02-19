import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate,useParams } from 'react-router-dom';
// import Short from './Short';
// import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 24px;
  text-align: center;
  margin-top: 20px;
`;

const Image = styled.img`
  max-width: 80%;
  height: auto;
  margin: 20px auto;
`;

const Description = styled.p`
  font-size: 16px;
  text-align: center;
`;

const LongDescription = styled.p`
  font-size: 16px;
  text-align: center;
  max-width: 80%;
  margin: 20px auto;
`;

const Summary = styled.p`
  font-size: 16px;
  text-align: center;
`;

const BLOGLists = ()  => {
  const [Blist, setBlist] = useState([]);
  const { uid } = useParams();

  // const navigate = useNavigate();
  // if (!selectedId) {
  //   navigate('/blogs');
  // }
  
    useEffect(() => {
        // Fetch data from the API using Axios
        console.log("long");
        axios.get(`http://localhost:4000/api/user/getblog/${uid}`)
          .then(response => setBlist(response.data))
          .catch(error => console.error('Error fetching data:', error));
    }, []); // Make sure to include selectedId in the dependency array
  
    console.log("long");

    return (
        <Container>
            {Blist.map((food, index) => (
                <div key={index}>
                    <Title>{food.title}</Title>
                    <Image src={food.image} alt={food.title} />
                    <LongDescription>{food.long}</LongDescription>
                    <Summary>{food.summary}</Summary>
                </div>
            ))}
        </Container>
    );
};

export default BLOGLists;
