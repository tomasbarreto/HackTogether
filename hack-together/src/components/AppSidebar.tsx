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
} from "../components/ui/dialog";

interface SidebarProps {
  users: User[]
  roomId: String
  currentUserId: string
}

export const AppSidebar: React.FC<SidebarProps> = ({ users, roomId, currentUserId }) => {

  useEffect(() => {
    setQuestion(['']);
    setAnswers(['']);
  }, [roomId]);

  const currUser = users.find(user => user.id === currentUserId);

  const [answers, setAnswers] = useStateTogether('answers', ['']);
  const [question, setQuestion] = useStateTogether('question', ['']);

  const handleAnswerChange = (index: number, value: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const handleQuestionChange = ( value: string) => {
    const updatedQuestion = [...question];
    updatedQuestion[0] = value;
    setQuestion(updatedQuestion);
  };

  // Function to add a new answer input reference
  const addAnswerInput = () => {
    setAnswers([...answers, '']);
  };

  // Function to remove a specific answer input reference
  const removeAnswerInput = (index : number) => {
    const updatedAnswers = answers.filter((_, i) => i !== index);
    setAnswers(updatedAnswers);
  };

  const handlePollSubmission = () => {
    setQuestion(question);  // Updates shared question
    setAnswers(answers);    // Updates shared answers
  };

  const { toast } = useToast()
  
  console.log(users.length)

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
      { currUser?.role === Role.Teacher && (
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
                              onChange={(e) => handleQuestionChange(e.target.value)}
                            />
                          </div>
                        </div>

                        {/* Dynamic Answer Inputs */}
                        {answers.map((_, index) => (
                          <div key={index} className="grid grid-cols-5 gap-5 py-2 items-center">
                            <Input
                              placeholder={`Answer ${index + 1}`}
                              className="col-span-4"
                              onChange={(e) => handleAnswerChange(index, e.target.value)}
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
                          <DialogTrigger>
                            <Button type="submit" onClick={ () => {
                              handlePollSubmission();
                              }}>Submit</Button>
                          </DialogTrigger>
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
        </SidebarContent>)}
        {currUser?.role === Role.Student && question[0] && (
        <Dialog open={Boolean(question[0])}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Question Poll</DialogTitle>
              <DialogDescription>
                {question[0]}
              </DialogDescription>
            </DialogHeader>
            
            {/* Display all possible answers */}
            {answers.map((answer, index) => (
              <div key={index} className="py-2">
                <span>{answer}</span>
              </div>
            ))}
            
            <DialogFooter>
              <Button onClick={() => {/* Submit student's answer logic */}}>Submit Answer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
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
  );
};
