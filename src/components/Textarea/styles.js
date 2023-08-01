import styled from 'styled-components';

export const Conteiner = styled.textarea`
    width: 100%;
    height: 15rem;

    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
    color: ${({ theme }) => theme.COLORS.WHITE};

    border: none;
    resize: none;

    margin-bottom: 0.8rem;
    border-radius: 1rem;
    padding: 16px;

    &::placeholder {
        color: ${({ theme }) => theme.COLORS.GRAY_300};
    }
`;