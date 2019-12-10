import React from 'react';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';

export default function TestSemantic() {
    return (
        <ButtonWrapper
            className="back-to-docs"
            content="Like"
            icon={(Component, componentProps) => <Component {...componentProps} color="red" name="like" />}
        />
    );
}

const ButtonWrapper = styled.button`
    @keyframes back-to-docs {
        0% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(0.35em);
        }
        100% {
            transform: translateY(0);
        }
    }
`;
