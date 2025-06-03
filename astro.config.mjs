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
            },
        }),
      ],
      title: 'CyberSec Blog',
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
      sidebar: [
          {
              label: 'Introduction',
              items: [
                  // Each item here is one entry in the navigation menu.
                  { label: 'whoami', slug: 'index' },
                  { label: 'My road to OSCP+', slug: 'introduction/oscp' },    	
              ],
          },
          {
              label: 'CTF Writeups',
              items: [
                  { 
                      label: 'Proving Grounds',
                      items: [
                          { label: 'WallpaperHub', slug: 'provinggrounds/wallpaperhub' },
                      ],
                  },
                  { 
                      label: 'HTB',
                      items: [

                      ],
                  },
              ]
          },
          {
            label: 'Testing',
            items: [
                // Each item here is one entry in the navigation menu.
                { label: 'testing', slug: 'testing/test' },    	
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