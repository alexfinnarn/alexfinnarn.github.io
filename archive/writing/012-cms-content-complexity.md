---
title: "CMS First Principles: Content Over Complexity"
description: "Complex codebases kill simplicity. When CMSes abandon documentation-as-code 
approaches, they create unmaintainable monsters. What's the solution? Enforce minimum viable 
complexity by treating content as living documentation - if you can't explain your workflow in 
markdown, it's too complex to continue with code."
startDate: "2025-06-24"
publishedDate: "2025-06-25"
draft: false
tags: [ "AI", "CMS" ]
---

It can be hard to limit complexity in any system that involves many minds. Human nature craves
novelty and novelty begets complexity.

Take the game Jenga, for instance. It starts out with a full stack of logs and practically
anyone can pull out a log to advance the game. The game only "gets good" once enough logs have
been removed and every available move risks taking down the whole pile of logs. We don't tend to
enjoy the beginning, but man is the end exciting. I know I've screamed in a a triumphant rage
beating my chest after pulling off "impossible" Jenga moves, and I'm sure any Jenga junkie can
report similar tales.

However, Jenga is just a game and it is really easy to set up the next round without much
trouble. Content mangagement systems are completely different, and once enough CMS code logs
have been re-configured, there is no easy "reset" button to push to start over.

## The Usual Bloated Path Forward

Usually, as CMS codebases advance the amount of code also increases. Everyone has feature
request ideas but few demand tech debt deletions or abstraction of core code to optional
dependencies. Granted, a lot of the added bloat is gained from political conversations and fears
of losing out to other CMSes with "killer feature X", but whatever the reason, the result
remains the same: huge, bloated codebase.

To put this concept into real-world context, let's look at a CMS I've worked with for over a
decade. I'll go back about a decade to when Drupal had a huge code change that inspired a fork,
Backdrop CMS, due the the amount of complexity taken on.

### Drupal Release Data

