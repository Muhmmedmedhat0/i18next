import { Locale } from '@/i18n/i18n-config'
import Link from 'next/link'
import LocaleSwitcher from './locale-switcher'
import { getDictionary } from '../utils/dictionaries'


export default async function Header({ lang }: { lang: Locale }) {
  const { navigation } = await getDictionary(lang)

  return (
    <header className='container mx-auto py-6'>
      <nav className='flex items-center justify-between'>
        <ul className='flex gap-x-8'>
          <li>
            <Link href={`/${lang}`}>{navigation.home}</Link>
          </li>
          <li>
            <Link href={`/${lang}/about`}>{navigation.about}</Link>
          </li>
        </ul>
        <LocaleSwitcher />
      </nav>
    </header>
  )
}