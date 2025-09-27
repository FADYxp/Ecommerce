import { getToken } from 'next-auth/jwt'
import { NextResponse, NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

const token = await getToken({req:request })
const {pathname} = request.nextUrl
const authPage = ["/login" , "/signup" , "/forgotPassword" , "/verifyCode" , "/resetPassword"]
const routes = ["/" ,"/cart" , "/brands" , "/categories" , "/productDetails" , "/wishlist" , "/payment" , "/allOrders"]

if (!token && routes.includes(pathname)){return NextResponse.redirect(new URL('/login', request.url))}
if (token && authPage.includes(pathname)){return NextResponse.redirect(new URL('/', request.url))}

// if (!token){
//     return NextResponse.redirect(new URL('/login', request.url))
// }
// else{
//         if(pathname === "/login" || "/signup"){
//             return NextResponse.redirect(new URL('/', request.url))}
// }

  return NextResponse.next()


}


  
export const config = {
  matcher: ["/" ,"/cart" , "/brands" , "/categories" , "/productDetails" , "/wishlist" , "/login" , "/signup" , "/forgotPassword" , "/verifyCode" , "/resetPassword" , "/payment" , "/allOrders"],
}