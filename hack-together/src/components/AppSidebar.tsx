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
import { Button } from "./ui/button"

import { useState, useRef, useCallback } from "react"

import { Trash2 } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { useStateTogether } from "react-together"

interface SidebarProps {
  users: User[]
  roomId: String
}

export const AppSidebar: React.FC<SidebarProps> = ({ users, roomId }) => {

  const [answers, setAnswers] = useStateTogether('answers', ['']);

  void answers;

  const answerRefs = useRef(['', '', '']);

  // Function to add a new answer input reference
  const addAnswerInput = () => {
    answerRefs.current.push('');
    forceUpdate();
  };

  // Function to remove a specific answer input reference
  const removeAnswerInput = (index : number) => {
    answerRefs.current.splice(index, 1);
    forceUpdate();
  };

  // Force update to re-render without using useState
  const [, updateState] = useState<unknown>();
  const forceUpdate = useCallback(() => updateState({}), []);

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
      void error;
      toast({
        description: "Failed to copy Room ID",
        variant: "destructive",
      })
    }
  }

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
          <SidebarGroupLabel>Teacher</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {users.length > 0 ? (
                users.map((user) =>
                  user.role === Role.Teacher ? (
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
                    <span>No teachers online</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
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
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-48">Create Question Pool</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Create Question Pool</DialogTitle>
                        <DialogDescription>
                          Type your question and possible answers. Click save when you're done.
                        </DialogDescription>
                      </DialogHeader>

                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Input
                            id="question"
                            className="col-span-3"
                            placeholder="Question"
                          />
                        </div>
                      </div>

                      {/* Dynamic Answer Inputs */}
                      {answerRefs.current.map((_, index) => (
                        <div key={index} className="grid grid-cols-5 gap-5 py-2 items-center">
                          <Input
                            placeholder={`Answer ${index + 1}`}
                            className="col-span-4"
                          />
                          <Button
                            onClick={() => removeAnswerInput(index)}
                            className="col-span-1 bg-red-500 text-white"
                          >
                            <Trash2 />
                          </Button>
                        </div>
                      ))}

                      {/* Add Answer Button */}
                      <Button onClick={addAnswerInput} className="mt-2 w-full text-white">
                        Add Answer
                      </Button>

                      <DialogFooter>
                        <Button type="submit" onClick={ () => {setAnswers(answerRefs.current)}}>Submit</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </SidebarMenuButton>
              </SidebarMenuItem>  
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-48">Ask for Doubts</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Create Question Pool</DialogTitle>
                      <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input
                          id="name"
                          defaultValue="Pedro Duarte"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                          Username
                        </Label>
                        <Input
                          id="username"
                          defaultValue="@peduarte"
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                </SidebarMenuButton>
              </SidebarMenuItem>  
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