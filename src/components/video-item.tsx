import { fmt, time } from '@/lib/time'

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
  return (
    <div className='flex flex-col gap-2'>
      <a href={`/watch?v=${id}`} className='relative aspect-video'>
        <img
          src={thumbnailUrl}
          alt={title}
          className='block w-full h-full object-cover rounded-lg'
        />
        <div className='absolute bottom-0 right-0 bg-primary text-primary-foreground text-sm px-1 rounded'>
          {time.duration(duration)}
        </div>
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
