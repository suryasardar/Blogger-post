import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

import { Link} from "react-router-dom";
// import BLOGLists from "./BLOGLists";
const Wrapper = styled.article`
  .container {
    position: relative;
    background: var(--clr-black);
    border-radius: var(--radius);
  }
  img {
    transition: var(--transition);
    max-width: 100%;
    border-radius: 8px;
    margin-bottom: 10px;
  }
  .link {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--clr-primary-5);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    transition: var(--transition);
    opacity: 0;
    cursor: pointer;
    svg {
      font-size: 1.25rem;
      color: var(--clr-white);
    }
  }
  .container:hover img {
    opacity: 0.5;
  }
  .container:hover .link {
    opacity: 1;
  }
  footer {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  footer h5,
  footer p {
    margin-bottom: 0;
    font-weight: 400;
  }

  footer p {
    color: var(--clr-primary-5);
    letter-spacing: var(--spacing);
  }
  // const Bcard = styled.div
`; 

const Short = () => {
  const [Blist, setBlist] = useState([]);
 
  useEffect(() => {
    // Fetch data from the API using Axios
    axios
      .get("http://localhost:4000/api/user/getblog")
      .then((response) => setBlist(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

   

  return (
    <div>
      {Blist.map(({ uid, title, image, shortDescription }, index) => (
        <Wrapper key={index}>
          <div className="container">
            <h2>{title}</h2>
            <div>
              <img src={image} alt={title} />
              <Link to={`/getblog/${uid}`} className="link">
                <FaSearch />
              </Link>
            </div>

            <p>{shortDescription}</p>
          </div>
        </Wrapper>
      ))}
    </div>
  );
};

export default Short;
