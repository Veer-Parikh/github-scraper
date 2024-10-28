// scraper.ts
import axios from 'axios';
import * as cheerio from 'cheerio';
import prisma from './db';
import express from "express"

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

interface RepoData {
    username: string;
    name: string;
    description: string | null;
    language: string;
    topics: string[] | null;
    lastUpdated: Date;
    url: string;
}

const scrapeGitHub = async (usernamee: string): Promise<RepoData[]> => {
    const repos: RepoData[] = [];
    
    const { data } = await axios.get(`https://github.com/${usernamee}?tab=repositories`);
    const $ = cheerio.load(data);
  
    $('.col-12.d-flex.flex-justify-between.width-full.py-4.border-bottom.color-border-muted.public.source').each((_, element) => {
        const username = usernamee;
        const namee = $(element).find("h3.wb-break-all");
        const name = $(namee).find("a").text().trim();
        const language = $(element).find('span[itemprop="programmingLanguage"]').text().trim();
        const description = $(element).find("p.col-9.d-inline-block.color-fg-muted.mb-2.pr-4").text().trim() || null;
    
        const lastUpdatedString = $(element).find("relative-time").attr("datetime");
        const lastUpdated = lastUpdatedString ? new Date(lastUpdatedString) : null;
    
        const topics = $(element).find('.topics-row-container .topic-tag').map((_, topic) => {
            return $(topic).text().trim();
        }).get();
  
      const url = `https://github.com/${username}/` + name;
  
      repos.push({ username, name, description, language, lastUpdated, topics, url });
    });
  
    return repos;
};


app.post('/scrape/:usernamee', async (req:any, res:any) => {
    const { usernamee } = req.params;
    try {
      const repos = await scrapeGitHub(usernamee);
      
      const newRepos = [];
      for (const repo of repos) {
        const existingRepo = await prisma.repo.findFirst({
          where: {
            url: repo.url,
          },
        });
  
        if (!existingRepo) {
          newRepos.push(repo);
        }
      }
  
      if (newRepos.length > 0) {
        await prisma.repo.createMany({ data: newRepos });
        console.log("data saved")
        return res.json({ message: 'New data saved to MongoDB', saved: newRepos.length });
      } else {
        console.log("no new data")
        return res.json({ message: 'No new repositories to save.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to scrape GitHub.' });
    }
  });

const getRepos = async (req:any,res:any) => {
    try {
        const {username} = req.params;
        const repos = await prisma.repo.findMany({
            where:{
                username:username
            }
        });
        console.log("data found successfully");
        return res.send(repos);
    } catch(error){
        console.log(error)
        return res.error(error);
    }
}

app.get("/get/:username",getRepos)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});