import axios from "axios";
import { NextResponse } from "next/server";


const publicRoutes = ["/login","/signup","/public"];

export async function middleware(request){
  const token = request.cookies.get("token")?.value;

  let isPublic = false;
  
  publicRoutes.forEach((path)=>{
    if(request.nextUrl.pathname.startsWith(path)){
      isPublic = true;
    }
  })

  if(token && !isPublic){
    try {
      let res = await axios.get("http://localhost:4000/auth/verify",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      if(res.status !=200){
        return NextResponse.redirect(new URL("/login",request.url))
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  if(!token && !isPublic){
    return NextResponse.redirect(new URL("/login",request.url))
  }
}

// positive matching ->
// export const config = {
//   matcher: ['/about/:path*', '/dashboard/:path*'],
// }

// negative matching
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}