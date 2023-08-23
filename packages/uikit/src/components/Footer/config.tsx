import { Language } from "../LangSelector/types";
import { FooterLinkType } from "./types";
import { TwitterIcon, TelegramIcon, RedditIcon, InstagramIcon, GithubIcon, DiscordIcon, MediumIcon } from "../Svg";

export const footerLinks: FooterLinkType[] = [
  {
    label: "About",
    items: [
      {
        label: "Contact",
        href: "https://docs.tytan.finance/contact-us",
      },
      {
        label: "Blog",
        href: "https://pancakeswap.medium.com/",
      },
      {
        label: "Community",
        href: "https://docs.tytan.finance/contact-us/telegram",
      },
      {
        label: "CAKE",
        href: "https://docs.tytan.finance/tokenomics/cake",
      },
      {
        label: "—",
      },
      {
        label: "Online Store",
        href: "https://pancakeswap.creator-spring.com/",
        isHighlighted: true,
      },
    ],
  },
  {
    label: "Help",
    items: [
      {
        label: "Customer",
        href: "Support https://docs.tytan.finance/contact-us/customer-support",
      },
      {
        label: "Troubleshooting",
        href: "https://docs.tytan.finance/help/troubleshooting",
      },
      {
        label: "Guides",
        href: "https://docs.tytan.finance/get-started",
      },
    ],
  },
  {
    label: "Developers",
    items: [
      {
        label: "Github",
        href: "https://github.com/pancakeswap",
      },
      {
        label: "Documentation",
        href: "https://docs.tytan.finance",
      },
      {
        label: "Bug Bounty",
        href: "https://app.gitbook.com/@pancakeswap-1/s/pancakeswap/code/bug-bounty",
      },
      {
        label: "Audits",
        href: "https://docs.tytan.finance/help/faq#is-pancakeswap-safe-has-pancakeswap-been-audited",
      },
      {
        label: "Careers",
        href: "https://docs.tytan.finance/hiring/become-a-chef",
      },
    ],
  },
];

export const socials = [
  {
    label: "Twitter",
    icon: TwitterIcon,
    href: "https://orbitalss.link/WbTw",
  },
  {
    label: "Telegram",
    icon: TelegramIcon,
    href: "https://orbitalss.link/WbTG"
    // items: [
    //   {
    //     label: "English",
    //     href: "https://t.me/pancakeswap",
    //   },
    //   {
    //     label: "Bahasa Indonesia",
    //     href: "https://t.me/PancakeSwapIndonesia",
    //   },
    //   {
    //     label: "中文",
    //     href: "https://t.me/PancakeSwap_CN",
    //   },
    //   {
    //     label: "Tiếng Việt",
    //     href: "https://t.me/PancakeSwapVN",
    //   },
    //   {
    //     label: "Italiano",
    //     href: "https://t.me/pancakeswap_ita",
    //   },
    //   {
    //     label: "русский",
    //     href: "https://t.me/pancakeswap_ru",
    //   },
    //   {
    //     label: "Türkiye",
    //     href: "https://t.me/pancakeswapturkiye",
    //   },
    //   {
    //     label: "Português",
    //     href: "https://t.me/PancakeSwapPortuguese",
    //   },
    //   {
    //     label: "Español",
    //     href: "https://t.me/PancakeswapEs",
    //   },
    //   {
    //     label: "日本語",
    //     href: "https://t.me/pancakeswapjp",
    //   },
    //   {
    //     label: "Français",
    //     href: "https://t.me/pancakeswapfr",
    //   },
    //   {
    //     label: "Deutsch",
    //     href: "https://t.me/PancakeSwap_DE",
    //   },
    //   {
    //     label: "Filipino",
    //     href: "https://t.me/Pancakeswap_Ph",
    //   },
    //   {
    //     label: "ქართული ენა",
    //     href: "https://t.me/PancakeSwapGeorgia",
    //   },
    //   {
    //     label: "Announcements",
    //     href: "https://t.me/PancakeSwapAnn",
    //   },
    // ],
  },
  // {
  //   label: "Reddit",
  //   icon: RedditIcon,
  //   href: "https://reddit.com/r/pancakeswap",
  // },
  {
    label: "Discord",
    icon: DiscordIcon,
    href: "https://orbitalss.link/WbDc",
  },
  {
    label: "Medium",
    icon: MediumIcon,
    href: "https://pancakeswap.medium.com/",
  },
  {
    label: "Instagram",
    icon: InstagramIcon,
    href: "https://instagram.com/pancakeswap_official",
  },
];

export const langs: Language[] = [...Array(20)].map((_, i) => ({
  code: `en${i}`,
  language: `English${i}`,
  locale: `Locale${i}`,
}));
