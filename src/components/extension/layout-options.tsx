import { CommonLayouts } from '@src/hooks/useCardStore';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    max-width: 300px;
    margin: 0 auto;
    justify-content: center;
`;

const Option = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #1c1c1c;
    }
`;

const RatioBox = styled.div`
    width: ${props => props.boxWidth}px;
    height: ${props => props.boxHeight}px;
    border: 1px solid #38444D;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 5px;
    color: #FFFFFF;
    font-size: 10px;
    font-weight: bold;
`;

const Dimensions = styled.div`
    font-size: 9px;
    color: #8899A6;
`;

const LayoutOptions = ({ onSelect }) => {

    const [selectedLayout, setSelectedLayout] = React.useState(CommonLayouts.layoutOptions[0]);

    const getRatioBoxDimensions = (ratio) => {
        const [width, height] = ratio.split(':').map(Number);
        const baseSize = 40;
        let boxWidth, boxHeight;

        if (width > height) {
            boxWidth = baseSize;
            boxHeight = (height / width) * baseSize;
        } else {
            boxHeight = baseSize;
            boxWidth = (width / height) * baseSize;
        }

        return { boxWidth, boxHeight };
    };

    return (
        <Container>
            {CommonLayouts.layoutOptions.map((option, index) => {
                const { boxWidth, boxHeight } = getRatioBoxDimensions(option.ratio);
                return (
                    <Option key={index}
                        onClick={() => {
                            setSelectedLayout(option);
                            onSelect(option);
                        }}
                        style={{
                            backgroundColor: selectedLayout.ratio === option.ratio ? '#1c1c1c' : ''
                        }}
                    >
                        <RatioBox boxWidth={boxWidth} boxHeight={boxHeight}>
                            {option.ratio}
                        </RatioBox>
                        <Dimensions>
                            {`${option.dimensions.width}x${option.dimensions.height}`}
                        </Dimensions>
                    </Option>
                );
            })}
        </Container>
    );
};

export default LayoutOptions;