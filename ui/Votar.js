import styled from "@emotion/styled";

const Votar = styled.button`
  font-weight: 700;
  text-transform: uppercase;
  border: none;
  //padding: 0.8rem 2rem;
  margin-right: 1rem;
  background-color: ${props => props.bgColor ? '#DA552F'  : 'white'};
  color: ${props => props.bgColor ? 'white' : '#000'};
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  
  &:last-of-type {
    margin-right: 0;
  }
  
  &:hover {
    cursor: pointer;
}`

export default Votar;