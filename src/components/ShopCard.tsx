import type { StoreItem } from '@/types';
import sdk from '@/utils/yodlsdk';
import { useRouter } from '@tanstack/react-router';
import type { FiatCurrency } from '@yodlpay/yapp-sdk';
import React from 'react';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';

export const ShopCard: React.FC<StoreItem> = ({
  name,
  description,
  price,
  currency,
  emoji,
  inStock,
  seller,
}) => {
  const router = useRouter();
  const handleBuy = async () => {
    const payment = await sdk.requestPayment({
      addressOrEns: seller,
      amount: price,
      currency: currency as FiatCurrency,
      memo: name,
      redirectUrl: `${window.location.origin}/success`,
    });

    router.navigate({ to: '/success', search: { ...payment } });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{emoji}</span>
          <CardTitle>{name}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="text-lg font-semibold">
            {price} {currency}
          </div>
          <div className="text-sm text-muted-foreground">Seller: {seller}</div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled={!inStock} onClick={handleBuy}>
          {inStock ? 'Buy Now' : 'Out of Stock'}
        </Button>
      </CardFooter>
    </Card>
  );
};
