import { useState, useEffect } from 'react';

const MOCK_GOLD_USD = 2340;
const MOCK_TRY_RATE = 32.50;

export interface GoldPriceData {
  has: number;
  k22: number;
  k18: number;
  k14: number;
  onsUSD: number;
  tryRate: number;
  lastUpdated: Date;
  loading: boolean;
  error: Error | null;
}

export function formatTRY(value: number): string {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(value);
}

export function formatUSD(value: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

export function useGoldPrice() {
  const [data, setData] = useState<GoldPriceData>({
    has: 0,
    k22: 0,
    k18: 0,
    k14: 0,
    onsUSD: 0,
    tryRate: 0,
    lastUpdated: new Date(),
    loading: true,
    error: null,
  });

  useEffect(() => {
    let mounted = true;

    const fetchPrices = async () => {
      try {
        if (mounted) setData(prev => ({ ...prev, loading: true }));
        
        let goldUSD = MOCK_GOLD_USD;
        let tryRate = MOCK_TRY_RATE;

        try {
          const goldRes = await fetch('https://api.metals.live/v1/spot/gold');
          if (goldRes.ok) {
            const goldData = await goldRes.json();
            if (goldData && goldData.length > 0 && goldData[0].price) {
              goldUSD = parseFloat(goldData[0].price);
            }
          }
        } catch (e) {
          console.warn("Could not fetch live gold price, using mock.");
        }

        try {
          const rateRes = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
          if (rateRes.ok) {
            const rateData = await rateRes.json();
            if (rateData && rateData.rates && rateData.rates.TRY) {
              tryRate = rateData.rates.TRY;
            }
          }
        } catch (e) {
          console.warn("Could not fetch live TRY rate, using mock.");
        }

        const hasPriceGram = (goldUSD * tryRate) / 31.1035;

        if (mounted) {
          setData({
            has: hasPriceGram,
            k22: hasPriceGram * 0.916,
            k18: hasPriceGram * 0.750,
            k14: hasPriceGram * 0.585,
            onsUSD: goldUSD,
            tryRate: tryRate,
            lastUpdated: new Date(),
            loading: false,
            error: null,
          });
        }
      } catch (err) {
        if (mounted) {
          setData(prev => ({
            ...prev,
            loading: false,
            error: err instanceof Error ? err : new Error('Failed to fetch prices')
          }));
        }
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 5 * 60 * 1000); // 5 minutes

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return data;
}
