---
title: "AI Musings: Limit Tokens for Web Scraping"
description: ""
startDate: "2025-07-08"
publishedDate: "2025-07-08"
draft: false
tags: [ "AI", "MCP" ]
---

> Error: Context window limit reached...you suck!!

Damn, and I was just getting somewhere too...

Anyone using AI tools these days and trying to orchestrate gathering of decent amounts of data 
has probably ran into token limits causing a conversation to stop or being rate limited on your 
AI API plan. 

For me, I am trying to use Claude Desktop and the Claude Pro $20/month subscription to see how 
far I can go with AI-assisted workflows on the cheap. Sure, I can "switch to our MAX plan" when 
presented with that option, but since I am targeting average, everday users, I refuse to pay 
more instead of thinking how to solve my problem in some other way. 

In this post, I will go over how I modified the Playwright MCP server to return fewer tokens 
while extracting text from a web page. I was doing this to build a "LinkedIn Briefing Workflow" 
so I will also mention some particular details related to authenticated sites with horrendous 
HTML. LinkedIn definitely doesn't want you gathering information from their website, but since I 
am using my own account non-commercially, I'm sure this is fine...says the non-lawyer.  

## Playwright MCP Origin Story

First of all, let me say that the Playwright MCP server is amazing. I couldn't believe my eyes 
after installing it and seeing Claude thinking through how to set up a developer key for a 
Google API service I wanted to communicate with...only to tab over to the Playwright window and 
see Claude correctly using the Google UI to set up the developer profile and get the key. 

Now, Claude did not ask me to confirm anything while it clicked "Yes, I am Alex" blowing through 
permissions screens like a kid in a candy store, but I'll allow it since I find the Google UIs 
to be cavernous and really over-engineered to set something simple up. All I wanted to do was 
talk to me Google Calendar, but I had to use very abstract, generic Google UIs in order to do so.

Claude probably saved me about an hour of fumbling around the Google UI. What's more; Claude set 
up a neat token reauthorization workflow where it gives me a URL to paste into a browser, click 
to agree to permissions, and then paste back the callback URL into the paused CLI command script.

Claude could have completed the whole reauthorization process, since Playwright uses Chrome 
profiles that store user data and auth, but due to token issues.

## Playwright MCP Token Issues

I am building many AI-assisted workflows these days, and one of them I called `news_update`. The 
goal was to not annoy myself in the mornings as much by having an AI assistant gather news 
updates from all the places I check news in the morning...side note: I know that checking news 
in the morning is a bad idea, and so now I try to do it at lunch...but for those who can't 
resist a good scroll, please keep reading.

I set up the workflow to check unauthenticated sources but then struggled a bit thinking of how 
to incorporate authenticated sources since half my news comes from sites I'm logged into. With 
authentication, they become super generic and meaningless. 

> I'll use Playwright MCP.

Using Playwright MCP seemed like a no-brainer, that is until I tested it out. Pretty much 
immediately I was reaching message limits and then token limits for my whole Claude account. 

What's worse were the news update summaries that simply told me the most recent timeline items 
of the social media sites I had pasted in. Realistically, it would be too complicated to model 
how I interact with those sites in a way that an AI assistant could give me a good summary and 
not waste a bunch of tokens. I like clicking into some posts to see comments, and then 
responding to a comment via MCP and AI assistant would suck too. 

Seeing as how my `news_update` workflow was kind of sucking and noticing that Claude used a 
massive amount of tokens when using Playwright MCP tools, I ended up turning off the Playwright 
server and simply using web fetch and built-in Claude web search tools. Those are already 
optimized for token usage and I think stip out HTML tags and the like...although I'm not 
entirely sure on that part. 

## LinkedIn Briefing Workflow Takes Me Back

I kept the Playwright MCP server turned off until I had another need for it: scraping LinkedIn. 
I am trying to model some AI-assisted workflows I see companies creating products around and one 
that caught my eye involved LinkedIn.

> Our LinkedIn briefing application lets users sign up with their LinkedIn profile, then paste a 
> link to someone they’re about to meet. Within 2 minutes, they get a comprehensive brief... 

