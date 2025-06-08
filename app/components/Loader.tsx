import { Loader2 } from "lucide-react"

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="w-12 h-12 animate-spin text-[#1B4D2A]" />
    </div>
  )
}

