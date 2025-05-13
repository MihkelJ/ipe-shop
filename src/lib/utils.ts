import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface PaymentVerificationParams {
  paymentAmount: number;
  paymentCurrency: string;
  expectedAmount: number;
  expectedCurrency: string;
}

export function verifyPayment({
  paymentAmount,
  paymentCurrency,
  expectedAmount,
  expectedCurrency,
}: PaymentVerificationParams): void {
  const normalizedPaymentCurrency = paymentCurrency.toUpperCase();
  const normalizedExpectedCurrency = expectedCurrency.toUpperCase();

  if (normalizedPaymentCurrency !== normalizedExpectedCurrency) {
    throw new Error(
      `Currency mismatch: expected ${normalizedExpectedCurrency}, got ${normalizedPaymentCurrency}`
    );
  }

  if (paymentAmount < expectedAmount) {
    throw new Error(
      `Insufficient payment: expected ${expectedAmount} ${normalizedExpectedCurrency}, got ${paymentAmount} ${normalizedPaymentCurrency}`
    );
  }
}
