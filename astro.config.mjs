// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { remarkReadingTime } from './src/utils/readingTime';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import starlightMarkDownBlocks, { Aside } from 'starlight-markdown-blocks';

// https://astro.build/config
export default defineConfig({
  integrations: [starlight({
      plugins: [
        starlightMarkDownBlocks({
            blocks: {
                idea: Aside({ label: 'Idea', color: 'green', icon: '💡 ' }),
                summary: Aside({ label: 'Summary', color: 'blue', icon: '📝 ' }),
                success: Aside({ label: 'Success', color: 'green', icon: '✅ ' }),
                fail: Aside({ label: 'Fail', color: 'red', icon: '❌ ' }),
                bug: Aside({ label: 'Bug', color: 'red', icon: '🐞 ' }),
                important: Aside({ label: 'Important', color: 'green', icon: '⚠ ' }),
                quote: Aside({ label: 'Quote', color: 'purple', icon: '❝ ' }),
            },
            }),
      ],
      title: 'MAXSEC',
      customCss: [
        './src/styles/global.css',
      ],
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/MaxK9999' },
        { icon: 'linkedin', label: 'Linkedin', href: 'https://www.linkedin.com/in/maxim-koltypin-05aa0028b/' },
      ],
      sidebar: [
        {
            label: 'About',
            items: [
                // Each item here is one entry in the navigation menu.
                { label: 'whoami', slug: 'introduction/whoami' },
                { label: 'My road to OSCP+', slug: 'introduction/oscp' },    	
            ],
        },
        {
            label: 'OSCP',
            items: [
            { label: 'Tips for passing OSCP', slug: 'oscp/oscp-guide' },
            ],
        },
        {
            label: 'Proving Grounds Writeups',
            collapsed: true,
            items: [
              { label: 'Access', slug: 'writeups/access' },
              { label: 'Algernon', slug: 'writeups/algernon' },
              { label: 'Apex', slug: 'writeups/apex' },
              { label: 'Astronaut', slug: 'writeups/astronaut' },
              { label: 'Authby', slug: 'writeups/authby' },
              { label: 'BillyBoss', slug: 'writeups/billyboss' },
              { label: 'BitForge', slug: 'writeups/bitforge' },
              { label: 'Blackgate', slug: 'writeups/blackgate' },
              { label: 'Boolean', slug: 'writeups/boolean' },
              { label: 'Bratarina', slug: 'writeups/bratarina' },
              { label: 'BullyBox', slug: 'writeups/bullybox' },
              { label: 'ClamAV', slug: 'writeups/clamav' },
              { label: 'Clue', slug: 'writeups/clue' },
              { label: 'Cockpit', slug: 'writeups/cockpit' },
              { label: 'Codo', slug: 'writeups/codo' },
              { label: 'Craft', slug: 'writeups/craft' },
              { label: 'DVR4', slug: 'writeups/dvr4' },
              { label: 'Exfiltrated', slug: 'writeups/exfiltrated' },
              { label: 'Extplorer', slug: 'writeups/extplorer' },
              { label: 'Fanatastic', slug: 'writeups/fanatastic' },
              { label: 'Fired', slug: 'writeups/fired' },
              { label: 'Flu', slug: 'writeups/flu' },
              { label: 'Hawat', slug: 'writeups/hawat' },
              { label: 'Hepet', slug: 'writeups/hepet' },
              { label: 'Hetemit', slug: 'writeups/hetemit' },
              { label: 'Hokkaido', slug: 'writeups/hokkaido' },
              { label: 'Hunit', slug: 'writeups/hunit' },
              { label: 'Hutch', slug: 'writeups/hutch' },
              { label: 'Internal', slug: 'writeups/internal' },
              { label: 'Jacko', slug: 'writeups/jacko' },
              { label: 'Kevin', slug: 'writeups/kevin' },
              { label: 'Lavita', slug: 'writeups/lavita' },
              { label: 'Levram', slug: 'writeups/levram' },
              { label: 'Mantis', slug: 'writeups/mantis' },
              { label: 'Marketing', slug: 'writeups/marketing' },	
              { label: 'Medjed', slug: 'writeups/medjed' },
              { label: 'Mzeeav', slug: 'writeups/mzeeav' },
              { label: 'Nagoya', slug: 'writeups/nagoya' },
              { label: 'Nibbles', slug: 'writeups/nibbles' },
              { label: 'Nickel', slug: 'writeups/nickel' },
              { label: 'Nukem', slug: 'writeups/nukem' },
              { label: 'Ochima', slug: 'writeups/ochima' },
              { label: 'Payday', slug: 'writeups/payday' },
              { label: 'Pc', slug: 'writeups/pc' },
              { label: 'Pebbles', slug: 'writeups/pebbles' },
              { label: 'Pelican', slug: 'writeups/pelican' },
              { label: 'Peppo', slug: 'writeups/peppo' },
              { label: 'Postfish', slug: 'writeups/postfish' },
              { label: 'Pyloader', slug: 'writeups/pyloader' },
              { label: 'Readys', slug: 'writeups/readys' },
              { label: 'Resourced', slug: 'writeups/resourced' },
              { label: 'Roquefort', slug: 'writeups/roquefort' },
              { label: 'Scrutiny', slug: 'writeups/scrutiny' },
              { label: 'Shenzi', slug: 'writeups/shenzi' },
              { label: 'Slort', slug: 'writeups/slort' },
              { label: 'Snookums', slug: 'writeups/snookums' },
              { label: 'Sorcerer', slug: 'writeups/sorcerer' },
              { label: 'Spidersociety', slug: 'writeups/spidersociety' },
              { label: 'SPX', slug: 'writeups/spx' },
              { label: 'Squid', slug: 'writeups/squid' },
              { label: 'Sybaris', slug: 'writeups/sybaris' },
              { label: 'Twiggy', slug: 'writeups/twiggy' },
              { label: 'Vault', slug: 'writeups/vault' },
              { label: 'Vmdak', slug: 'writeups/vmdak' },
              { label: 'Walla', slug: 'writeups/walla' },
              { label: 'Wallpaperhub', slug: 'writeups/wallpaperhub' },
              { label: 'Wombo', slug: 'writeups/wombo' },
              { label: 'Xposedapi', slug: 'writeups/xposedapi' },
              { label: 'Zab', slug: 'writeups/zab' },
              { label: 'Zenphoto', slug: 'writeups/zenphoto' },
              { label: 'Zipper', slug: 'writeups/zipper' }
            ],
        },
        {
          label: 'Browse by Tag',
          
          items: [
            { label: 'All Tags', slug: 'tags' },
          ],
        },
      ],
      }), react()],
  vite: {
    plugins: [tailwindcss()],
  },
  
  markdown: {
    remarkPlugins: [remarkReadingTime],
    shikiConfig: {
      theme: 'dracula',
    },
  },
});