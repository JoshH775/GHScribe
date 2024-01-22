import { Octokit } from "octokit";

import moment from "moment";
import { config } from "dotenv";
import { AuthenticatedUserAlias } from "./types";


config()

const octokit = new Octokit({auth: process.env.AUTH_TOKEN})

interface PullRequestOptions {
    maxPages?: number | null
    perPage?: number | null
    q?: string | null
}


let user: AuthenticatedUserAlias

async function pullRequests(options: PullRequestOptions) { 
    
    if (!user) return 

    const prs = []
    let page = 0

    
    while (true) {
        const response = await octokit.rest.search.issuesAndPullRequests({
            q: options.q ?? `is:pr author:${user.data.login}`,
            sort: 'updated',
            order: 'desc',
            page: page,
            per_page: options.perPage ?? 70

        })

        if (response.data.items.length === 0 || page === options.maxPages) break
        prs.push(...response.data.items)
        page++
    }     

    for (const pr of prs) {
        const updatedAt = moment(pr.updated_at)
        console.log(`PR ${updatedAt.format('LLL')}: ${pr.title}`);        
    }
}


async function diary(){
    const today = moment().startOf('day');
    const tomorrow = moment(today).add(1, 'days');

    const prs = await octokit.rest.pulls.list({
        owner: 'Radweb',  // replace with your GitHub username
        repo: 'InventoryBase',
        state: 'all',
        sort: 'updated',
        direction: 'desc',
        page: 1,
        per_page: 10,
    })

    console.log(prs.data.length)

    for (const pr of prs.data) {
        const updatedAt = moment(pr.updated_at);
        console.log(updatedAt.isSameOrAfter(today))
        if (updatedAt.isSameOrAfter(today) && updatedAt.isBefore(tomorrow) && pr.user?.name === user.data.name) {
            console.log(`PR updated at ${updatedAt.format('LLL')}: ${pr.title}`);
        }
    }
}

async function main () {

    user = await octokit.rest.users.getAuthenticated()
    
    await pullRequests({q: `is:pr state:open author:${user.data.login} repo:Radweb/InventoryBase`, maxPages: 1, perPage: 3});

    await diary()

}


main()