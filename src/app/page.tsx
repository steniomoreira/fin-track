import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-wrap items-center justify-center gap-8">
      <h1>Welcome to FinTrack!</h1>

      <Link href="/sign-in">
        <Button>Sign In</Button>
      </Link>
    </div>
  );
}
