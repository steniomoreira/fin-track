import { WalletMinimal } from 'lucide-react';

function FinTrack() {
  return (
    <div className="flex items-center">
      <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-sm bg-blue-500">
        <WalletMinimal className="h-4 w-4 text-white" />
      </div>

      <h2 className="text-lg font-extrabold">FinTrack</h2>
    </div>
  );
}

export default FinTrack;
