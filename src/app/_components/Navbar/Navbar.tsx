"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import logo from "./../../../../public/screens/freshcart-logo.svg";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { cartContext } from "@/context/cartContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const {numOfCart} : { numOfCart : Number }  = useContext(cartContext);

  return (
    <div className="fixed top-0 left-0 w-full bg-slate-100 py-5 shadow-md z-50">
      <div className="flex items-center justify-between w-[95%] md:w-[80%] mx-auto">
        {/* Logo */}
        {status === "authenticated" && (
          <Link href="/" className="flex items-center">
            <Image src={logo} alt="FreshCart Logo" width={160} height={60} />
          </Link>
        )}

        {/* auth Links */}

        <ul className="hidden md:flex items-center gap-5 text-black">
          {status === "authenticated" && (
            <>
              <li>
                <Link
                  href="/"
                  className={pathname === "/" ? "text-green-600 font-bold" : ""}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/wishlist"
                  className={
                    pathname === "/wishlist" ? "text-green-600 font-bold" : ""
                  }
                >
                  Wishlist
                </Link>
              </li>

              <li>
                <Link
                  href="/categories"
                  className={
                    pathname === "/categories" ? "text-green-600 font-bold" : ""
                  }
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/brands"
                  className={
                    pathname === "/brands" ? "text-green-600 font-bold" : ""
                  }
                >
                  Brands
                </Link>
              </li>{" "}
              <li>
                {" "}
                <Link href={"/cart"}  className={
                    pathname === "/cart" ? "text-green-600 font-bold" : ""
                  }>
Cart
                </Link>
              </li>
            </>
          )}
          {status === "loading" && <h1>Loading..</h1>}
          {status === "unauthenticated" && (
            <Image src={logo} alt="FreshCart Logo" width={160} height={60} />
          )}
        </ul>

        {/* Icons + Hamburger */}
        <div className="flex items-center gap-4">
          {status === "unauthenticated" && (
            <>
              {" "}
              <Link
                href="/signup"
                className={
                  pathname === "/signup" ? "text-green-600 font-bold" : ""
                }
              >
                SignUp
              </Link>
              <Link
                href="/login"
                className={
                  pathname === "/login" ? "text-green-600 font-bold" : ""
                }
              >
                LogIn
              </Link>
            </>
          )}

          {status === "authenticated" && (
            <>
   <Link
  href="/cart"
  className="relative flex items-center text-black hover:text-green-800 transition-transform duration-200 hover:scale-110"
>
  {/* أيقونة الكارت */}
  <i className="fa-solid fa-cart-shopping fa-lg"></i>

  {/* البادچ (Badge) */}
  {numOfCart > 0 && (
    <span className="absolute -top-1.5 -right-2 bg-green-500 text-white text-[10px]  font-bold rounded-full w-4 h-4 flex items-center justify-center">
      {numOfCart}
    </span>
  )}
</Link>
                         {/* <Link href={"/cart"} className="flex">
                  <i className="fa-solid fa-cart-shopping text-black fa-xl"></i>
                  <h2 className="">
                  {numOfCart}
                  </h2>
                </Link> */}
              <h1 className="text-green-700">Hi, {session.user.name}</h1>
              <Button
                className="cursor-pointer"
                onClick={function () {
                  signOut({
                    callbackUrl: "/login",
                  });
                }}
              >
                LogOut
              </Button>
            </>
          )}

          {status === "authenticated" && (
            <>
            <button
              className="md:hidden text-black"
              onClick={() => setIsOpen(!isOpen)}
            >
              <i className="fa-solid fa-bars "></i>
            </button>

            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}

      {isOpen && (
        
        <ul className="md:hidden flex flex-col gap-4 mt-4 px-6 pb-4 bg-slate-200 text-black">
          <li>
            <Link
              href="/"
              className={pathname === "/" ? "text-green-600 font-bold" : ""}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/wishlist"
              className={
                pathname === "/wishlist" ? "text-green-600 font-bold" : ""
              }
              onClick={() => setIsOpen(false)}
            >
              Wishlist
            </Link>
          </li>
          <li>
            <Link
              href="/products"
              className={
                pathname === "/products" ? "text-green-600 font-bold" : ""
              }
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              href="/categories"
              className={
                pathname === "/categories" ? "text-green-600 font-bold" : ""
              }
              onClick={() => setIsOpen(false)}
            >
              Categories
            </Link>
          </li>
          <li>
            <Link
              href="/brands"
              className={
                pathname === "/brands" ? "text-green-600 font-bold" : ""
              }
              onClick={() => setIsOpen(false)}
            >
              Brands
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Navbar;
