
import { Button } from "./ui/button"
import Link from "next/link"
import DarkModeToggle from "./DarkModeToggle"
import { SignInButton } from "@clerk/nextjs"

const Navbar = () => {
  return (
    <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link
          href="/"
          className="text-xl font-bold text-primary font-mono tracking-wider"
        >
          Socialize
        </Link>

        <div className="flex gap-2">
          <DarkModeToggle />
          <Button>
            <SignInButton mode="modal" />
          </Button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
