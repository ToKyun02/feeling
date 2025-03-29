import { useTheme } from '@/providers/ThemeProvider';

export default function LogoIcon({ isCircle = false }: { isCircle?: boolean }) {
  const theme = useTheme();
  return (
    <svg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='logoGradient' x1='0%' y1='0%' x2='100%' y2='0%'>
          <stop offset='0%' stopColor={theme.colors.secondary} />
          <stop offset='100%' stopColor={theme.colors.primary} />
        </linearGradient>
      </defs>

      {isCircle && <circle cx='30' cy='30' r='28' fill='white' stroke='url(#logoGradient)' strokeWidth='2' />}

      <path
        d='M30,42 C30,42 18,34 18,26 C18,22 21,19 25,19 C27,19 29,20 30,22 C31,20 33,19 35,19 C39,19 42,22 42,26 C42,34 30,42 30,42 Z'
        fill='url(#logoGradient)'
      />
    </svg>
  );
}
