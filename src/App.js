import { useState } from "react";
import { PriceCard } from './components/PriceCard';
import theme from './Theme';
import React from 'react';
import { HorizontalTicker } from "react-infinite-ticker";

import "./styles.css";
import { CssBaseline, ThemeProvider } from '@mui/material';
import { fetchAssetData } from './utils/getPrice';
import "@fontsource/montserrat"; // Defaults to weight 400
import "@fontsource/montserrat/400.css"; // Specify weight
import "@fontsource/montserrat/400-italic.css"; // Specify weight and style

export default function App() {
  const renderBubbles = (bubble, index) => { return <Bubble key={index} {...bubble} />;}
  const [fetchedData, setFetchedData] = useState([]); // Initialize state to hold fetched data
  const [canFetch, setCanFetch] = useState(true);  // State to determine if we can start a new fetch


  const fetchData = () => {
    // If a fetch isn't allowed, return immediately
    if (!canFetch) {
      return;
    }

    setCanFetch(false);  // Disable further fetching

    fetchAssetData()
      .then(data => {
        console.log(data);
        setFetchedData(data);

        // After fetching data, wait for 45 seconds before allowing another fetch
        setTimeout(() => {
          setCanFetch(true);
          fetchData();  // Optional: You can automatically start another fetch after 45 seconds
        }, 60000);
      })
      .catch(err => {
        console.log(err);

        // Even if there's an error, wait for 45 seconds before allowing another fetch
        setTimeout(() => {
          setCanFetch(true);
        }, 60000);
      });
  };


  fetchData();

  function Bubble({ imageUrl, chain, symbol, price, oracles, lastUpdatedAt, isUpward, brand }) {
    return (
      <div>
        <PriceCard imageUrl={imageUrl} chain={chain} symbol={symbol} price={price} oracles={oracles} lastUpdatedAt={lastUpdatedAt} isUpward={isUpward} brand={brand}/>
      </div>
    );
  }

  return (
    <React.Fragment>
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <HorizontalTicker
          duration={100000}
          easing={"linear"}
          delay={0}
          reverse={true}
        >
          {fetchedData.map(renderBubbles)}
        </HorizontalTicker>
    </ThemeProvider>
    </React.Fragment>
  );
}
