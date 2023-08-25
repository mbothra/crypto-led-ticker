import React from 'react';
import { Typography, Box } from '@mui/material';
import theme from '../Theme';

class CaptionedText extends React.Component {

    renderLongSymbol() {
        const { mainText } = this.props;
        const { sizes } = theme;
        const fontSize = sizes.main.special;  // Adjust the font size as per requirement

        return (
            <Typography variant={sizes.main.specialVariant} component="div" gutterBottom fontFamily='Gameplay' fontSize={fontSize}>
                {mainText}
            </Typography>
        );
    }

    render() {
        const { mainText, captionText, type, isUpward } = this.props;
        const { sizes } = theme;

        let color, variant=sizes.main.otherVariant, font='AlienEncounters'
        if(captionText == '-') {
            if(mainText.length > 9) {
                return (
                    <Box sx={{my: 2}}>
                        {this.renderLongSymbol()}
                        <Typography variant="caption" gutterBottom component="div" fontFamily='Gameplay' color='black' fontSize={sizes.caption.special}>
                            {captionText}
                        </Typography>
                    </Box>
                );
            } else {
                color = 'black';
                variant = sizes.main.symbolVariant;
                font = 'Gameplay';
            }
        }

        if(type == 'price') {
            color= isUpward?"green":"red"
            let marginBottom = isUpward? sizes.price.arrow.marginBottom.upward:sizes.price.arrow.marginBottom.downward
            return (
                <Box sx={{my: 2}}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant={sizes.main.priceVariant} component="div" gutterBottom  fontFamily= {font} color={color} marginTop={sizes.price.marginTop}>
                        {mainText}             
                    </Typography>
                    <div style={{
                            width: 0,
                            height: 0,
                            borderLeft: `${sizes.price.arrow.borderLeft} solid transparent`,
                            borderRight: `${sizes.price.arrow.borderRight} solid transparent`,
                            borderBottom: isUpward ? `${sizes.price.arrow.borderBottom} solid green` : 'none',
                            borderTop: isUpward ? 'none' : `${sizes.price.arrow.borderTop} solid red`,
                            marginLeft: `${sizes.price.arrow.marginLeft}`,
                            marginBottom: marginBottom,
                            marginTop:`${sizes.price.arrow.marginTop}`
                        }}></div>       
                    </Box>
                    <Typography variant="caption" gutterBottom component="div" fontFamily= {font}>
                        {captionText}
                    </Typography>
                </Box>
            );    
        }
        return (
            <Box sx={{my: 2}}>
                <Typography variant={variant} component="div" gutterBottom  fontFamily= {font} color='white'>
                    {mainText}
                </Typography>
                <Typography variant="caption" gutterBottom component="div" fontFamily= {font} color={color}>
                    {captionText}
                </Typography>
            </Box>
        );
    }
}

export default CaptionedText;
