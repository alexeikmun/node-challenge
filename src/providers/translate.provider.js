import i18n from 'i18n'

const setupTranslate = (directory, defaultLocale) => i18n.configure({
  locales: ['en', 'es'],
  directory,
  defaultLocale
})

export default setupTranslate
