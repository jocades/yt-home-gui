import {
  ArrowLeftIcon,
  BellIcon,
  MenuIcon,
  MicIcon,
  SearchIcon,
  UploadIcon,
} from 'lucide-react'
import { Button } from '../ui/button'
import { useReducer } from 'react'
import { cn } from '@/lib/utils'
import { UserMenu } from '../user-menu'

export function Header() {
  const [showSearch, toggleSearch] = useReducer((x) => !x, false)

  return (
    <div className='flex gap-10 lg:gap-20 justify-between mb-6'>
      <div
        className={cn(
          'gap-4 items-center flex-shrink-0',
          showSearch ? 'hidden' : 'flex',
        )}
      >
        <Button variant='ghost' size='icon'>
          <MenuIcon />
        </Button>
        <a href='/'>
          <img src='/calacel.png' alt='logo' className='h-6' />
        </a>
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className={cn(
          'flex-grow gap-4 justify-center',
          showSearch ? 'flex' : 'hidden md:flex',
        )}
      >
        <Button
          type='button'
          onClick={toggleSearch}
          variant='ghost'
          size='icon'
          className={cn('flex-shrink-0', !showSearch && 'md:hidden')}
        >
          <ArrowLeftIcon />
        </Button>
        <div className='flex flex-grow max-w-[600px]'>
          <input
            type='search'
            placeholder='Search'
            className='w-full px-4 py-1 border rounded-l-full bg-background shadow-inner outline-none focus:border-blue-500'
          />
          <Button
            variant='secondary'
            className='rounded-l-none rounded-r-full border border-l-0'
          >
            <SearchIcon className='h-4' />
          </Button>
        </div>
        <Button
          type='button'
          variant='secondary'
          size='icon'
          className='flex-shrink-0'
        >
          <MicIcon />
        </Button>
      </form>

      <div
        className={cn('flex-shrink-0 md:gap-2', showSearch ? 'hidden' : 'flex')}
      >
        <Button
          onClick={toggleSearch}
          variant='ghost'
          size='icon'
          className='md:hidden'
        >
          <SearchIcon className='h-5' />
        </Button>
        <Button variant='ghost' size='icon'>
          <UploadIcon />
        </Button>
        <Button variant='ghost' size='icon'>
          <BellIcon />
        </Button>
        <UserMenu />
      </div>
    </div>
  )
}
