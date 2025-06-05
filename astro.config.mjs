// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { remarkReadingTime } from './src/utils/readingTime';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import starlightSiteGraph from 'starlight-site-graph'
import starlightMarkDownBlocks, { Aside } from 'starlight-markdown-blocks';

// https://astro.build/config
export default defineConfig({
  integrations: [starlight({
      plugins: [
        starlightSiteGraph(),
        starlightMarkDownBlocks({
            blocks: {
                idea: Aside({ label: 'Idea', color: 'green', icon: '💡' }),
                summary: Aside({ label: 'Summary', color: 'blue', icon: '👀' }),
            },
            }),
      ],
      title: 'CyberSec Blog',
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
      sidebar: [
        {
            label: 'About',
            items: [
                // Each item here is one entry in the navigation menu.
                { label: 'whoami', slug: 'introduction/whoami' },
                { label: 'My road to OSCP+', slug: 'introduction/oscp' },    	
            ],
        },
        // {
        //    label: 'OSCP',
        //    items: [
        //      { label: 'OSCP Checklist', slug: 'oscp/oscp-checklist' },
        //    ],
        //},
        {
            label: 'Proving Grounds Writeups',
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