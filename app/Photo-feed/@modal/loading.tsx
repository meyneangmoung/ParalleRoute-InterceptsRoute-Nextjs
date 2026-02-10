export default function ModalLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="w-24 h-24 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
