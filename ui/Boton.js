import styled from "@emotion/styled";

const Boton = styled.a`
  font-weight: 700;
  text-transform: uppercase;
  border: 1px solid var(--gris3);
  padding: 0.8rem 2rem;
  margin-right: 1rem;
  background-color: ${props => props.bgColor ? '#DA552F'  : 'white'};
  color: ${props => props.bgColor ? 'white' : '#000'};
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  gap: 10px;
  
  &:last-of-type {
    margin-right: 0;
  }
  
  &:hover {
    cursor: pointer;
}`

export default Boton;