To gather this data, I went to the [Drupal GitHub mirror's tags page](https://github.com/drupal/drupal/tags)
and downloaded the zip file associated with the following tags.

| Version       | Release Date | Download Size | Growth from Previous | Size Multiplier | Time Period     |
|---------------|--------------|---------------|----------------------|-----------------|-----------------|
| Drupal 7.41   | 10/21/2015   | 3.7 MB        | -                    | 1.0x            | Baseline        |
| Drupal 8.0.0  | 11/19/2015   | 18.8 MB       | +15.1 MB (+408.1%)   | 5.1x            | 1 month later   |
| Drupal 11.2.0 | 06/18/2025   | 29.3 MB       | +10.5 MB (+55.9%)    | 1.6x            | 9.6 years later |

To be clear, I was totally against the huge update and remember other devs, who weren't paying 
attention, act like the update from Drupal 7 to 8 would be as simple as the update from Drupal 6 
to 7. And then most of those devs waited until Drupal 9, at least, to update their Drupal 7 sites.

Without even knowing anything about Drupal, you should be able to guess that a **408% increase 
in codebase size** means more complexity. The main reason for growth was all the dependencies 
added to "get off the Drupal island", but all I got was "stuck on a sandbar" while trying to 
leave the Drupal island. 

I don't need to go into all the changes that grew complexity, but I will say it was sold to 
developers as "OOP coding is better. If you don't get on baord with the changes, it's cause you 
are too dumb to understand real code."

## When Drupal Was Simple

I will add one anecdote of a story so integral to my developer journey, I can even 
remember where it happened. During the reign of Drupal 7, I was planted in the great Sidewinder 
Coffee shop located in the Northside neighborhood of Cincinnati. They had me caffeinated to the 
gills while I frantically tried to fix an issue with a consulting project I was working on at 
the time. It was a Sunday, but the project was so far behind schedule no client meeting ended 
without a little shouting match. What a fun project to start my web consulting career, I thought,
as I stared at the Sidewinder mascot, a cute bunny they kept in the backyard for coffee lovers 
to enjoy.

My manager and I had spent countless hours clicking through Drupal's low-code UI using the Rules 
module to try and email students a questionaire, but only if they had not completed it in the 
past. The Rules module worked by tying "Conditions" to "Actions", and we had our email action 
working well. We just needed to filter the list of email recipients. 

After many clicks, I finally said, "how hard can this be to code?" At the time Drupal had great 
developer experience where you could locate one `[module_name].api.php` file that listed escape 
hatches for you to modify the values passed in and out of functions so you could quickly update 
some business logic and be on your way using mostly contributed, open source code.

I'll never forget the joy I felt when I added a custom Rules condition to the Drupal UI and it 
actually emailed the list of filtered students insted of all of them. All I had to do was: 

1. Copied a "hook" from the `rules.api.php` file, 
2. Read the docblock above the sample hook code to explain how I could use it
3. Deleted the example hook code. 
4. Added around 10 lines of custom code loading and filtering some data.
5. Added another hook to define the Rules condition and point to the custom code I just wrote.
6. Go back to the Rules UI to test and confirm my code works.

I could explain how to do this to a junior developer in half-hour maybe and having the hooks and 
documentation in the same file saved me so much time over the years. I used to love working with 
Drupal hooks in creative ways while writing minimum custom code to complete my dev tasks.

Then, Drupal 8 happened, and they started taking away hooks, sometimes for no apparent reason 
than "hooks are old school". I even chatted with Drupal core devs who lamented that changing too 
much code had slowed Drupal down a lot and with little success to show. 

Nowadays, you'd be better off taking an OOP class, memorizing SOLID principles, and studying the 
Gang of Four's design patterns book in order to work with Drupal. The lunch pale, "getter done" 
type of devs have moved on from Drupal to more modern, hosted low code tools, and those tools 
come with their own set of challenges. 

## The Complexity Limiting Principle

So how can we avoid growing complexity while ensuring that developers and content editors can 
quickly make updates to their CMS workflow processes? 

> 4. Enforce minimum viable complexity by treating content as living documentation. 

One reason hooks failed in the Drupal dev community was that the simplicity they embodied had 
only community customs enforcing the standards. No linting tool made sure that extensible 
functions had good documentation examples on how to use them. It was just something that caught 
on in the Drupal community. 

At the time, I thought the structure and patterns of the `[module_name].api.php` files made 
sense, but I'm not sure I ever heard devs talk about the pattern since most devs are busy making 
features. 

Instead of leaving it up to community preferences, I want to enforce limiting complexity by 
making sure that documentation is taken seriously. Otherwise, all I've ever seen in OSS projects 
is fragmentation of code and its meaning. 

## Why Can't Documentation Be Separate?

"Comments do not belong in code", said the angry dev reviewing my PR. As long as I've been a dev,
I've heard rants like that mainly pointing to some baseless separation of concerns principle or 
something like that. 

The story goes that code has to be pure, follow certain rules set out by the Code Oligarchs, and 
adding natural language to code weakens the story. But since we read code way more often than 
write it, I've always been confused by the people working to rid code of documentation. 

Instead, they point to documentation sites that are often out-of-date, hard to apply to specific 
code, and potentially hard to help update from the outside. Now, we have the "AI can write docs" 
crowd, probably made up of the same comment haters, but that creates a whole new set of 
potential problems where AI controls intent paird to code it did not write. 

I'd much rather declare my intent and have the AI create code, if needed, to carry out my intent 
to completion. And to do that properly, you have to tie documentation to code in such a way that 
the documentation is indispensable. 

## Enforcing Minimum Complexity

To enforce the principle of minimum complexity, I will require every action in the CMS to have 
an associated "workflow". I think most people know what the word workflow means, and I also 
think every action you take to manage content can be captured in a workflow. 

The workflow file is written in markdown and the AI assistant helps you create and modify your 
personal workflows based off of guidelines. You can think of the guidelines like an interface 
shared across code implementations. Each workflow will reference the guidelines, and you'll also 
be able to update the core guidelines files for any customization you need.

Picture this: you want to add a feature to your CMS to create several snippets of a blog post so 
you can use them in social media posts. You will need some text and engaing thumbnails in order 
to schedule your posts. 

Instead of creating a Jira ticket lazily telling a developer to do just that, you will spend a 
bit of time conversing with your AI assistant to either incorporate the new feature into an 
existing workflow or create a new workflow just to handle that feature request. It's almost as 
if Jira is talking back to you as you type out your feature request...and who knows, maybe the 
Jira UI is starting to take this approach? 

I'd have to check to find out, but if companies like Jira don't adapt, then all they will be is 
a legacy repository of issues that an AI assistant is forced to integrate with via MCP tool 
calls. Many companies could fall into the MCP trap if they are not careful, thinking an MCP 
server will help them out when all it does is help the frontier model companies expand their 
market share. 

## Content As Living Documentation

Once you have the workflow file created, you can reference it in meetings, trainings, and no 
edit you make can ever completely break the CMS. An AI assistant might balk at your update, but 
they can help you refine the workflow addition so they can use it properly. 

As I am experimenting with AI-assisted workflows, I tend to have a conversation about the 
current workflow and how it can be improved allowing the AI assistant to make changes after I 
approve its suggestions. Sometimes I add to the text myself, but I feel like the system will 
evolve to have "user instructions" seperate from "system instructions" just like the big AI 
providers do now. 

To that end, I have to work on incorporating philosophy to the workflow files that contain 
markdown and reference XML logic files. I want to keep workflow execution light on tokens while 
allowing for lengthier verbiage backing up the philosphy of the workflow. 

For instance, I have a standup workflow that I personally use with an AI assitant taking the 
place of a project manager. The workflow file is sparse with theory, but I'd like to try out 
different project management methodologies to see how I like using them. I think I will need to 
create a separate text file abstraction to hold the philosophy of the refined workflow file in 
order for me to make this work. 

But for now, I will continue iterating on my markdown-based workflow files to see how streamlined 
they can become, and I'll avoid jumping into code, like I used to, until the documentation feels 
right.

Remember this: when you can't explain your workflow in plain markdown, you know you've exceeded 
minimal viable complexity.