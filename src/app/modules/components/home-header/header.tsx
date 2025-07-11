import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Header = () => {
  return (
    <div className="flex items-center py-4 w-full pl-6">
      {/* 왼쪽 끝: 로고 */}
      <div className="w-fit border-2 flex items-center">
        <Image src="next.svg" alt="Logo" width={100} height={100} />
      </div>
      
      {/* 가운데: 실시간 반려동물 관리 */}
      <div className="text-3xl flex-1 text-center">
        <h1>실시간 반려동물 관리</h1>
      </div>
      
      {/* 화면 오른쪽 끝: 로그인/회원가입 버튼 */}
      <div className="flex items-center gap-3 pr-6">
        <Button className="w-15 font-semibold">
          Sign
        </Button>
        <Button className="w-15 font-semibold">
          Join
        </Button>
      </div>
    </div>
  );
};