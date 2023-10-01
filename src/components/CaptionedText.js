import React from 'react';
import { Typography, Box } from '@mui/material';
import theme from '../Theme';
import ledimage from './led-image.png';

class CaptionedText extends React.Component {

    toShortScientificNotation(num) {
        let base;
        let exponent = null;
        if (typeof num == 'string' && num.includes('*')) {  // Check if it's a string and contains '*'
            base = num.substring(0, num.indexOf('*'));
            exponent = num.substring(num.indexOf('^')+1);  // Assumes format is like "x.x*e^xx"
        } else {
            base = num;  // Here, if num is not a string in scientific format, assign the entire number to base
        }
        return { base, exponent };
    }
    
    

    renderLongSymbol() {
        const { mainText } = this.props;
        const { sizes } = theme;
        const fontSize = sizes.main.special;  // Adjust the font size as per requirement

        return (
            <Typography variant={sizes.main.specialVariant} component="div" gutterBottom fontFamily='MaisonMono' fontSize={fontSize}>
                {mainText}
            </Typography>
        );
    }

    render() {
        const { mainText, captionText, type, isUpward } = this.props;
        const { sizes } = theme;

        let color, variant=sizes.main.otherVariant, font='MaisonMono'

        if(captionText == 'Last Updated') {
            return (
                <Box sx={{my: 2}}>
                    <Typography variant={variant} component="div" gutterBottom fontFamily={font} color="white" marginRight="50px">
                        {/* <img src={ledimage} alt="logo" style={{ width: sizes.card.height, height: 100 }} /> */}
                    </Typography>
                    <Typography variant="caption" gutterBottom component="div" fontFamily= {font} color='black'>
                        {captionText}
                    </Typography>
                </Box>
            );
        }

        if(captionText == '-') {
            if(mainText.length > 9) {
                return (
                    <Box sx={{my: 2}}>
                        {this.renderLongSymbol()}
                        <Typography variant="caption" gutterBottom component="div" fontFamily='MaisonMono' color='black' fontSize={sizes.caption.special}>
                            {captionText}
                        </Typography>
                    </Box>
                );
            } else {
                color = 'black';
                variant = sizes.main.symbolVariant;
                font = 'MaisonMono';
            }
        }

        if(type == 'price') {
            color= isUpward?"green":"red"
            let marginBottom = isUpward? sizes.price.arrow.marginBottom.upward:sizes.price.arrow.marginBottom.downward
            let marginTop = isUpward? sizes.price.arrow.marginTop.upward:sizes.price.arrow.marginTop.downward
            let {base, exponent} = this.toShortScientificNotation(mainText)
            console.log("base", base)
            return (
                <Box sx={{my: 2}}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant={sizes.main.priceVariant} component="div" gutterBottom  fontFamily= {font} color={color} marginTop={sizes.price.marginTop}>
                        {base}             
                    </Typography>
                    {exponent  && (
                        <>
                            <Typography variant={sizes.main.priceVariant} component="div" gutterBottom fontFamily={font} color={color} fontSize={sizes.main.exponentFont} marginBottom='1em'>
                                x10
                            </Typography>
                            <Typography variant="caption" component="span" gutterBottom fontFamily={font} color={color} marginBottom='1em'>
                                <sup>{exponent}</sup>
                            </Typography>
                        </>
                    )}

                    <div style={{
                            width: 0,
                            height: 0,
                            borderLeft: `${sizes.price.arrow.borderLeft} solid transparent`,
                            borderRight: `${sizes.price.arrow.borderRight} solid transparent`,
                            borderBottom: isUpward ? `${sizes.price.arrow.borderBottom} solid green` : 'none',
                            borderTop: isUpward ? 'none' : `${sizes.price.arrow.borderTop} solid red`,
                            marginLeft: `${sizes.price.arrow.marginLeft}`,
                            marginBottom: marginBottom,
                            marginTop: marginTop
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
                <Typography variant={variant} component="div" gutterBottom  fontFamily= {font} color='white' marginRight='50px'>
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
