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
} from "./ui/sidebar";
import { Role, User } from "../Schemas/Schemas";
import { ClipboardCopy } from 'lucide-react';
import { useToast } from "../hooks/use-toast";
import { Button } from "./ui/button";
import { useState } from "react";
import QRCode from "react-qr-code";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

interface SidebarProps {
  users: User[];
  roomId: string;
}

export const AppSidebar: React.FC<SidebarProps> = ({ users, roomId }) => {
  const { toast } = useToast();
  const [isQrDialogOpen, setIsQrDialogOpen] = useState(false);

  const handleCopyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast({
        description: "Room ID copied successfully!",
        duration: 2000,
      });
    } catch (error) {
      toast({
        description: "Failed to copy Room ID",
        variant: "destructive",
      });
    }
  };

  const roomUrl = `https://hack-together.vercel.app/room/${roomId}`;

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenuItem className="flex items-left ml-6">
                <span className="font-black text-xl">LEARN TOGETHER.</span>
              </SidebarMenuItem>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </SidebarHeader>

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
                <div className="flex items-center space-x-2">
                  <SidebarMenuButton asChild onClick={handleCopyRoomId} className="cursor-pointer">
                    <div className="flex items-center">
                      <span>{roomId}</span>
                      <ClipboardCopy className="h-4 w-4 ml-2" />
                    </div>
                  </SidebarMenuButton>

                  {/* QR Code Dialog Trigger */}
                  <Dialog open={isQrDialogOpen} onOpenChange={setIsQrDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="icon" variant="outline" onClick={() => setIsQrDialogOpen(true)}>
                        QR
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Scan to Join Room</DialogTitle>
                        <DialogDescription>Use this QR code to join the room:</DialogDescription>
                      </DialogHeader>
                      <div className="flex justify-center my-4" style={{ background: 'white', padding: '16px' }}>
                        <QRCode
                          value={roomUrl}
                          size={256}
                          bgColor="#FFFFFF"
                          fgColor="#000000"
                          level="L"
                        />
                      </div>
                      <DialogFooter>
                        <Button onClick={() => setIsQrDialogOpen(false)}>Close</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
};
