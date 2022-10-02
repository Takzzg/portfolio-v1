import styled from "styled-components";

const StyledIndex = styled.div`
	background-color: red;

	.mainCont {
		color: ${(props) => props.theme.text};
	}
`;

export default StyledIndex;
