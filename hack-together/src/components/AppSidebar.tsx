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

import { useEffect, useState } from "react"

import { Trash2 } from 'lucide-react';

import { Progress } from "../components/ui/progress"

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

import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"

interface SidebarProps {
  users: User[]
  roomId: String
  currentUserId: string
}

export const AppSidebar: React.FC<SidebarProps> = ({ users, roomId, currentUserId }) => {

  const [progress, setProgress] = useState(0);  // Initialize progress state

  useEffect(() => {
    // Set an interval to increment the progress every 300ms
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress >= 100) {
          clearInterval(interval);  // Clear the interval when it reaches 100
          return 100;
        }
        return prevProgress + 1;  // Increment progress
      });
    }, 300);  // Set the interval to 300ms for smoother progress (adjust as needed)

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []); 

  useEffect(() => {
    setQuestion(['']);
    setAnswers(['']);
  }, [roomId]);

  const [showDoubtsToast, setShowDoubtsToast] = useStateTogether('showDoubtsToast', false);

  const handleAskForDoubts = () => {
    // Only trigger for students
    if (currUser?.role === Role.Teacher) {
      setShowDoubtsToast(true);
    }
  };

  const currUser = users.find(user => user.id === currentUserId);
  const { toast } = useToast()

  useEffect(() => {
    // Only show toast if current user is a student and `showDoubtsToast` is true
    if (currUser?.role === Role.Student && showDoubtsToast) {
      toast({
        description: "Any Doubts?",
        action: (
          <>
            <div className="flex flex-col">
              <div className="flex flex-row">
                <Button className="bg-green-900">Yes</Button>
              </div>
              <Progress value={progress} className="w-[150%]" />
            </div>
          </>
        ),
        duration: 30000
      });
      // Reset state after displaying toast
      setShowDoubtsToast(false);
    }
  }, [showDoubtsToast, currUser, toast, setShowDoubtsToast]);

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
                          <DialogTitle>Create Question Poll</DialogTitle>
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
                      <Button className="w-48" onClick={handleAskForDoubts}>
                        Ask for Doubts
                        </Button>
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
            
              <div className="py-2">
                <RadioGroup defaultValue="comfortable">
                {answers.map((answer, index) => (
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={answer} id={index.toString()} />
                    <Label htmlFor={index.toString()}>{answer}</Label>
                  </div>
                  ))}
                </RadioGroup>
              </div>
            
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
  )
}