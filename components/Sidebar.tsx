import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { BellIcon, HomeIcon, User } from "lucide-react"

const Sidebar = () => {
  return (
    <Card className="flex flex-col gap-2 justify-start py-2 pl-4 items-start">
      <Button variant="ghost">
        <HomeIcon /> Home
      </Button>

      <Button variant="ghost">
        <BellIcon /> Notifications
      </Button>

      <Button variant="ghost">
        <User /> Profile
      </Button>
    </Card>
  )
}

export default Sidebar
