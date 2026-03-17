import { notFound, redirect } from "next/navigation";
import SlideClient from "./SlideClient";
import { TOTAL_SLIDES, SLIDE_META } from "../slides";

export function generateStaticParams() {
  return Array.from({ length: TOTAL_SLIDES }, (_, i) => ({ slide: String(i + 1) }));
}

export default async function SlidePage({ params }: { params: Promise<{ slide: string }> }) {
  const { slide } = await params;
  const n = parseInt(slide, 10);
  if (isNaN(n) || n < 1) redirect("/pitch/1");
  if (n > TOTAL_SLIDES) notFound();
  const meta = SLIDE_META[n - 1];
  return <SlideClient current={n} total={TOTAL_SLIDES} meta={meta} />;
}
