import Image from 'next/image'

const Logo = ({ className = '' }) => {
  return (
    <div
      className={`group relative w-8 h-8 flex items-center justify-center ${className}`}
    >
      {/* Animated Blob */}
      <svg
        className='absolute inset-0 w-8 h-8'
        viewBox='0 0 100 100'
        overflow='visible'
      >
        <path
          fill='currentColor'
          className='
            text-gray-100/40
            dark:text-gray-800/40
            group-hover:text-gray-500/20
            dark:group-hover:text-gray-300/20
            transition-all
            duration-300
          '
        >
          <animate
            attributeName='d'
            dur='10s'
            repeatCount='indefinite'
            values='
              M120.1,75.9Q111.8,101.8,88.9,120.9Q65.8,139.8,41.2,123.8Q16.6,107.8,-5.5,93Q-27.6,78.3,-30.5,49Q-33.2,19.8,-9.2,4.2Q14.6,-11.4,38.8,-17Q63,-22.5,81.5,-7.3Q100.1,8.1,114.2,29Q128.4,50,120.1,75.9Z;
              M125,75.8Q111.4,101.5,88.2,118.6Q65,135.9,40.4,122.6Q16.1,109.2,-3.1,92.7Q-22,76.1,-18.6,51Q-15.9,25.8,-0.4,7.8Q15.1,-10,39.1,-17.5Q63.3,-24.7,81.5,-8.1Q99.8,8.4,119.3,29.2Q138.5,50,125,75.8Z;
              M109.4,73.5Q105.4,96.2,84.2,107.9Q62.2,118.2,37.2,117.7Q12.1,115.3,-11.8,98.2Q-36.2,80.2,-34.5,50.3Q-33.4,19.6,-11.6,0.4Q10,-18.2,36.1,-18.6Q62,-18.3,87.8,-10.6Q113.5,-3.3,112.2,23.3Q112.6,50,109.4,73.5Z;
              M120.1,75.9Q111.8,101.8,88.9,120.9Q65.8,139.8,41.2,123.8Q16.6,107.8,-5.5,93Q-27.6,78.3,-30.5,49Q-33.2,19.8,-9.2,4.2Q14.6,-11.4,38.8,-17Q63,-22.5,81.5,-7.3Q100.1,8.1,114.2,29Q128.4,50,120.1,75.9Z'
          />
        </path>
      </svg>

      {/* Logo */}
      <Image
        src='/favicon.svg'
        alt='Logo'
        width={26}
        height={26}
        priority
        className='relative z-10 transition-transform duration-300 group-hover:scale-110'
      />
    </div>
  )
}

export default Logo