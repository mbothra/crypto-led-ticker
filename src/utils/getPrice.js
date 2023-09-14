import {aggregatorV3InterfaceABI} from "./constants"; 
import {assetMapping} from './assetDetails'
import { ethers, JsonRpcProvider } from 'ethers';
import { formatDistanceToNow } from 'date-fns';

const lastPrices = {}; // Store last prices for each symbol and chain

function toScientificNotation(num) {
    if (num <= 10000) return num.toFixed(4);  // for numbers <= 10,000, just keep up to 4 decimal places

    const exponent = Math.floor(Math.log10(num));
    const coefficient = num / Math.pow(10, exponent);
    return `${coefficient.toFixed(3)}*e^${exponent}`;
}

export async function fetchAssetData() {
    const results = []
    for (const asset of assetMapping) {
        const symbol = asset.symbol;
        if(asset.brand) {
            results.push ({
                "price": 'price',
                "symbol": 'symbol',
                "oracles": "31/31",
                "lastUpdatedAt": 'lastUpdated',
                "chain": 'asset.chain',
                "imageUrl": 'asset.image_url',
                "isUpward": 'isUpward',
                "brand": asset.brand
            })
        }

        try {
            let { price, timestamp } = await getPriceData(asset.address, asset.rpc_url);
            let lastUpdated = formatDistanceToNow(new Date(timestamp)) + ' ago';
            console.log("lastUpdated",lastUpdated)
            lastUpdated = lastUpdated.replace('seconds', 'secs');
            lastUpdated = lastUpdated.replace('minutes', 'mins');
            lastUpdated = lastUpdated.replace('hours', 'hrs');
            lastUpdated = lastUpdated.replace('less than', '');
            lastUpdated = lastUpdated.replace('about', '~ ');

            const lastPriceKey = `${symbol}_${asset.chain}`;
            const isUpward = lastPrices[lastPriceKey] ? price > lastPrices[lastPriceKey] : null;
            if (price > 100000) {
                price = toScientificNotation(price);
            } 
    
            lastPrices[lastPriceKey] = price; // Update last price

            console.log(`Price for ${symbol} on ${asset.chain}: ${price}, Last updated at: ${lastUpdated}`);
            results.push ({
                "price": price,
                "symbol": symbol,
                "oracles": "31/31",
                "lastUpdatedAt": lastUpdated,
                "chain": asset.chain,
                "imageUrl": asset.image_url,
                "isUpward": isUpward,
                "brand": asset.brand
            })
        } catch (error) {
            console.error(`Error fetching price for ${symbol} on ${asset.chain}: ${error}`);
        }
    }
    const firstTwo = results.slice(0, 2);
    const remaining = results.slice(2);
    const modifiedResults = [...remaining, ...firstTwo];
    return {
        originalResults: results,
        rearrangedResults: modifiedResults
    };
}



export async function getPriceData(address, rpc_url) {
    const provider = new JsonRpcProvider(rpc_url);    
    const contract = new ethers.Contract(address, aggregatorV3InterfaceABI, provider);
    const roundData = await contract.latestRoundData();
    const decimals = await contract.decimals(); // You should replace this with the correct number of decimals for the asset

    // Convert both values to BigInts
    const answerBigInt = BigInt(roundData.answer.toString());
    const divisorBigInt = BigInt(10 ** Number(decimals));

    // Divide the BigInts
    const rawPrice = Number(answerBigInt * 10000000n / divisorBigInt) / 10000000;
    // Determine the number of integer digits
    const integerPartLength = Math.floor(rawPrice).toString().length;

    // Conditionally set decimal places based on integer part length
    const decimalPlaces = integerPartLength === 1 ? 6 : integerPartLength > 5 ? 0 : 3;

    const price = parseFloat(rawPrice.toFixed(decimalPlaces)); // Considering 6 decimal places, but you can adjust as needed.

    const timestamp = new Date(Number(roundData.updatedAt) * 1000); // Convert seconds to milliseconds

    return { price: price.toString(), timestamp }; // Convert price to string
}
