import { useToggle } from '@/hooks/use-toggle'
import { fmt, time } from '@/lib/time'
import { cn } from '@/lib/utils'
import { useEffect, useRef } from 'react'

interface Channel {
  id: string
  name: string
  profileUrl: string
}

interface VideoItemProps {
  id: string
  title: string
  channel: Channel
  views: number
  postedAt: Date
  duration: number
  thumbnailUrl: string
  videoUrl: string
}

export function VideoItem({
  id,
  title,
  channel,
  views,
  postedAt,
  duration,
  thumbnailUrl,
  videoUrl,
}: VideoItemProps) {
  const [playing, togglePlaying] = useToggle()
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!ref.current) return
    if (playing) {
      ref.current.currentTime = 0
      ref.current.play()
    } else {
      ref.current.pause()
    }
  }, [playing])

  return (
    <div
      onMouseEnter={() => togglePlaying(true)}
      onMouseLeave={() => togglePlaying(false)}
      className='flex flex-col gap-2'
    >
      <a href={`/watch?v=${id}`} className='relative aspect-video'>
        <img
          src={thumbnailUrl}
          alt={title}
          className={cn(
            'block w-full h-full object-cover transition-[border-radius] duration-200',
            playing ? 'rounded-none' : 'rounded-lg',
          )}
        />
        <div className='absolute bottom-0 right-0 bg-primary text-primary-foreground text-sm px-1 rounded'>
          {time.duration(duration)}
        </div>
        <video
          ref={ref}
          src={videoUrl}
          muted
          playsInline
          className={cn(
            'absolute block h-full object-cover inset-0 transition-opacity duration-200',
            playing ? 'opacity-100 delay-200' : 'opacity-0',
          )}
        />
      </a>
      <div className='flex gap-2'>
        <a href={`/@${channel.id}`} className='flex-shrink-0'>
          <img className='w-10 h-10 rounded-full' src={channel.profileUrl} />
        </a>
        <div className='flex flex-col'>
          <a href={`/watch?v=${id}`} className='font-semibold'>
            {title}
          </a>
          <a href={`/@${channel.id}`} className='text-muted-foreground text-sm'>
            {channel.name}
          </a>
          <div className='text-muted-foreground text-sm'>
            {fmt.compact(views)} views • {time.ago(postedAt)}
          </div>
        </div>
      </div>
    </div>
  )
}
