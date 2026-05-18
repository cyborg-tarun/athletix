import { Receipt } from "@/components/booking/receipt";

export const dynamic = "force-dynamic";

export default async function BookingReceiptPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <Receipt id={id} />;
}
