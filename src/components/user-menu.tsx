import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/contexts/theme'
import { GithubIcon, MoonIcon, SunIcon, UserIcon } from 'lucide-react'

export function UserMenu() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon'>
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-[200px]'>
        <DropdownMenuLabel className='flex gap-2'>
          <GithubIcon className='h-5' />
          <a
            href='https://github.com/jocades'
            target='_blank'
            rel='noreferrer'
            className='font-semibold text-muted-foreground hover:text-accent-foreground transition-colors'
          >
            @jocades
          </a>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          <SunIcon className='rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 h-5 mr-2' />
          <MoonIcon className='absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 h-5 mr-2' />
          Appearance
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
