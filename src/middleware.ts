import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// 공개 경로 설정 - 홈페이지와 로그인/회원가입 페이지 모두 공개
const isPublicRoute = createRouteMatcher([
  '/',              // 홈페이지
  '/sign-in(.*)',   // 로그인 페이지
  '/sign-up(.*)'    // 회원가입 페이지
])

export default clerkMiddleware(async (auth, req) => {
  // 공개 경로가 아닌 경우에만 인증 보호
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Next.js 내부 파일과 정적 파일 제외
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // API 라우트는 항상 실행
    '/(api|trpc)(.*)',
  ],
}