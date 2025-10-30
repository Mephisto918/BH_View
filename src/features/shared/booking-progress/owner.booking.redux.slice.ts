`
Tenant Request
   ↓
[REQUEST_PENDING] ─→ (Owner Approves) → [REQUEST_APPROVED]
        │
        └─→ (Owner Rejects) → [REQUEST_REJECTED]
        
[REQUEST_APPROVED]
   ↓ (Tenant Uploads Payment)
[PAYMENT_PENDING]
   ↓
(Owner Approves) → [PAYMENT_APPROVED → COMPLETED]
(Owner Rejects) → [PAYMENT_REJECTED]
`;

export const BookingState = {
  REQUEST_PENDING: "REQUEST_PENDING", // tenant sent booking, waiting for owner approval
  REQUEST_APPROVED: "REQUEST_APPROVED", // owner approved booking, waiting for tenant payment
  PAYMENT_PENDING: "PAYMENT_PENDING", // tenant uploaded proof
  PAYMENT_APPROVED: "PAYMENT_APPROVED", // owner approved payment
  PAYMENT_REJECTED: "PAYMENT_REJECTED", // owner rejected payment
  REQUEST_REJECTED: "REQUEST_REJECTED", // owner rejected request
  COMPLETED: "COMPLETED",
};
