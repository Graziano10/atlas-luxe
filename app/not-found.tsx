import Link from 'next/link';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Page Not Found',
};

export default function NotFound() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-6 text-center bg-obsidian-950">
      {/* Decorative number */}
      <p className="font-display text-[12rem] leading-none font-light text-obsidian-900 select-none" aria-hidden="true">
        404
      </p>

      <div className="-mt-16 flex flex-col items-center gap-6 relative">
        <p className="text-2xs uppercase tracking-ultra text-gold-500">Lost in the world</p>
        <h1 className="font-display text-4xl md:text-5xl font-light text-ivory-100">
          This page does not exist.
        </h1>
        <p className="text-ivory-400 text-base max-w-sm leading-relaxed">
          Perhaps you were looking for a destination that transcends maps. Let us guide you back.
        </p>
        <Link href="/">
          <Button variant="outline" size="lg">Return Home</Button>
        </Link>
      </div>
    </div>
  );
}
