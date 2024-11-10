import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupContent,
  SidebarMenu,
} from "./ui/sidebar"
import { Role, User } from "../Schemas/Schemas"
import { ClipboardCopy } from 'lucide-react'
import { useToast } from "../hooks/use-toast"

interface SidebarProps {
  users: User[]
  roomId: String
}

export const AppSidebar: React.FC<SidebarProps> = ({ users, roomId }) => {
  const { toast } = useToast()
  
  console.log(users.length)

  const handleCopyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId.toString())
      toast({
        description: "Room ID copied successfully!",
        duration: 2000,
      })
    } catch (error) {
      toast({
        description: "Failed to copy Room ID",
        variant: "destructive",
      })
    }
  }

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Students</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {users.length > 0 ? (
                users.map((user) =>
                  user.role === Role.Student ? (
                    <SidebarMenuItem key={user.id}>
                      <SidebarMenuButton asChild>
                        <span>{user.username}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ) : null
                )
              ) : (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <span>No students online</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupLabel>Room ID</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild onClick={handleCopyRoomId} className="cursor-pointer">
                  <div className="flex items-center justify-between w-full">
                    <span>{roomId}</span>
                    <ClipboardCopy className="h-4 w-4" />
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  )
}