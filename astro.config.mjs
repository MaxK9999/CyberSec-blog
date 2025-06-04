// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { remarkReadingTime } from './src/utils/readingTime';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import starlightSiteGraph from 'starlight-site-graph'
import starlightMarkDownBlocks, { Aside } from 'starlight-markdown-blocks';
import starlightObsidian, { obsidianSidebarGroup } from 'starlight-obsidian';

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
              { label: 'OSCP Checklist', slug: 'oscp/oscp-checklist' },
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