
import FlappyPhoneGame from '../components/game/FlappyPhoneGame';

const AdminEasterEgg = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col items-center min-h-[85vh] select-none">
      {/* Header */}
      <div className="text-center mb-8 w-full">
        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Restricted Area</p>
        <p className="text-sm text-muted-foreground/60">Admins only. Play a game instead.</p>
      </div>

      <div className="w-full flex justify-center">
        <FlappyPhoneGame />
      </div>
    </div>
  );
};

export default AdminEasterEgg;
