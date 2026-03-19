export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="h-6 w-6 border border-foreground border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
