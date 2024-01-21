import { Octokit } from "octokit";
import moment from "moment";
import { config } from "dotenv";
config()

const octokit = new Octokit({auth: process.env.AUTH_TOKEN})

async function pullRequests(maxPages: number | null = null, perPage: number | null = null)
{
    const user = await octokit.rest.users.getAuthenticated()
    const prs = []
    let page = 0
    
    while (maxPages === null || page < maxPages) {
        const response = await octokit.rest.search.issuesAndPullRequests({
            q: `is:pr author:${user.data.login}`,
            sort: 'updated',
            order: 'desc',
            page: page,
            per_page: perPage ?? 70
            
        })

        if (response.data.items.length === 0) break
        prs.push(...response.data.items)
        page++
    }     

    for (const pr of prs) {
        const updatedAt = moment(pr.updated_at)
        console.log(`PR ${updatedAt.format('LLL')}: ${pr.title}`);        
    }
    
}




pullRequests(1, 300)