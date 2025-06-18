---
title: "CMS First Principles: Intent over Implementation"
description: "Every CMS forces content creators to manipulate layout builders without ever 
declaring what they're trying to communicate. Just like \"program to the interface, not the 
implementation,\" content management should capture intent first, then let AI assistants handle 
the visual details through collaborative design conversations."
startDate: "2025-06-18"
publishedDate: "2025-06-18"
draft: false
tags: ["AI", "CMS"]
---

Intent. It's something we hope is behind every move we make in life, yet often times we act 
without intent in mind. 

Take for example the television. A lot of people own a TV, but almost no 
one gathers everyone around and asks "what is our intent in turning this thing on?" The answers 
could discuss relaxing, avoiding other things in life, or even learning a thing or two. 

However, people mostly turn on the TV and start "flipping around" the channels available. Taken 
to social media, instead of flipping we scrool...er, I mean scroll...no wait, "scrool" being a 
combination of scrolling while drooling is a better term after all. The same lack of intent applies.

But what if we brought more intent to the actions we take? How would that look within a content 
management system?

## The Layout Builder Trap

Every CMS I've used has some form of an "layout builder" whether they use that term or 
something else, meaning a "visual page builder". The goal is to allow the content editors to 
have a structured way of laying out content visually while avoiding accessibility and 
performance issues. 

The goal of the marketer is to make it seem like the content editor is free to do as they please,
but the goal of the developer is to lock down the UI enough so that the content editor can't 
screw things up. With conflicting goals, its no wonder the history of layout building is fraught 
with failed experiments and a constant re-working of the interface content editors are supposed 
to use. 

So instead of pushing the communication of their company, the content editor is forced to be a 
visual implementor pushing pixels around the screen and hoping they come out with a good design. 

But why are we forcing implementation before the content editor declares their intent?

## Program to the Intent not the Implementation

We've all heard about the Gang of Four and their design patterns book in which this famous quote 
originates from:

> Program to an interface, not an implementation. - Erich Gamma

Just like writing code, writing content has abstraction layers that cannot be ignored. There are 
at least two layers of abstraction to writing content: intent and narrative.

Each piece of content can be unique in its narrative, but if we wind back up to the intent layer,
most websites only have a set of intents they are trying to get across in the narrative pieces. 
In fact, if every blog post on a site was pushing singular intent, then no one would want to 
read the collection of posts. Readers go back to content they like because it shares intent. 

Just like writing code should look towards interfaces and away from implementations, any good 
CMS should focus on what your intent is to finally render the content instead of forcing 
implementation upon you without ever having that intentional conversation. 

Instead, layout builders couple content to specific designs and violate the principle of trying 
to get you to have a cohesive, intentful website. No wonder so many client projects go off the 
rails with a good layout builder. Layout builders will never stop someone from creating a 
website where too many voices are being served and no one is finding what they need.

## The Missing Step in Content Creation

Content creation usually goes like this: 

1. A content editor works on a blog post or copy for a page. They use MS Word and email.
2. Content editor pastes content into CMS adjusting various "design levers" before publishing 
   the content.

But there is a missing step that we should all incorporate immediately. Being honest, I've seen 
designers discuss intent in larger planning meetings, but I've never seen that follow through to 
actual content creation once planning and "design system update" have been completed. 

I think the content creation algorithm should be updated to:

1. Content creation (what am I trying to say?)
2. Intent declaration (what should this achieve/convey?) ← Currently skipped
3. Implementation discussion (how do we achieve that intent?)

Sure, we could leave up the first two steps entirely to the content team and hope that they 
discuss intent while writing stories, but they do not know HTML or CSS so how can they translate 
that intent into something appropriate for the web or a mobile device?

They can't so we must incorporate intent declaration into our CMSes.

## What Intent Declaration Looks Like

So how does this work? Well, I think the answer is simple: you write the content, and then you 
have a conversation with your AI assistant about intent. 

For example, an AI assistant can read the content and immediately have targeted questions tying 
intent to design principles. A workflow for intent declaration can be made that instruct the AI 
on current design principles, and with that context the AI should be able to ask great questions 
guiding the content towards a rendering that is most impactful. 

Instead of a content editor pointing to the screen and directing "Make it bold and red", they 
will have to answer questions about their intent to direct readers to certain points in 
the content. 

Imagine writing a blog post, kicking off your `design_collaboration` workflow for that content, 
and ending up with several variations to try out and see what is most engaging. Boy, that sounds 
like A/B testing doesn't it?

Yep, with intent declaration, you inevitably get to A/B testing and letting the users tell you 
how they want the content to look when they visit the site. No longer do you have to set up the 
variations and think through the options. The design collaboration conversation does that for 
you. Maybe there is only one good variation for the content, but at the end of talking it out you 
will feel better knowing you at least tried to consider more compelling variations. 

Intent discussions will also stay with the content so anytime someone asks "why the heck does 
this page exist?" they will have an answer. Every piece of content will require a design 
discussion to publish and those discussions will be archived and available for search and review.

## But The Client Won't Go For That!

You've probably been waiting to shout this phrase while reading through the post: "But The 
Client Won't Go For That!"

I've heard this phrase uttered many times when I bring up some kind of innovative concept. The 
dev team consists of 6 or so people and one by one they all nod their heads, "yes, that is a 
neat idea, but the client will never accept it."

And it is all just Fear, Uncertainty, and Doubt: FUD. No client ever wants to argue about the 
font size or color of the text, but that's the language we've given them to fuss over. We treat 
the whole website in a visual manner, and so do they. 

But what they want is effective communication, and if we build systems that preface design 
choices with intent, then we remove them from a visual mindset and get them back to the content 
mindset they need to effectively communicate with their audiences. 

## Intent as Content Infrastructure

It will be a challenge to build a CMS that prioritizes intent over implementation, but that's 
where I plan to use AI assistants to their maximum helpfulness. 

AI assistants can store metadata to content files that evolves as the conversation around the 
content being published evolves. The content editor doesn't even need to read these metadata 
files since they are mainly focused on communication and annoying them with a new format to work 
in would totally end in "The Client Won't Go For That!" shame.

Well, I am super satisfied with this post. From now on we will not have to deal with ugly Layout 
Builders and all the problems they simultaneously cause and avoid. Layout Builders are a 
distraction, a costly distraction at that, and they are holding back the web we deserve to have. 

A web where content is king, intent is queen, and the layout builder is the jester!