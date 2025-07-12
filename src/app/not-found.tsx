import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-orange-800 mb-4">페이지를 찾을 수 없습니다</h2>
        <p className="text-orange-600 mb-8">요청하신 페이지가 존재하지 않습니다.</p>
        <Link href="/" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg">
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  )
}