import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const { userId } = await auth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex flex-col items-center justify-center px-6 sm:px-20">
      
      {/* Logo */}
      <div className="mb-12 flex items-center gap-3">
        <Image src="/logo.svg" alt="Logo" width={50} height={50} />
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">Personalized learning path generator</h1>
      </div>

      {/* Hero section */}
      <div className="text-center max-w-2xl space-y-6">
        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">
          Learn, Create, and Explore AI Courses
        </h2>
        <p className="text-gray-600 text-lg sm:text-xl">
          Join thousands of learners and create your own AI-powered courses. 
          Track progress, test your skills, and upgrade to pro features.
        </p>
      </div>

      {/* Buttons */}
      <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
        
        {/* Sign Up */}
        {!userId && (
          <>
          <SignUpButton>
            <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-12 px-6 sm:px-8 hover:bg-[#5430d0] transition">
              Sign Up
            </button>
          </SignUpButton>

          <SignInButton>
            <button className="bg-white border border-gray-300 text-gray-900 rounded-full font-medium text-sm sm:text-base h-12 px-6 sm:px-8 hover:bg-gray-50 transition">
              Sign In
            </button>
          </SignInButton>
          </>
        )}

        {/* Dashboard button for signed-in users */}
        {userId && (
          <>
          <Link href="/ai-course">
            <button className="bg-black text-white rounded-full font-medium text-sm sm:text-base h-12 px-6 sm:px-8 hover:bg-gray-900 transition">
              Dashboard
            </button>
          </Link>
          <UserButton />
          </>
        )}
      </div>

      {/* Footer / small note */}
      <p className="mt-20 text-gray-500 text-sm sm:text-base text-center max-w-md">
        &copy; {new Date().getFullYear()} Personalized learning path generator. All rights reserved.
      </p>
    </div>
  );
}
