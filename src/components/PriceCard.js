import React from 'react';
import { Box } from '@mui/material';
import CaptionedText from './CaptionedText';
import theme from '../Theme';
import chainlinkLogo from './chainlink-logo.svg';

export class PriceCard extends React.Component {

    renderBrandCard() {
        const { sizes } = theme;

        return (
            <Box sx={{ display: 'flex', p: 2, background: '#375bd2', alignItems: 'center', justifyContent: 'space-between', height: sizes.brand.height, width: sizes.brand.width*1.1, paddingLeft: sizes.brand.paddingLeft, border: '2px solid white', height: '384px',
            borderRadius: '10px',  // Rounded corners
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' // Subtle box shadow
}}>
                <Box sx={{ p: 1, width: sizes.brand.width, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={chainlinkLogo} alt="Chainlink logo" style={{ width: sizes.brand.imgHeight, height: sizes.brand.imgHeight }} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: sizes.brand.width }}>
                    <span style={{ color: 'white', fontSize: sizes.brand.fontSize, fontFamily: sizes.brand.fontFamily}}>Data</span>
                    <Box sx={{ background: 'white', borderRadius: '8px', padding: '0.2em 0.5em', marginTop: '0.5em' }}>
                        <span style={{ color: '#375bd2', fontSize: sizes.brand.fontSize, fontFamily: sizes.brand.fontFamily }}>feeds</span>
                    </Box>
                </Box>
            </Box>
        );
    }

    renderDefaultCard() {
        const { imageUrl, price, symbol, oracles, lastUpdatedAt, chain, isUpward } = this.props;
        const determineBoxWidth = symbol.length > 8 ? (symbol.length == 9 ? theme.sizes.box.specialWidth : theme.sizes.box.specialLeftWidth) : theme.sizes.box.leftWidth;
        const determineBoxRightWidth = symbol.length > 8 ? (symbol.length == 9 ? theme.sizes.box.specialRWidth : theme.sizes.box.specialRightWidth) : theme.sizes.box.rightWidth;
            // Function to check if the imageUrl is a valid URL
        const isValidURL = (str) => {
            try {
                new URL(str);
                return true;
            } catch (_) {
                return false;
            }
        }
        const { sizes } = theme;
        
        return (
            <Box     sx={{ 
                height: '384px',
                display: 'flex', 
                p: 1, 
                background: 'black',
                border: '2px solid white', // Gradient or solid border
                borderRadius: '10px',  // Rounded corners
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' // Subtle box shadow
            }}>
                <Box sx={{ p: 1 }}>
                    {isValidURL(imageUrl) ? 
                        <img src={imageUrl} alt="logo" style={{ width: sizes.card.height, height: sizes.card.height, marginRight: sizes.card.imgRightMargin, marginLeft: sizes.card.imgLeftMargin }}/> 
                        :
                        <Box sx={{ width: sizes.card.height, height: sizes.card.height, borderRadius: '50%', background: imageUrl, marginRight: sizes.card.imgRightMargin, marginLeft: sizes.card.imgLeftMargin }}></Box>
                    }
                </Box>
                <Box sx={{     display: 'flex', 
                            flexDirection: 'column', 
                            p: 1, 
                            width: determineBoxWidth, 
                            borderRight: 'none', 
                            paddingRight: 'calc(1px + 1rem)', 
                            background: 'linear-gradient(to bottom, transparent, #FFF, transparent)', 
                            backgroundSize: '1px 100%', 
                            backgroundRepeat: 'no-repeat', 
                            backgroundPosition: 'right center'   }}>
                    <CaptionedText mainText={symbol} captionText="-" />
                    <CaptionedText mainText={price} captionText={chain} type='price' isUpward={isUpward}/>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', p: 1, width: determineBoxRightWidth, marginLeft: '100px'  }}>
                    <CaptionedText mainText={oracles} captionText="Oracles" />
                    <CaptionedText mainText={lastUpdatedAt} captionText="Last Updated" />
                </Box>
            </Box>
        );
    }

    render() {
        if (this.props.brand) {
            return this.renderBrandCard();
        } else {
            return this.renderDefaultCard();
        }
    }
}
