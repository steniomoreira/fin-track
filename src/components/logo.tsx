import { WalletMinimal } from 'lucide-react';

function Logo() {
  return (
    <div className="flex items-center">
      <WalletMinimal className="text-primary mr-1 h-8 w-8" />

      <h2 className="text-lg font-extrabold">FinTrack</h2>
    </div>
  );
}

export default Logo;
