---
title: "AI Workflows: Moving to Code"
description: "Why do AI models perfectly understand instructions but then completely forget to 
wait for your feedback? In this post we will discuss adding more determinism to an AI-assisted 
project and how that can quickly tun into an over-engineered mess."
startDate: "2025-07-25"
publishedDate: "2025-07-27"
draft: false
tags: [ "AI", "Workflows", "Ruby", "PHP" ]
---

I've been working on an AI assisted workflow system for some time now.

It started out after observing the Model Context Protocol and how powerful server tools have 
become. Without forcing the AI model to learn a whole application, you could expose a function 
call that performed an action and gave back the LLM text it could use to continue the 
conversation and user interaction.

I immediately saw the distinction between the stochastic LLM conversation and the deterministic 
server tool call. While LLMs are great at disambiguating user intent, they often go off 
the rails for applications where specific workflows are required. One user might get the 
"perfect conversation" culminating in achieving their goal and another become immediately 
frustrated the LLM took a different path ending in task failure. With the rise of AI and LLMs, 
it seems silly to bet strictly on old-school deterministic apps, but how can we tame the AI 
model so the results are more similar between users and conversations?

I won't get into fine-tuning a model, evaluation frameworks, or any of the methods that change 
the fundamental nature of the AI model partially since I have not explored those domains yet, 
but also partially since those tools don't fit into the workflow system I am creating. 

My goal is to allow users of the standard, ~$20/month tier, AI model subscription to have an 
open source workflow assistant they use to navigate any phased task. 

## The Main Problem: Context Amnesia

My current workflow system involves three parts:

- **Philosophy file** - A markdown file generated in the initial conversation of developing any 
  workflow. The philosophy file informs the AI model about the workflow, why it exists, 
  background research referenced, etc. 
- **Logic file** - An XML file that contains workflow phase logic, failure modes, AI assistant role 
  instructions, etc.
- **Execution file** - A markdown file the AI loads into context to give a good overview of the 
  workflow and how run through each phase of it complete with examples

Having a conversation to come up with the philosophy of a workflow and then using that 
philosophy as context during a conversation to create logic and execution files worked very well 
initially. I felt like I was getting to the bottom of why I have the workflows I have and it was 
quite easy to turn almost any repeatable, phased task into a workflow. 

However, on repeated conversations of the same workflow, I would notice the LLM curiously 
stating questions for me and then automatically moving onto the next phase in the workflow: a 
phase that I was supposed to provide information before reaching. 

> ...and that concludes our research phase. What stood out to you from the findings?
> 
> Phase Two: Review User Feedback
> 
> I see you have no feedback for me to review...

That is a contrived example from a non-existent workflow, but it fits the general pattern I 
experienced on actual workflows. Somehow, the LLM read the instructions, understood them, but 
with additional text in the context window it kept forgetting to pause for my feedback. 

## The Solution: Determinism and State Machines

To have my AI-assisted workflows become more consistent, I kept thinking of calling CLI commands 
that could load a portion of a file into context while going through the phases of a workflow. 
However, at that point, it made sense to invest in a robust system that could enforce rules on 
the workflow. 

State machines immediately came to mind as did the excellent "Act as a State Machine" Ruby gem. 
LLMs seem to love DSLs and concise, but meaningful, text. What better marriage than an LLM 
using Ruby and AaaSM to help users manage their workflows. 

But since I come from the PHP world, I thought it would be instructive to also build out the 
system with PHP using Symfony and the Workflow component. I am, after all, building a workflow 
system so using an OSS project called Workflow totally makes sense. The Symfony team is great at 
creating well-thought out packages so I'm sure working with the Workflow component will be just 
as fun as working with the AaSM gem.

## Providing Claude Proper Context

To provide Claude with the proper context to help me integrate a state machine as well as other 
code packages into my workflows system project, I wanted to grab as much documentation as I 
could. Naturally, docs to many packages are easy enough to find and read online but not as easy 
to gather up and store for an LLM

So, I used my `browser_extract_text` tool I created to work with Playwright and extract text 
using fewer tokens than other approaches: [Limiting Tokens while Extracting Text](013-limit-playwright-tokens.md)

Once I extracted navigation links in a sidebar, it was easy enough to have Claude loop through 
each page, extract text, and append to one main markdown file. 

## Another Case of Over-engineering

...and that's where this story will have to end. While I realize I need to improve my workflow 
system, after chatting with Claude, neither of us could justify creating two whole codebases 
with a bunch of code when the system was supposed to use Claude Desktop and keep things simple.

I already had a plan to selectively load data into context at just the right time, and now I 
need to try that plan out to see if it works. So let this be a lesson to you youngsters. It is 
okay to have an idea, work on it a little bit, and then have experience and wisdom bite you in 
the ass telling you to quickly abandon the idea. 

At least I only spent a day or two looking over and planning an application in PHP and Ruby vs. 
the two months I spent building an iOS workout app I abandoned before completing it. Past 
failures like my iOS app still inform me to this day, and I hope to keep getting better at 
recognizing where opportunity awaits and where trouble brews.  