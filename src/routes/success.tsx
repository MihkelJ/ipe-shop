import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { STORE_CONFIG } from '@/constants';
import { verifyPayment } from '@/lib/utils';
import sdk from '@/utils/yodlsdk';
import { useQuery } from '@tanstack/react-query';
import { Link, createFileRoute } from '@tanstack/react-router';
import { ArrowLeft, MessageCircle } from 'lucide-react';

export const Route = createFileRoute('/success')({
  component: SuccessPage,
});

function SuccessPage() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['payment'],
    queryFn: async () => {
      const urlPaymentResult = sdk.parsePaymentFromUrl();

      if (!urlPaymentResult.txHash) {
        throw new Error('No transaction hash found');
      }

      const tx = await sdk.getPayment(urlPaymentResult.txHash);

      if (!tx) {
        throw new Error('Transaction not found');
      }

      const memo = tx?.memo;
      const blockTimestamp = tx?.blockTimestamp
        ? new Date(tx.blockTimestamp).getTime() / 1000
        : null;

      const item = STORE_CONFIG.find((item) => item.name === memo);

      if (!item) {
        throw new Error('Item not found');
      }

      // Verify that the payment amount is correct
      if (tx.invoiceAmount && tx.invoiceCurrency) {
        const paymentAmount = parseFloat(tx.invoiceAmount);
        verifyPayment({
          paymentAmount,
          paymentCurrency: tx.invoiceCurrency,
          expectedAmount: item.price,
          expectedCurrency: item.currency,
        });
      } else {
        throw new Error('Payment amount or currency information missing');
      }

      return {
        ...item,
        blockTimestamp,
      };
    },
    retry: (failureCount, error) => {
      // Only retry if we got null (no transaction) and haven't retried too many times
      return (
        error instanceof Error &&
        error.message === 'Transaction not found' &&
        failureCount < 20
      );
    },
    retryDelay: 500, // Retry every 500ms
  });

  if (error) {
    return (
      <div
        className="min-h-screen w-full flex items-center justify-center py-8 pt-24 px-4"
        style={{
          backgroundImage: 'url("/background.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-destructive/10 p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-destructive"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
            </div>
            <CardTitle className="text-2xl text-center text-destructive">
              Payment Error
            </CardTitle>
            <CardDescription className="text-center mt-2">
              {error.message}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-muted-foreground text-center">
              Please try again or contact us in our Telegram group for support.
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline" className="flex-1">
                <Link to="/" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Shop
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center py-8 pt-24 px-4"
      style={{
        backgroundImage: 'url("/background.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            {isLoading ? 'Processing Payment...' : 'Payment Successful!'}
          </CardTitle>
          <CardDescription className="text-center">
            {isLoading
              ? 'Please wait while we verify your payment...'
              : 'Thank you for your purchase. Your transaction has been completed successfully.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          {isLoading ? (
            <div className="text-center w-full">
              <Skeleton className="h-12 w-12 mx-auto mb-2 rounded-full" />
              <Skeleton className="h-6 w-48 mx-auto mb-2" />
              <Skeleton className="h-4 w-24 mx-auto" />
            </div>
          ) : data ? (
            <>
              <div className="text-center">
                <div className="text-4xl mb-2">{data.emoji}</div>
                <h3 className="text-xl font-semibold">{data.name}</h3>
                <p className="text-muted-foreground">
                  {data.price} {data.currency}
                </p>
                {data.blockTimestamp && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Paid at:{' '}
                    {new Date(data.blockTimestamp * 1000).toLocaleString()}
                  </p>
                )}
              </div>
              <div className="flex gap-2 w-full">
                <Button asChild className="flex-1">
                  <Link to="/" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Shop
                  </Link>
                </Button>
                {data?.sellerTelegram && (
                  <Button variant="outline" asChild className="flex-1">
                    <a
                      href={`https://t.me/${data.sellerTelegram}?text=${encodeURIComponent(
                        `Hi! I just purchased ${data.name} (${data.price} ${data.currency}). Can you help me with the next steps?`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Message {data.seller}
                    </a>
                  </Button>
                )}
              </div>
            </>
          ) : (
            <div className="text-center">
              <p>No data</p>
              <p>{JSON.stringify(data)}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
