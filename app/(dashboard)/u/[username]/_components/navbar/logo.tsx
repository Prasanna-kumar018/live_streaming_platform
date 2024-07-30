import Image from 'next/image'
import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const font = Poppins({
    subsets: ["latin"],
    weight: ["200","300","400", "500", "600", "700", "800"]
})

export const Logo = () =>
{
    return (
      <Link href={"/"} prefetch={false} className="flex gap-2 items-center">
        <div
          className="flex items-center gap-x-4 hover:opacity-75 
            transition "
        >
          <div className="bg-white rounded-full p-1 ">
            <Image
              src="/game_hub.png"
              width={60}
              height={60}
              className="
                        overflow-hidden
                        rounded-full scale-110"
              alt="Gamehub"
            />
          </div>
        </div>
        <div className={cn(font.className, "hidden lg:block ")}>
          <p className="text-lg font-semibold">Gamehub</p>
          <p className="text-xs text-muted-foreground">Creater DashBoard</p>
        </div>
      </Link>
    );    
}