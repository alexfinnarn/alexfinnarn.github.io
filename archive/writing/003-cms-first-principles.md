---
title: "Creating CMS First Principles"
description: "Content Management Systems have principles once you get the code out of the way."
startDate: "2025-05-23"
publishedDate: "2025-05-23"
draft: false
tags: ["cms", "first principles"]
---

For the past 12 years or so I could say I worked on "content management systems" primarily using 
a PHP-based CMS called Drupal. I started out doing typical junior developer tasks, like fixing 
bugs and making small feature updates, and I gradually worked my way up to managing whole 
applications and being the one who brought the service back up when it went down. 

I even went to the lengths of helping organize community conferences and speak at them too. 
Although, judging by the number of groups I saw die, I'm not sure I could say I'm that good at 
the organizing part. Just to say: "This ain't my first CMS rodeo", I guess. I've been doing this 
quite a while.

However, during the whole time, I'm not sure how much I thought about actual content management. 
CMSes like Drupal and WordPress define the UI and structure so much that as a developer, you are 
mainly tasked with understanding the growing list of features and then figuring out where you 
can pitch in and help the open source project grow. 

Most heavy contributors to OSS CMSes have business to run, and they dive into the future of the 
OSS project to keep that business afloat. The nature of content and managing that content rarely 
comes up at the conferences, and if it does, it always relates to some new feature that can be 
sold to an interested client.

## What About The Actual Content?

I quit my job in late 2024 due to the insight I could see coming: federal contractors milking 
the government for tech contracts it didn't need would all lose their jobs within the next year. 
I could see Trump winning, the rhetoric on government efficiency, and the fact like it felt like 
I was doing the least at any dev job while getting paid the most of any dev job I'd had. All 
pointed to disaster approaching.

I also wanted to figure out how to live off-grid. With my rent going up 18% (yes, ridiculous!) I 
raged into a plan to end rent increases once and for all. Without the income verification needed 
to secure a mortgage loan, that meant one thing: if you can build it, you will live in it. 

You can read more about my off-grid journey in [my collection of off-grid posts](#).

With the new wave of AI assistants and agents appearing in 2025 and no attachment to any CMS 
project, it got me wondering what was actually needed to manage and create content efficiently 
like content creators need. 

I doubted it was the user interfaces and codebases I had been splunking through for the last 12 
years. I knew projects built up over decades probably could not change to handle the new 
language-based conversational approach from the dated point-and-click workflows of the past.

## Let Me Show You The Features, Then Tell Me Your Problem

The main problem with all current CMSes, as I see it, is the fact that they've already created 
the UI before you've interacted with the application at all. Every CMS I've tried has basically 
the same UI whether the menu is in a left or right-hand sidebar or simply hangs out at the top 
of the screen. 

As a user, I have to learn what someone else thought I would need to manage my content, and when 
I want to change the UI or any feature, I have to submit a ticket. Sure, devs usually build in 
customizations so you can make your own dashboard, but even then, it's the "dashboard concept" 
the devs and product people decided you could have. 

And that is why I think all current content management systems fail: they fail to start from 
first principles and work their way up. 

## Why Is The UI Like That?

So why are CMSes the way they are now? Well, I think of CMSes as a subset of "web applications", 
and I'd say that most all web applications are also failing their users these days. But it 
wasn't always like this. 

My critical take on the "modern web UI" comes from the derivation of print aesthetics rushed out to 
the web in the late 90's. Print companies saw the advantage of the web and simply applied the 
same principles as in a magazine to the emerging web. 

The table of contents at the beginning of the magazine became the menu in the header with either 
dropdown hierarchical links or some kind of sidebar menu structure. The articles loaded when you 
clicked on the links, and sometimes you were presented with a form that I suppose represented 
the subscription cards included in magazines placed at strategic points. 

For a time, the print companies had no idea whether people would all get personal computers and 
scroll around on the web or if it was just a fad. So keeping your print and online branding 
roughly equivalent made sense. It was a good business move, and the evolution of CSS and JS 
allowed for experimentation at the same time. 

## The Web 2.0 Failure

Web 2.0 was supposed to be a giant leap forward where we all were part of the conversation. No 
longer did content need to be static and simply print translated to the web. No. Now we could 
all collaborate, innovate, and bring the web to it's full potential...where...

We all scroll TikTok for hours a day! Lolz. Got you fooled! The promise of Web 2.0 was never 
realized, in part since everyone fought over what it meant. And to me the main component was the 
user becoming more of an operator of the application. 

I never considered a form, "Post message", and a list of messages other people posted as a big 
deal. That's not Web 2.0 to me as it was the same thing as a bulletin board. In fact, I prefer 
the PHP bulletin board sites more than a site like X, Facebook, Instagram, etc since you could 
sticky messages in conversation threads and organize the conversations into threads. Oddly, most 
social networks have failed at improving those features over basic bulletin boards and users 
seem happy to scroll until their fingers bleed.

## CMS First Principles

I think its now time to re-visit what a content management system should do and use that 
analysis to create a framework before writing any code. I will refuse to write a single line of 
code until I have laid out the principles that will instruct the code at all times. 

Its never easy to uncover principles and much more fun to build, so I will just go ahead and 
start listing the principles. 

> 1. The CMS is not the base. It is a management system for content.

I think every CMS project I've encountered renders the content. And before you scream "what 
about headless CMSes?" I will repeat: I think every CMS project I've encountered renders the 
content.

Whether it is JSON or HTML-based, they all seem to want to render the content instead of solely 
managing it. So in full truthfullness, every CMS project I've encountered is really a "Content 
Management and Rendering System" or CMaRS. Kind of sounds better too...

My CMS will not render the content, build a static site, or do anything that a lot of frontend 
frameworks are already great at. One of the benefits will be that you can use your favorite 
frontend, and hopefully those frontend frameworks won't get bogged down in trying to become a 
big, bloated CMS. 

And since the Astro framework claims to be "The web framework for content-driven websites", I am 
choosing it to base my CMS on. I like how Astro allows you to integrate many frontend frameworks 
while also trying to keep the final build as lightweight and content-focused as possible. The 
npm install trend looks good for Astro and hopefully the project has long legs. 

## More Principles To Come

I will write more about CMS first principles, but this gives you enough information to know 
where I'm coming from and to decide if you want to follow me on the continuing journey. In first 
principles thinking, it's good to start with limits and boundaries, and hopefully limiting 
"scope creep" makes you excited to read on. 