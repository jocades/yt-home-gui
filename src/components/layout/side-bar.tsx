import {
  ClapperboardIcon,
  HomeIcon,
  LibraryIcon,
  RepeatIcon,
} from 'lucide-react'
import { ElementType } from 'react'
import { buttonVariants } from '../ui/button'

interface SideBarProps {}

export function SideBar({}: SideBarProps) {
  return (
    <aside className='sticky top-0 flex flex-col lg:hidden pb-4 overflow-auto-y-auto scrollbar-hidden'>
      {compactItems.map((item) => (
        <CompactSideBarItem key={item.title} {...item} />
      ))}
    </aside>
  )
}

interface CompactSideBarItemProps {
  Icon: ElementType
  title: string
  href: string
}

function CompactSideBarItem({ Icon, title, href }: CompactSideBarItemProps) {
  return (
    <a
      href={href}
      className={buttonVariants({ variant: 'ghost', className: 'flex-col' })}
    >
      <Icon className='w-6 h-6' />
      <div className='text-sm'>{title}</div>
    </a>
  )
}

const compactItems = [
  {
    Icon: HomeIcon,
    title: 'Home',
    href: '/',
  },
  {
    Icon: RepeatIcon,
    title: 'Shorts',
    href: '/',
  },
  {
    Icon: ClapperboardIcon,
    title: 'Subscriptions',
    href: '/',
  },
  {
    Icon: LibraryIcon,
    title: 'Library',
    href: '/',
  },
] satisfies CompactSideBarItemProps[]
