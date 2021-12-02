import { useState, useEffect } from 'react';
import { w3cwebsocket as W3CWebSocket, IMessageEvent } from 'websocket';

const DEFAULT_TICK_RATE = 5;

export const useMarketSymbol = ({
    symbol,
    tickRate = DEFAULT_TICK_RATE,
}: {
    symbol: string;
    tickRate?: number;
}) => {
    const [currentPrice, setCurrentPrice] = useState(0);

    useEffect(() => {
        let tick = 0;
        const client = new W3CWebSocket(
            `wss://stream.binance.com:9443/ws/${symbol}@kline_1m`
        );
        client.onopen = () => {
            console.log(`WebSocket Client Connected for ${symbol}`);
        };
        client.onmessage = ({ data }: IMessageEvent) => {
            const incomingData = JSON.parse(data as string);
            if (incomingData.k && tick % tickRate === 0) {
                const symbolPrice = Number(incomingData.k.c);
                setCurrentPrice(symbolPrice);
            }
            tick++;
        };
    }, [symbol, tickRate]);
    return { currentPrice };
};
