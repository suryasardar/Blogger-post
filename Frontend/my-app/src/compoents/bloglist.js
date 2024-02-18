import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import BLOGLists from "./LongBlog";
import Short from "./Short";

 
  

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

// const Bcard = styled.div`
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   margin: 10px;
//   padding: 20px;
//   width: 300px;
// `;

// const Title = styled.h2`
//   margin-bottom: 10px;
// `;

// const Image = styled.img`
//   max-width: 100%;
//   border-radius: 8px;
//   margin-bottom: 10px;
// `;

// const Description = styled.p`
//   font-size: 16px;
// `;

const BLOGList = () => {
    // const [Blist, setBlist] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState({
        isSelected: false,
        selectedId:''
   })
    // useEffect(() => {
    //   // Fetch data from the API using Axios
    //   axios.get('http://localhost:4000/get/posts')
    //       .then(response => setBlist(response.data))
    //       .catch(error => console.error('Error fetching data:', error));
        
    // }, []);
  
    // console.log(Blist);
    return (
        <Container>
            {
                selectedBlog ? <BLOGLists selectedId={selectedBlog.selectedId} />
                                        :
                                            <Short prop={setSelectedBlog} />
            }
        
      </Container>
    );
  };

export default BLOGList;


// {Blist.map((food, index) => (
//     <Bcard key={index}>
//           <BLOGLists uid={food.uid}/>

//     <Title>{food.title}</Title>
//     <Link to={`/blogs/${food.uid}`}>
//       <Image src={food.image} alt={food.title} />
//     </Link>
//     <Description>{food.shortDescription}</Description>
//   </Bcard>
// ))}
