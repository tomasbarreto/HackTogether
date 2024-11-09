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
  } from "../components/ui/sidebar"

  import { Role, User } from "../Schemas/Schemas"
  
  interface SidebarProps {
    users: User[];
    roomId: number
  }

  const tempUsers : User[] = [
    {
        id: 1,
        username: "Tomas",
        role: Role.Student
    },
    {
        id: 2,
        username: "Matos",
        role: Role.Student
    },
    {
        id: 3,
        username: "Freitas",
        role: Role.Student
    },
    {
        id: 4,
        username: "Gui",
        role: Role.Student
    },
    {
        id: 5,
        username: "Tiago",
        role: Role.Student
    },
    {
        id: 6,
        username: "Alberto",
        role: Role.Professor
    }
  ]

  export const AppSidebar: React.FC<SidebarProps> = ({ users, roomId }) => {
    return (
      <Sidebar>
        <SidebarHeader />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Students</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {tempUsers.length != 0 ? tempUsers.map((user) => (
                        user.role === Role.Student ? 
                        <SidebarMenuItem key={user.id}>
                            <SidebarMenuButton asChild> 
                                <span key={user.id}>{user.username}</span> 
                            </SidebarMenuButton> 
                        </SidebarMenuItem> : null
                    )) : 
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild> 
                                <span>No students online</span> 
                            </SidebarMenuButton> 
                        </SidebarMenuItem>
                    }
                </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
            <SidebarGroup>
                <SidebarGroupLabel>Rood ID</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild onClick={ async () => {
                                    await navigator.clipboard.writeText("31231231")
                                }}> 
                                    <span>31231231</span> 
                                </SidebarMenuButton> 
                            </SidebarMenuItem>
                    </SidebarMenu>
            </SidebarGroupContent>
            </SidebarGroup>
        </SidebarFooter>
      </Sidebar>
    )
  }

  
  
  
  