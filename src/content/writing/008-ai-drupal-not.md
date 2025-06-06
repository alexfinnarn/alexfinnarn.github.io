---
title: "How Not To AI: Adapt your big bloated framework"
description: "Many devs want AI to fix their bloated codebase. It can't."
startDate: "2025-06-06"
publishedDate: "2025-06-06"
draft: true
tags: ["AI", "refactoring"]
---

This article is a response to an article that came across my newsfeed. Like many people, I start 
my day scrolling through news feeds of various sorts, and I saw this article about Drupal and AI 
on my LinkedIn feed.

https://www.thedroptimes.com/interview/48846/marcus-johanssons-return-drupal-with-ai-at-core

The article is about someone coming back to the Drupal content management system open source 
project after kind of sort of leaving working on Drupal projects. But the person being 
interviewed and their story is not what caught my eye. 

What caught my eye were the claims around AI usage and that Drupal was well positioned to lead 
in the AI content management space. However, I do not think this is the case.

Here's why...

## Too Many Abstractions

The Drupal dev being interviewed had a comment around building out AI tooling within Drupal.

> It became clear that if we were going to build something core to the AI ecosystem in Drupal, 
> it had to be built around an abstraction layer. That way, you could use any model, just like 
> **you can switch between different databases in Drupal.**

And to a certain extent I don't disagree with the argument that you should be able to swap AI 
models in a generic chat interface to try them out. I like getting that option in coding tools 
like JetBrains AI assistant that I use all the time. It's nice to switch between models and test 
their outputs to various prompts.

...but you know what else is key to that story? The fact that I rarely ever use the dropdown to 
change the model. I prefer Claude models from Anthropic, and so I'm usually only using the model 
selector when they release a new version of Claude. 

Just like databases, no one really switches choices after testing them out initially. In fact, 
by the time you'd reconsider database choices for an application, most dev teams are clamoring 
for a whole refactor/redesign using some new framework.

I've never, ever, ever switched databases while using Drupal or any framework for that matter. 
It's just not something devs typically do. And in the Drupal community, they have a real problem 
with coming up with solutions to problems that don't exist. 

So, for AI coding work, Drupal people have created more abstractions than needed preventing a 
user from working with a frontier AI model and updating the application outside of those 
abstraction layers.

I, for one, am working on a "workflow system" that uses Markdown files and Claude Desktop with a 
few MCP servers and their tools. That's it...

Well, Claude does write code that gets saved in local files, but I rarely look at the code so 
I'm mainly focused on working with the markdown as I work with Claude to complete my daily tasks.
I could have added abstraction layers, but knowing how they get in the way, I try to avoid them.

## Normal People Need Complex UIs?

The next claim that caught my eye was the classic "I'm not technical" trope where people claim 
that there needs to be some kind of mediator between work getting done and "non-techncial users".
They claim that while they can use a simpler tool, the tool must be more complex in order for 
the less initiated to use and understand it. 

I've never understood this logic at face value, but I do understand it a sales tactic for 
consultants. If people generally buy the faulty logic, then why would you want them to question 
it and lose out on a paying customer? 

The dev from the article claims:

> AI is not as powerful as it could be unless it can create things in a structured way, and 
> unless it has a user interface that regular people can use. Drupal provides both of those.
> 
> Compared to something like a LangChain Python script, which I once tried to get my boss to use, 
> Drupal was clearly more accessible. Trying to get non-developers to run Python scripts just 
> didn't work.

Last time I checked, natural language is a user interface that anyone can use and it is very 
structured. So, do you need a codebase that is 20+ years old, takes a lot of memory to run, and 
doesn't provide you hosting help in order to "use AI"? 

I don't think so.

I'm quite happy using Markdown files that I can edit with any editor and not be locked into some 
big hulking set of rules and regulations that is Drupal's admin UI. A set of markdown files is 
way more flexible and approachable to anyone who knows how to write. 

Heck, I don't know anyone who has not edited a text file, but I know many people who get lost in 
the menu structure of a big, complex application. 

And I'm not talking about getting your boss to write code either. All your boss has to do is 
type in normal language just like they send you an email or a chat message. Are you really going 
to claim your boss doesn't know how to email, text, or talk to people?

## Don't Adapt. Rewrite Completely.

So my message to all the devs out there getting excited to refactor your current app with AI is..
.get ready for it...

Don't do it. You are wasting a lot of time and tokens converting an application of one paradigm 
to another paradigm. 

And I'm not saying that devs should all drop what they are doing, abandon their current 
apps, and start building out AI-focused apps a different way. If you have a very mature app, 
like what you're doing, and have steady growth, you can keep on doing what you're doing. Just 
don't believe the hype of AI saving your current app, or else other AI-focused devs will eat 
your lunch with more appropriate applications. 

The future is the past. Chat interfaces are here to stay, and we need to help the AI assistants 
with their conversations not force them into bondage sadly doing busy work of our failed, over 
abstracted applications. 