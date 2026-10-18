---
title: "CMS First Principles: You will succeed"
description: "Most open source content management systems claim no vendor lock in, but is that 
true? How can we ensure that you will still succeed when the system is down or you want to move on?"
startDate: "2025-06-14"
publishedDate: "2025-06-14"
draft: false
tags: ["AI", "CMS"]
---

Anyone who has been in web development long enough has heard about "vendor lock-in". It usually 
comes up when pitching open source solutions to organizations using a paid, vendored service. 
The claim is that since the code is open source, you are not locked into a system like the 
current vendor you are using. 

For example, you might be able to create content types in a hosted CMS service, but you might 
not be able to add metadata fields to the content type like you'd like. The open source 
salesperson claims you are being oppressed and to really taste freedom, you should migrate out 
of "vebdor lock-in" towards the land of open source milk and honey.

> Oh there's no cost, it's open source!

No license or monthly subscription fees is also a claim that I've heard pro-OSS cients and team 
members claim. Don't get me wrong, I love opening up the source of an application so others can 
learn from the code, but I also love telling the truth. 

Truth is: there is a lot of cost to using open source software. 

## Enter The Dragon: Dev Burnout

Despite the claims that you are not locked into open source and open source is free, if you've 
been to any open source conference within the last few years, you'll hear stories of burnout. 

Granted, the dev communities that are more sustainable generally have fewer talks on this topic, 
but I have more experience since the dev communities I've been tied to are waning in popularity 
and so there are mountains of old issues still in progress and outdated documentation to confuse 
newcomers.

No salesperson will ever tell the truth about open source burnout, but the fact is that the "no 
vendor lock in" and "open source is free" attitudes have pushed those dev communities to the 
brink. Telling clients they don't have to pay has a funny result of allowing them to think they 
don't need to contribute back. 

Which is why I find it a bit shameful that some OSS projects chastise the businesses using the 
software and not contributing back as the problem. Didn't you just tell them they didn't have to 
contribute since the code was free? Yes, that is why businesses don't contribute as much as they 
could: it was part of the marketing pitch you sold to get them to adopt.

And so hundreds of issues go unanswered in the queue, bugs persist, and adoption of the OSS 
project slows. Some projects can go on longer than others, but younger devs will see faults, 
create new projects, and start pitching their version of "get your FREE code here" to the masses.

Now, what about vendor lock-in? Is that sales pitch also a bit of misinformation?

## OSS Locks You In

Of course you are locked in to a degree. Sure, you can change the code, but if you don't know 
how to program, how are you supposed to handle that update? Sure, you can export the data, but 
how long will it take to get the business logic aligned with the data in a new system. 

The truth is that OSS projects lock you in just as much as most vendored services. The vendors 
let you take your data, but it is up to you what to do with it. Seeing as how companies got 
tricked into re-doing their website every four years or so, does it even really matter whether 
you're "locked in" to one system? Aren't you going to completely redo the site anyways? 

If so, you are not locked in to whatever service you use now since you can export the data. Heck,
you can even use an OSS project to scrape your website if you must. Devs will be needed anyways, 
and they can handle an extract, transform, load pipeline. 

So what should the perfect CMS project do to ward off sustainability issues while trying not to 
lock users in? Thinking from a first principle focus I came up with the following principle.

## Choose Graceful Degradation and You Will Survive

Rather than generating a mountain of code to make working with content easier, I aim to take the 
opposite appoach. 

> 2. The CMS will fail, but you will still succeed. 

It is inevitable that the content management system will fail, but what happens to your mission 
when that inevitability occurs? Can you still function?

For every CMS I've worked with so far, the answer is no. The CMS tries to do too much and while 
multiple services might be used and still functioning, the CMS is the key to the content 
rendering so no user will be able to see content if it fails. 

Sure, there are static site exports that can remain and still function, but without the ability  
to update the content, you are stuck. Or else you need to manually update HTML files sorting 
through HTML elements you could easily malform leading to rendering issues.  

But if the problem is deeper than just changing part of a piece of content, you literally can do 
nothing. Too much code stands in the way of progress.

So why choose to write so much code?

## Text-centric Workflows

Instead of code, I choose natural language. Paired with an AI assistant, natural language can 
beautifully turn into workflows that help to manage content. 

Any feature released in code starts out as text in a ticketing system with acceptance criteria, 
anyways, so why do we translate it into a format that most people can't edit. Then, we throw 
away or archive the true meaning of the feature leaving only code and tests to tell the tale of 
time. 

You might think it a risky bet to rely so much on text, but when you do, things like vendor lock 
in are a thing of the past. The "vendor" is just an AI assistant reading the workflow text and 
performing the actions, and you can read the same text and perform those actions as well. 

You can also modify the workflow without worrying about completely breaking it. No typo or 
grammatical error will ever bring down your CMS unlike the draconian syntax rules of most 
programming languages...don't even get me started on whitespace parsing errors, jeesh...

Paired with your text and workflow files, you can feel free to keep updating content and using 
your rendering tool manually until the AI assistant comes back online. 

## Own Your Methodology, Not Just Your Data.

Another benefit exists inherently within the text-based workflow files: you own your methodology.

Generally, CMSes promise to give you some way to export content, but do they give you an export 
of their "content management methodologies"? Do you even think about what methodology you're 
using while working within a CMS? 

I know I do not. I'm mainly trying to remember the steps to click here, click there, fill in a 
form...most users go through the motions while managing content mainly thinking about the 
content itself. 

One amazing thing about switching to text-centric applications is that you naturally start 
annotating the workflow files with philosophical notes intertwined with the minutia of how to 
use the system. No longer is documentation separate from operation, its simply one and the same 
now. 

Going through the text files, you will be forced to think about process unlike reading a 
tutorial focused on steps needed to use the application. It's kind of sad, really, that we waste 
so much mental energy reading steps about a user interface that should be self-explanatory 
without even getting into the philosophy of what we are doing. 

I take this sad fact as a realization that the typcial web interface has failed most common 
users and needs to be updated. It needs to be updated to go back to the past. To go back to the 
terminal: the OG UI. 

Chat interfaces are terminals and they are here to stay. Please use and exploit them so we can 
get past claims of vendor lock in and free code while also learning more about our personal 
philosophies on issues like content management. 

IT's gonna get real fun, y'all! Stay tuned...



