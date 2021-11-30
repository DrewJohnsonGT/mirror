import { useState, useEffect } from 'react';
import { w3cwebsocket as W3CWebSocket, IMessageEvent } from 'websocket';

export const useMarketSymbol = ({ symbol }: { symbol: string }) => {
    const [currentPrice, setCurrentPrice] = useState(0);
    useEffect(() => {
        const client = new W3CWebSocket(
            `wss://stream.binance.com:9443/ws/${symbol}@kline_1m`
        );
        client.onopen = () => {
            console.log(`WebSocket Client Connected for ${symbol}`);
        };
        client.onmessage = ({ data }: IMessageEvent) => {
            const incomingData = JSON.parse(data as string);
            if (incomingData.k) {
                const symbolPrice = Number(incomingData.k.c);
                setCurrentPrice(symbolPrice);
            }
        };
    }, [symbol]);
    return { currentPrice };
};
