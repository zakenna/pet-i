import { Button } from "@/components/ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/">
              <h1 className="text-2xl font-bold text-orange-800">Pet-I</h1>
            </Link>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="border-orange-200 text-orange-700 hover:bg-orange-50">
              로그인
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              회원가입
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;