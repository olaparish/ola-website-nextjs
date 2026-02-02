import Link from "next/link";
import { FileQuestion, Home, ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_var(--color-primary-100)_0%,_transparent_40%),_radial-gradient(circle_at_bottom_left,_var(--color-primary-100)_0%,_transparent_40%)]">
      <div className="max-w-2xl w-full text-center space-y-8 animate-in fade-in zoom-in duration-700">
        {/* Visual Element */}
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-primary-100 rounded-full blur-3xl opacity-50 animate-pulse"></div>
          <div className="relative bg-white border border-gray-100 shadow-2xl rounded-full p-8 inline-flex items-center justify-center">
            <Compass className="w-20 h-20 text-primary-900 animate-spin-slow" />
          </div>
          <div className="absolute -top-4 -right-4 bg-secondary-900 text-white rounded-full p-3 shadow-lg font-bold text-xl">
            404
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-xl text-gray-500 max-w-md mx-auto leading-relaxed">
            The page you're looking for doesn't exist or has been moved to another quadrant of the parish.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            asChild
            className="h-14 px-8 bg-primary-900 hover:bg-primary-800 text-white font-bold rounded-2xl shadow-xl shadow-primary-900/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-3"
          >
            <Link href="/dashboard">
              <Home className="w-5 h-5" />
              Back to Dashboard
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="h-14 px-8 border-2 border-gray-200 hover:border-primary-300 hover:bg-primary-50 text-gray-700 font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 flex items-center gap-3"
          >
            <Link href="/">
              <ArrowLeft className="w-5 h-5" />
              Go to Homepage
            </Link>
          </Button>
        </div>

        {/* Subtle Footer */}
        <div className="pt-12 text-gray-400 text-sm font-medium uppercase tracking-[0.2em]">
          Our Lady Queen Of Africa Parish
        </div>
      </div>
    </div>
  );
}
