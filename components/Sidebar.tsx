import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { BellIcon, HomeIcon, User } from "lucide-react"
import Link from "next/link"

const Sidebar = () => {
  return (
    <Card className="flex flex-col justify-center gap-2 items-start py-2 px-2">

      
        <Button variant="ghost" className="flex justify-start items-center gap-2 w-full" asChild>
          <Link href="/" >
            <HomeIcon className="size-1" />
            <span className="hidden lg:inline">Home</span>
          </Link>
        </Button>

        <Button variant="ghost" className="flex justify-start items-center gap-2 w-full" asChild>
          <Link href="/notifications">
            <BellIcon /> 
            <span>Notifications</span>
          </Link>
        </Button>
        
        <Button variant="ghost" className="flex justify-start items-center gap-2 w-full" asChild>
          <Link href="/profile">
            <User /> 
            <span>Profile</span>
          </Link>
        </Button>

    </Card>
  )
}

export default Sidebar
