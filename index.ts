// scraper.ts
import axios from 'axios';
import * as cheerio from 'cheerio';
import prisma from './db';

interface RepoData {
  name: string;
  description: string | null;
  language: string;
  topics: string[] | null;
  lastUpdated: Date;
  url: string;
}

const scrapeGitHub = async (username: string): Promise<void> => {
  try {
    const {data} = await axios.get(`https://github.com/${username}?tab=repositories`);
    const $ = cheerio.load(data);

    const repos: RepoData[] = [];

    $('.col-12.d-flex.flex-justify-between.width-full.py-4.border-bottom.color-border-muted.public.source').each((_,element)=>{
        const name = $(element).find("h3.wb-break-all");
        const namee = $(name).find("a").text().trim();
        const lang = $(element).find('span[itemprop="programmingLanguage"]').text().trim();
        const description = $(element).find("p.col-9.d-inline-block.color-fg-muted.mb-2.pr-4").text().trim() || null;
        const lastUpdated = $(element).find("relative-time").attr("datetime");
        const topicsArray = $(element).find('.topics-row-container .topic-tag').map((_, topic) => {
            return $(topic).text().trim(); // Get the text of each topic
        }).get();
        const url = "https://github.com/Veer-Parikh/" + namee;

    })
  } catch (error) {
    console.error(error);
  }
};

// Example usage
scrapeGitHub('Veer-Parikh').finally(async () => {
  await prisma.$disconnect();
});
