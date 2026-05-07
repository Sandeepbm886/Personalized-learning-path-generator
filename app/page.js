import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import Image from "next/image";
import LightRays from "@/components/LightRays";

export default async function Home() {
  const { userId } = await auth();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 sm:px-20">
      <div className="fixed z-0 inset-0 pointer-events-none" >
  <LightRays
    raysOrigin="top-center"
    raysColor="#ffffff"
    raysSpeed={1.5}
    lightSpread={0.5}
    rayLength={3}
    followMouse={true}
    mouseInfluence={0.1}
    noiseAmount={0}
    distortion={0}
    className="custom-rays"
    pulsating={false}
    fadeDistance={1}
    saturation={1}
/>
</div>
      
      
      <div className="mb-12 flex items-center gap-3">
        <Image src="/logo.svg" alt="Logo" width={50} height={50} />
        <h1 className="text-4xl sm:text-5xl font-bold text-white">Personalized learning path generator</h1>
      </div>

      
      <div className="text-center max-w-2xl space-y-6">
        <h2 className="text-3xl sm:text-4xl font-semibold text-white">
          Learn, Create, and Explore AI Courses
        </h2>
        <p className="text-white text-lg sm:text-xl">
          Join thousands of learners and create your own AI-powered courses. 
          Track progress, test your skills, and upgrade to pro features.
        </p>
      </div>

      
      <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
        
        
      {!userId && (
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <SignUpButton><button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-12 px-6 sm:px-8 hover:bg-[#5430d0] transition">Sign Up</button></SignUpButton>

          <SignInButton><button className="bg-white border border-gray-300 text-gray-900 rounded-full font-medium text-sm sm:text-base h-12 px-6 sm:px-8 hover:bg-gray-50 transition">Sign In</button></SignInButton>
        </div>
      )}

        
        {userId && (
          <>
          <Link href="/ai-course">
            <button className="bg-gray-400 text-white rounded-full font-medium text-sm sm:text-base h-12 px-6 sm:px-8 hover:bg-gray-900 transition">
              Dashboard
            </button>
          </Link>
          <UserButton />
          </>
        )}
      </div>

      
      <p className="mt-20 text-white text-sm sm:text-base text-center max-w-md">
        &copy; {new Date().getFullYear()} Personalized learning path generator. All rights reserved.
      </p>
    </div>
  );
}
