import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('https://modelteaching.com/wp-content/uploads/2019/04/Classroom-Procedures-min.jpg')"
      }}
    >
      <main className="text-center bg-black bg-opacity-70 p-8 rounded-lg w-full max-w-md shadow-xl">
        <h1 className="text-5xl font-bold text-white mb-8 leading-tight">
          School
          <br />
          Together
        </h1>
        <div className="space-y-4 flex flex-col justify-center">
          <Button className="w-full px-8 py-3 text-lg font-semibold bg-green-500 hover:bg-green-600 text-white transition-colors duration-200">
            Join
          </Button>
          <Button className="w-full px-8 py-3 text-lg font-semibold bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200">
            Create
          </Button>
        </div>
      </main>
    </div>
  )
}