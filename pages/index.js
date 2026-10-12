import Link from 'next/link'
import Container from '@/components/Container'
import BlogPost from '@/components/BlogPost'
import { getAllPosts } from '@/lib/notion'
import { TOP10 } from '@/data/top10'
import BLOG from '@/blog.config'
import ArrowRightIcon from '@heroicons/react/24/outline/ArrowRightIcon'
import FireIcon from '@heroicons/react/24/outline/FireIcon'

export async function getStaticProps() {
  const posts = await getAllPosts({ onlyPost: true })
  const availableSlugs = posts.map((p) => p.slug)
  return {
    props: {
      latestPosts: posts.slice(0, 3),
      availableSlugs,
      publishedCount: availableSlugs.filter((s) =>
        TOP10.some((f) => f.slug === s)
      ).length
    },
    revalidate: 60
  }
}

const RankBadge = ({ rank, size }) => {
  const big = size === 'lg'
  return (
    <div
      className={`shrink-0 flex items-center justify-center rounded-2xl font-extrabold bg-gray-900 text-white dark:bg-white dark:text-gray-900 ${
        big ? 'w-14 h-14 text-2xl' : 'w-10 h-10 text-lg'
      }`}
    >
      {rank}
    </div>
  )
}

const StatusPill = ({ ready }) => (
  <span
    className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${
      ready
        ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
        : 'bg-gray-100 text-gray-500 dark:bg-gray-700/60 dark:text-gray-300'
    }`}
  >
    <span className={`w-1.5 h-1.5 rounded-full ${ready ? 'bg-green-500' : 'bg-gray-400'}`} />
    {ready ? 'Rangkuman tersedia' : 'Segera hadir'}
  </span>
)

const FigureCard = ({ figure, ready, featured }) => {
  const inner = (
    <article
      className={`group relative overflow-hidden rounded-2xl p-5 md:p-6 backdrop-blur-sm bg-gray-100/40 dark:bg-gray-800/40 hover:bg-gray-200/40 dark:hover:bg-gray-700/40 transition-all duration-300 cursor-pointer h-full ${
        featured ? 'md:col-span-1' : ''
      }`}
    >
      <div className='flex items-start gap-4'>
        <RankBadge rank={figure.rank} size={featured ? 'lg' : 'md'} />
        <div
          className={`shrink-0 flex items-center justify-center rounded-full font-bold text-white bg-gradient-to-br ${figure.accent} ${
            featured ? 'w-14 h-14 text-lg' : 'w-10 h-10 text-sm'
          }`}
        >
          {figure.initials}
        </div>
        <div className='min-w-0 flex-1'>
          <h3
            className={`font-semibold text-black dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors ${
              featured ? 'text-xl md:text-2xl' : 'text-lg'
            }`}
          >
            {figure.name}
          </h3>
          <p className='text-sm text-gray-500 dark:text-gray-400 truncate'>
            {figure.role} · {figure.company}
          </p>
        </div>
      </div>
      <p className='mt-4 font-light leading-6 text-gray-700 dark:text-gray-300 line-clamp-3'>
        {figure.tagline}
      </p>
      <div className='mt-4 flex items-center justify-between'>
        <StatusPill ready={ready} />
        <span className='inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity'>
          Baca <ArrowRightIcon className='h-4 w-4' />
        </span>
      </div>
    </article>
  )
  return ready ? (
    <Link href={`/${figure.slug}`} scroll={false}>
      {inner}
    </Link>
  ) : (
    <div title='Rangkuman sedang ditulis'>{inner}</div>
  )
}

const Landing = ({ latestPosts, availableSlugs, publishedCount }) => {
  const isReady = (slug) => availableSlugs.includes(slug)
  const top3 = TOP10.slice(0, 3)
  const rest = TOP10.slice(3)

  return (
    <Container
      title={`Top 10 — ${BLOG.title}`}
      description='Rangkuman perjalanan 10 pria paling berpengaruh di dunia teknologi.'
    >
      {/* HERO */}
      <section className='text-center pt-6 md:pt-10 pb-10 md:pb-14'>
        <span className='inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300'>
          <FireIcon className='h-4 w-4' /> Top 10 Series
        </span>
        <h1 className='mt-5 text-3xl md:text-5xl font-extrabold leading-tight text-black dark:text-white'>
          10 Pria Paling Berpengaruh
          <br />
          di Dunia Teknologi
        </h1>
        <p className='mt-4 max-w-xl mx-auto font-light md:text-lg text-gray-600 dark:text-gray-300'>
          Dari Elon Musk sampai Jensen Huang — rangkuman perjalanan, strategi,
          dan pelajaran hidup dari orang-orang yang membentuk masa depan.
        </p>
        <div className='mt-7 flex flex-col sm:flex-row items-center justify-center gap-3'>
          <a
            href='#top-10'
            className='w-full sm:w-auto inline-flex justify-center items-center gap-2 px-6 py-3 rounded-xl font-medium text-white bg-gray-900 hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 transition-colors'
          >
            Mulai dari peringkat #1 <ArrowRightIcon className='h-4 w-4' />
          </a>
          <Link href='/main' scroll={false}>
            <span className='w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 rounded-xl font-medium cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100 transition-colors'>
              Semua tulisan
            </span>
          </Link>
        </div>
        <div className='mt-8 flex items-center justify-center gap-6 md:gap-10 text-center'>
          <div>
            <p className='text-2xl md:text-3xl font-extrabold text-black dark:text-white'>10</p>
            <p className='text-xs md:text-sm text-gray-500 dark:text-gray-400'>Tokoh</p>
          </div>
          <div className='w-px h-10 bg-gray-200 dark:bg-gray-700' />
          <div>
            <p className='text-2xl md:text-3xl font-extrabold text-black dark:text-white'>{publishedCount}</p>
            <p className='text-xs md:text-sm text-gray-500 dark:text-gray-400'>Rangkuman terbit</p>
          </div>
          <div className='w-px h-10 bg-gray-200 dark:bg-gray-700' />
          <div>
            <p className='text-2xl md:text-3xl font-extrabold text-black dark:text-white'>{latestPosts.length}</p>
            <p className='text-xs md:text-sm text-gray-500 dark:text-gray-400'>Tulisan terbaru</p>
          </div>
        </div>
      </section>

      {/* TOP 3 */}
      <section id='top-10' className='scroll-mt-24'>
        <h2 className='text-xl md:text-2xl font-bold text-black dark:text-white mb-4'>
          Tiga Besar
        </h2>
        <div className='grid gap-4 md:grid-cols-3'>
          {top3.map((f) => (
            <FigureCard key={f.slug} figure={f} ready={isReady(f.slug)} featured />
          ))}
        </div>
      </section>

      {/* 4–10 */}
      <section className='mt-8'>
        <h2 className='text-xl md:text-2xl font-bold text-black dark:text-white mb-4'>
          Peringkat 4 – 10
        </h2>
        <div className='grid gap-4 md:grid-cols-2'>
          {rest.map((f) => (
            <FigureCard key={f.slug} figure={f} ready={isReady(f.slug)} />
          ))}
        </div>
      </section>

      {/* LATEST POSTS */}
      {latestPosts.length > 0 && (
        <section className='mt-12'>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-xl md:text-2xl font-bold text-black dark:text-white'>
              Rangkuman terbaru
            </h2>
            <Link href='/main' scroll={false}>
              <span className='inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 cursor-pointer'>
                Semua <ArrowRightIcon className='h-4 w-4' />
              </span>
            </Link>
          </div>
          {latestPosts.map((post) => (
            <BlogPost key={post.id} post={post} />
          ))}
        </section>
      )}
    </Container>
  )
}

export default Landing
