import { LinkedinIcon, XIcon, YoutubeIcon, FacebookIcon, InstagramIcon } from "@/icons";
import { PhoneIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/solid'

// NAVIGATION
export const NAV_LINKS = [
  { href: '/', key: 'home', label: 'Inicio' },
  { href: '/academies', key: 'academies', label: 'Academias' },
  { href: '/contact-us', key: 'contact_us', label: 'Contáctanos' }
];

export const SEC_NAV_LINKS = [
  { href: '/login', key: 'login', label: 'Inicia sesión' },
  { href: '/register', key: 'register', label: 'Registrarse' },
];

// CAMP SECTION
export const PEOPLE_URL = [
  '/person-1.png',
  '/person-2.png',
  '/person-3.png',
  '/person-4.png',
];

// FEATURES SECTION
export const FEATURES = [
  {
    title: 'Real maps can be offline',
    icon: '/map.svg',
    variant: 'green',
    description:
      'We provide a solution for you to be able to use our application when climbing, yes offline maps you can use at any time there is no signal at the location',
  },
  {
    title: 'Set an adventure schedule',
    icon: '/calendar.svg',
    variant: 'green',
    description:
      "Schedule an adventure with friends. On holidays, there are many interesting offers from Hilink. That way, there's no more discussion",
  },
  {
    title: 'Technology using augment reality',
    icon: '/tech.svg',
    variant: 'green',
    description:
      'Technology uses augmented reality as a guide to your hiking trail in the forest to the top of the mountain. Already supported by the latest technology without an internet connection',
  },
  {
    title: 'Many new locations every month',
    icon: '/location.svg',
    variant: 'orange',
    description:
      'Lots of new locations every month, because we have a worldwide community of climbers who share their best experiences with climbing',
  },
];

// FOOTER SECTION
export const FOOTER_LINKS = [
  {
    title: 'Contáctanos',
    links: [
      { icon: MapPinIcon, label: 'Colombia, Ecuador, España, LATAM'},
      { icon: PhoneIcon, label: 'Colombia +57 312 888 28 28'},
      { icon: PhoneIcon, label: 'Ecuador +59 399 328 1056'},
      { icon: ClockIcon, label: 'Lunes a Viernes 8 AM a 6 PM'},
    ],
  }
];



export const FOOTER_CONTACT_INFO = {
  title: 'Nuestros Sitios',
  links: [
    { label: 'SIG ISWO Software', href: 'https://iswo.com.co/software/' },
    { label: 'Blog', href: 'https://iswo.com.co/blog/' },
    { label: 'ISWO', href: 'https://iswo.com.co/nosotros/' },
    { label: 'PQRSF',  href: 'https://www.sigiswo.com/portals/39687647-e214-43d6-8e21-e957e3ec8dd8/pqrsfs' },
  ],
};

export const SOCIALS = {
  title: 'Síguenos',
  links: [
    { icon: InstagramIcon, label: 'Nuestro Instagram', href: 'https://www.instagram.com/iswo_sas/', class: 'text-pink-600 hover:text-pink-900' },
    { icon: FacebookIcon, label: 'Nuestro Facebook', href: 'https://www.facebook.com/ISWOSAS/', class: 'text-blue-600 hover:text-blue-900' },
    { icon: YoutubeIcon, label: 'Nuestro YouTube', href: 'https://www.youtube.com/@sigiswo', class: 'text-red-600 hover:text-black-900' },
    { icon: XIcon, label: 'Nuestro Twitter', href: 'https://twitter.com/ISWOSAS', class: 'text-black-600 hover:text-pink-900' },
    { icon: LinkedinIcon, label: 'Nuestro linkedIn', href: 'https://www.linkedin.com/company/iswo', class: 'text-blue-600 hover:text-blue-900' },
    //{ icon: IcontecIswoIcon, label: 'PQRSF',  href: '' },
  ],
};

//Courses Cards
export const COURSE_CARD_TITLES = {
  in_progress_title: 'Los cursos en progreso son:',
  acquired_title: 'Los cursos en los que estas interesado son:',
  ended_title: 'Los cursos que has finalizado son:'
}
