// import { Locale } from '@/i18n.config'
// import { getDictionary } from '@/lib/dictionary'

import { getDictionary } from "@/app/utils/dictionaries"
import { Locale } from "@/i18n/i18n-config"

export default async function About({params: { lang }}: {params: { lang: Locale }}) {
  const { page} = await getDictionary(lang)

  return (
    <section className='py-24'>
      <div className='container'>
        <h1 className='text-3xl font-bold'>{page.about.title}</h1>
        <p className='text-gray-500'>{page.about.description}</p>
      </div>
    </section>
  )
}