You can read more about the company and their product offering here:
https://buildingpondlabs.substack.com/p/how-were-scaling-our-3-person-startup

I'm sure they are probably using the LinkedIn API, but that costs money and we are super cheap 
over here in this blog. So dicking around with API costs was not an option. 

Claude can fetch web pages though, right? And even though Claude can fetch web content you give 
it in a prompt, Claude won't load URLs from documents or other sources, at least in my testing. 
So that would limit my tool if I ever needed to pass a URL in via a file. Also, LinkedIn's 
anonymous profile view gives you very little information so that is kind of useless unless you 
log in.

So, I was back to square one wanting to use Playwright MCP and its saved auth credentials but 
not wanting to eat up all my tokens. 

## Others See the Same Problem

One look at the Playwright MCP GitHub issues page, and I could spot this was [a common problem 
people were facing.](https://github.com/microsoft/playwright-mcp/issues/631)

> I sometimes get a huge response for the interaction tools, which fill up my context window. Is 
> there a way to limit the response size or toggle it off for certain actions?

And of course the maintainer's reply was basically "works as expected".

> We don't want to use pagination for tool replies, so replies are what they are. It is client's 
> responsibility to manage the context efficiently though. Some clients do a good job with it, 
> others require manual configuration (separate sub-agent contexts, etc). You can experiment 
> with different clients to see if that helps.

Screw that, I thought. I'm not using a fancy enough MCP client for sub-agents, and I don't have 
enough time or patience to drop Claude Desktop right now. 

So, of course, I went to Claude to have a chat and devise a solution. 

## Text Extraction Workflow

I knew I could limit the response via CSS selectors, and I navigated to LinkedIn to check out 
the source code. 

...insert horror meme here...

Shocking. It's been a while since I've clicked "View Source" on one of the corporate, big boy 
sites to see what the smoke and mirror frontend devs are up to these days and boy has it not 
improved. 

Sometimes I get lucky with a `data-testid="profile"` on sites where functional testing trumps 
pissing off screen scrapers, but LinkedIn either has an omniscient functional testing platform 
or doesn't do functional testing at all. 

I had a really hard time discerning legitimate patterns of CSS selectors and HTML elements to 
target. I even thought I saw dark patterns to try and screw up parsing of a screen scraper. 

Then, it dawned on me that while LinkedIn could pummel me with horrendous markup, they could 
never hide the actual text from me. And what are LLMs good at if nothing else? Parsing and 
understanding text; exactly!

After forking the Playwright MCP repo and about three spins on the "build an extract_text tool 
for me AI Agent" wheel, I had a working `browser_extract_text(url, selectors)` tool complete with 
several other parameters to do things like limit the characters returned in the response and so 
forth. 

The key was to grab `node.innerText || node.textContent` on each valid element while also using 
a `metadata=false` to strip the HTML tag information from the text. 

## Code and Improvements

I'll list the code here so you can check it out. I'll even throw in the setup instructions for 
Claude Desktop to boot!

- Forked Repo - https://github.com/alexfinnarn/playwright-mcp
- extract_text tool - https://github.com/alexfinnarn/playwright-mcp/blob/main/src/tools/extract_text.ts
- Add tool to list - https://github.com/alexfinnarn/playwright-mcp/blob/main/src/tools.ts#L40

And to get this working on Claude Desktop you must:

1. Clone the forked repo I made.
2. Run `npm install`.
3. Run `npm run build`.
4. Add configuration to Claude Desktop's config file which you can access from the Developer 
   Settings UI. I tend to use full paths to executables just to be super explicit.
   5. `which node` should give you the path to node on your machine
   6. You need to enter the full path to the repo and target the `cli.js` in the root directory.

```json
{
  "mcpServers": {
    "my-playwright": {
      "command": "<full-path-to-node>",
      "args": [
        "<forked-repo-path>/cli.js"
      ]
    }
  }
}
```

After following those instructions, you should be able to have Claude Desktop use Playwright MCP 
to gather text from an authenticated page with little fuss and far fewer tokens than gathering a 
snapshot or using one of the other tools. 
